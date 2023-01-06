log = console.log;
const moment = require('moment');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors');
const schedule = require('node-schedule');
const ObjectId = require('mongodb').ObjectID;

const connectionString = process.env.MONGODB_URI;
const SIGNATURE_CHAR_LIMIT = parseInt(process.env.SIGNATURE_CHAR_LIMIT);
let mongoDB = connectionString;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const schemas = require('./schema.js');
const e = require('express');

const User = mongoose.model('users', schemas.userSchema, 'users');
const Location = mongoose.model('locations', schemas.locationSchema, 'locations');
const Rank = mongoose.model('ranks', schemas.rankSchema, 'ranks');
const Mile = mongoose.model('miles', schemas.mileSchema, 'miles');
const Transportation = mongoose.model('transportations', schemas.transportationSchema, 'transportations');
const Questionnnaire = mongoose.model('questionnaires', schemas.questionnaireSchema, 'questionnaires');


let leaderboard = [];

let monthlyLeaderboard = [];

const tables = {
    users: User,
    locations: Location,
    ranks: Rank,
    miles: Mile,
    transportations: Transportation,
    questionnaires: Questionnnaire
}

const backend = express();


backend.use(bodyParser.urlencoded({
    extended: true
}))


backend.use(bodyParser.json())

backend.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//backend.use(cors());
backend.use(cors({ credentials: true, origin: "*" }));


/**
 * SOCKET PART
 */

const http = require("http").Server(backend);
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

socketIO.on('connection', (socket) => {


    setInterval(function () {
        // The Trip Stopped
        socket.emit("tripEnded", "Trip Ended");
        // Stopped!
    }, 30000);

    socket.on("updateLocation", (location) => {
    });
    socket.on('disconnect', () => {
        socket.disconnect()
    });
});


/**
 * Get /user
 * Return the user object if the user logins in. Otherwise return undefined.
 */
backend.get("/user", (req, res) => {
    console.log("Received a request to check if logged in.")
    try {
        if (req.session.loggedin) {
            console.log("Logged in.")
            return res.status(200).json({ "status": 200, "user": req.session.user, "message": "Returned user object in session." })
        }
        else {
            console.log("Not logged in.")
            return res.status(404).json({ "status": 404, "user": undefined, "message": "The user has not logged in." })
        }
    }
    catch {
        return res.status(500).json({ "status": 500, "message": "The Server is down." })
    }
})


/**
 * Post /signup
 * Return a message for the result (sucessful signed up or error messages).
 */
backend.post("/signup", async (req, res) => {
    const isValidUsername = (username) => {
        return true;
    }

    const isUsernameAlreadyIn = async (username) => {
        let user = await User.findOne({ userName: username });
        if (user) return false;
        else return true;
    }

    const isValidEmail = async (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const isValidPassword = async (email) => {
        return /^[A-Za-z]\w{7,14}$/.test(email)
    }

    try {
        if (!req.body.username || !req.body.email || !req.body.password || !req.body.confirmedPassword) {
            return res.status(400).json({ "status": 400, "message": "Please make sure that you give all of the following: username, email, password, confirmed password." });
        }
        else if (req.body.password !== req.body.confirmedPassword) {
            return res.status(400).json({ "status": 400, "message": "The password and the confirmed password don't match." });
        }
        else if (!isValidUsername(req.body.username)) {
            return res.status(400).json({ "status": 400, "message": "Please give a valid username (currently no requirements)" });
        }
        else if (!(await isUsernameAlreadyIn(req.body.username))) {
            return res.status(400).json({ "status": 400, "message": "The username already exists." });
        }
        else if (!(await isValidEmail(req.body.email))) {
            return res.status(400).json({ "status": 400, "message": "Please give a valid email address." });
        }
        else if (!(await isValidPassword(req.body.password))) {
            return res.status(400).json({ "status": 400, "message": "Please give a valid password." });
        }
        else {
            let response = await User.create({
                "userName": req.body.username,
                "pass": req.body.password,
                "email": req.body.email
            });
            return res.status(200).json({ "status": 200, "message": "Sign up successfully." })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ "status": 500, "message": "The Server is down." })
    }
})



/**
 * POST /auth
 * Login Authedication. 
 * Will set up user object in the session if the user exists and the credentials match.
 * The Request Body includes username & password.
 */
backend.post('/auth', async (req, res) => {
    try {


        const username = req.body.username;
        const password = req.body.password;
        let user = await User.findOne({ userName: username });
        if (user === null) {
            return res.status(404).json({ 'status': 404, 'message': `The user doesn't exist.` });
        }
        else {
            if (password !== user.pass) {
                return res.status(400).json({ 'status': 400, 'message': `The credentials don't match.` });
            }
            else {
                // The credentials match.
                req.session.loggedin = true
                req.session.user = {
                    username: username,
                    _id: user._id
                }

                console.log("password correct")
                return res.status(200).json({ 'status': 200, 'message': `Logged in.`, 'user': req.session.user });
            }

        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
})


/**
 * DELETE /logout
 * Logout
 * Will delete the session
 */
backend.delete('/logout', async (req, res) => {
    try {
        if (req.session.user) {
            req.session.destroy();
            return res.status(200).json({ 'status': 200, 'message': 'Signed out.' })
        }
        else {
            return res.status(400).json({ 'status': 400, 'message': 'Not logged in.' })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
})

const getAuth = function (req, res, next) {
    let userId = undefined;
    if (req.body.userId) userId = req.body.userId;
    else userId = req.params.userId;
    if (req.session.loggedin && req.session.user && req.session.user._id == userId) {
        next();
    }
    else {
        return res.status(403).json({ 'status': 403, 'message': `You don't have the permission to perform this action.` })
    }
}

backend.post('/location', getAuth, async (req, res) => {
    try {
        if (!req.body.location) {
            res.status(400).json({ 'status': 400, 'message': "Please give the location and make sure it is in the right format." });
        }
        else {
            let response = await Location.create({
                "userId": req.body.userId,
                "location": location
            });
            return res.status(200).json({ 'status': 200, 'data': response });
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
})

backend.post('/questionnaire', getAuth, async (req, res) => {
    try {
        if (!req.body.question || !req.body.answer) {
            res.status(400).json({ 'status': 400, 'message': "Please give both the question and the answer." });
        }
        else {
            let response = await Questionnnaire.create({
                "userId": req.body.userId,
                "question": req.body.question,
                "answer": req.body.answer
            });
            return res.status(200).json({ 'status': 200, 'message': "The response to the questionnaire is saved to the database." })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
})

backend.put('/likeNumber', getAuth, async (req, res) => {
    try {
        let response = await User.findOneAndUpdate({ _id: req.body.likedUserId },
            { $inc: { 'likeNumber': 1 } },
            {
                new: true
            });
        return res.status(200).json({ 'status': 200, 'message': "The like number has been incremented." })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
});


backend.put('/visitedNumber', getAuth, async (req, res) => {
    try {
        let response = await User.findOneAndUpdate({ _id: req.body.visitedUserId },
            { $inc: { 'visitedNumber': 1 } },
            {
                new: true
            });
        return res.status(200).json({ 'status': 200, 'message': "The visited number has been incremented." })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
});


backend.get('/likeNumber/:userId', getAuth, async (req, res) => {
    try {
        let response = await User.findOne({ _id: req.params.userId });
        return res.status(200).json({ 'status': 200, data: response.likeNumber })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
});


backend.get('/getLastestUserStatus/:userId', async (req, res) => {
    try {
        let response = await User.findOne({ _id: req.params.userId }).select(["-pass"]);
        response.likeNumber = response.whoLikedMe ? response.whoLikedMe.length: 0;
        return res.status(200).json({ 'status': 200, data: response })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
})


backend.post('/getLatestUsersStatus', async (req, res) => {
    try {
        let response = await User.find({ _id: {$in: req.body.userIds} }).select(["-pass"]);
        response.forEach(function(obj){
            obj.likeNumber = obj.whoLikedMe ? obj.whoLikedMe.length: 0;
           });
        return res.status(200).json({ 'status': 200, data: response })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
})


backend.get('/getMyStatus/:userId', getAuth, async (req, res) => {
    try {
        let response = await User.findOne({ _id: {$in: req.params.userId} }).select(["-pass"]);
        return res.status(200).json({ 'status': 200, data: response });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
})


/**
 * Get /collection
 * Get Collection
 * Will return the whole document based on the filter
 */

// TODO: all need proper error handling, permission check, e.t.c.
backend.get('/collection', async (req, res) => {
    try {
        let tableName = req.body.tableName;
        let Table = tables[tableName];
        let response = await Table.findOne(req.body.filter);
        return res.status(200).json({ 'status': 200, 'data': response })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
})



backend.post('/collection', async (req, res) => {
    try {
        let tableName = req.body.tableName;
        let Table = tables[tableName];
        let response = await Table.create(req.body.newDoc);
        return res.status(200).json({ 'status': 200, 'data': response })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
});

backend.put('/miles', getAuth, async (req, res) => {
    try {
        if (!req.body.miles) {
            res.status(400).json({ 'status': 400, 'message': "Please give the miles to add." });
        }
        else {
            let response = await User.findOneAndUpdate({ _id: req.body.userId },
                { $inc: { 'monthlyMiles': req.body.miles, 'totalMiles': req.body.miles, 'dailyMiles': req.body.miles } },
                {
                    new: true
                });

            await Mile.create({
                userId: req.body.userId,
                miles: req.body.miles
            })
            return res.status(200).json({ 'status': 200, 'message': "The miles have been added." })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
})


backend.get('/dailyLeaderboard', async (req, res) => {
    try {
        if (leaderboard.length === 0) {
            res.status(500).json({ 'status': 501, 'message': "The leaderboard is not available yet." });
        }
        else {
            let startIndex = req.query.startIndex ? req.query.startIndex : 0;
            let endIndex = req.query.endIndex ? req.query.endIndex : 10;

            let slicedLeaderboard = leaderboard.slice(startIndex, endIndex);
            let champions = slicedLeaderboard.filter(function (el) {
                return el.rankNumber === 1;
            })
            let nonchampions = slicedLeaderboard.filter(function (el) {
                return el.rankNumber !== 1;
            });
            return res.status(200).json({ 'status': 200, 'data': leaderboard.slice(startIndex, endIndex), 'champions': champions, 'nonchampions': nonchampions })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
})


backend.get('/monthlyLeaderboard', async (req, res) => {
    try {
        if (monthlyLeaderboard.length === 0) {
            res.status(500).json({ 'status': 501, 'message': "The monthly leaderboard is not available yet." });
        }
        else {
            let startIndex = req.query.startIndex ? req.query.startIndex : 0;
            let endIndex = req.query.endIndex ? req.query.endIndex : 10;

            //console.log(users)
            let slicedLeaderboard = monthlyLeaderboard.slice(startIndex, endIndex);
            let champions = slicedLeaderboard.filter(function (el) {
                return el.rankNumber === 1;
            })
            let nonchampions = slicedLeaderboard.filter(function (el) {
                return el.rankNumber !== 1;
            });
            return res.status(200).json({ 'status': 200, 'data': monthlyLeaderboard.slice(startIndex, endIndex), 'champions': champions, 'nonchampions': nonchampions })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
})



backend.put('/championSignature', getAuth, async (req, res) => {
    try {
        if (!req.body.championSignature || req.body.championSignature.length > SIGNATURE_CHAR_LIMIT) {
            res.status(400).json({ 'status': 400, 'message': `Please give the champion signature, and make sure there are no more than ${SIGNATURE_CHAR_LIMIT} characters.` });
        }
        else {
            let response = await User.findOneAndUpdate({ _id: req.body.userId },
                { $set: { 'championSignature': req.body.championSignature } },
                {
                    new: true
                });
            return res.status(200).json({ 'status': 200, 'message': "The champion signature has been updated." })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
});

// To update user's information.
backend.put("/changePassword", getAuth, async (req, res) => {
    const oldPasswordCorrect = async (userId, oldPassword) => {
        let user = await User.findOne({
            _id: userId,
            pass: oldPassword
        });
        if (user !== null) return true;
        else return false;
    }

    const isValidPassword = async (email) => {
        return /^[A-Za-z]\w{7,14}$/.test(email)
    }

    try {
        if (!req.body.oldPassword || !req.body.newPassword || !req.body.confirmedNewPassword) {
            return res.status(400).json({ "status": 400, "message": "Please make sure that you give all of the following: oldPassword, and confirmedNewPassword." });
        }
        else if (req.body.newPassword !== req.body.confirmedNewPassword) {
            return res.status(400).json({ "status": 400, "message": "The new password and the confirmed new password don't match." });
        }
        else if (!(await oldPasswordCorrect(req.body.userId, req.body.oldPassword))) {
            return res.status(400).json({ "status": 400, "message": "Please double check if your old password is correct or not." });
        }
        else if (!(await isValidPassword(req.body.newPassword))) {
            return res.status(400).json({ "status": 400, "message": "Please give a valid password." });
        }
        else if (req.body.newPassword === req.body.oldPassword) {
            return res.status(400).json({ "status": 400, "message": "Your new password is the same as the current one." });
        }
        else {
            let response = await User.findOneAndUpdate({
                _id: req.body.userId
            }, {
                pass: req.body.newPassword
            });
            return res.status(200).json({ "status": 200, "message": "Password updated successfully." })
        }
    }
    catch {
        return res.status(500).json({ "status": 500, "message": "The Server is down." })
    }
})



// To update user's email.
backend.put("/updateEmail", getAuth, async (req, res) => {
    const isValidEmail = async (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const isEmailAlreadyExistForTheUser = async (userId, email) => {
        let user = await User.findOne({
            _id: userId,
            email: email
        });

        if (user !== null) return true;
        else return false;
    }

    try {
        if (!req.body.newEmail) {
            return res.status(400).json({ "status": 400, "message": "Please make sure that you give all of the following: newEmail." });
        }
        else if (!(await isValidEmail(req.body.newEmail))) {
            return res.status(400).json({ "status": 400, "message": "Please give a valid email address." });
        }
        else if ((await isEmailAlreadyExistForTheUser(req.body.userId, req.body.newEmail))) {
            return res.status(400).json({ "status": 400, "message": "The email is same as the current one." });
        }
        else {
            let response = await User.findOneAndUpdate({
                _id: req.body.userId
            }, {
                email: req.body.newEmail
            });
            return res.status(200).json({ "status": 200, "message": "Email updated successfully." })
        }
    }
    catch {
        return res.status(500).json({ "status": 500, "message": "The Server is down." })
    }
})




backend.get('/historyMiles/:userId', getAuth, async (req, res) => {
    // Date needs to be yyyy-mm-dd format.
    try {
        let userId = req.params.userId;
        let miles = []
        if (req.query.startMonth && req.query.endMonth) {

            let startMonthInUTC = moment.utc(moment(req.query.startMonth)).format()
            let endMonthInUTC = moment.utc(moment(req.query.endMonth)).format()
            miles = await Mile.find({
                userId: userId,
                created_at: {
                    $gte: startMonthInUTC,
                    $lte: endMonthInUTC
                }
            })
        }
        else if (req.query.startMonth) {
            let startMonthInUTC = moment.utc(moment(req.query.startMonth)).format()
            miles = await Mile.find({
                userId: userId,
                created_at: {
                    $gte: startMonthInUTC
                }
            })
        }
        else if (req.query.endMonth) {
            let endMonthInUTC = moment.utc(moment(req.query.endMonth)).format()
            miles = await Mile.find({
                userId: userId,
                created_at: {
                    $lte: endMonthInUTC
                }
            })
        }
        else {
            miles = await Mile.find({
                userId: userId
            })
        }

        let cleanedMiles = []
        for (let mile of miles) {
            cleanedMiles.push({
                value: mile.miles,
                month: moment(mile.created_at).local().format('YYYYMM')
            })
        }

        let groupedSums = {}
        for (let mile of cleanedMiles) {
            if (groupedSums[mile.month] === undefined) groupedSums[mile.month] = 0
            groupedSums[mile.month] += mile.value
        }

        let result = []
        for (const [key, value] of Object.entries(groupedSums)) {
            result.push({
                "month": key,
                "miles": value
            })
        }


        return res.status(200).json({ "status": 200, "message": "The requested history monthly miles returned.", "data": result })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
});




backend.put('/like', getAuth, async (req, res) => {
    try {
        let currentUser = await User.findOne({
            "_id": req.body.userId
        });
        if(currentUser.whoILiked.includes(req.body.likedUserId)) {
            return res.status(400).json({ 'status': 400, 'message': "Don't like the same person twice!" })
        }
        else {
            await User.findOneAndUpdate({ _id: req.body.userId },
                { $push: { whoILiked: req.body.likedUserId } },
                {
                    new: true
                });

                await User.findOneAndUpdate({ _id: req.body.likedUserId },
                    { $push: { whoLikedMe: req.body.userId } },
                    {
                        new: true
                    });
        }

        return res.status(200).json({ 'status': 200, 'message': "The like is recorded." })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
});

backend.put('/unlike', getAuth, async (req, res) => {
    try {
        let currentUser = await User.findOne({
            "_id": req.body.userId
        });
        if(!currentUser.whoILiked.includes(req.body.unlikedUserId)) {
            return res.status(400).json({ 'status': 400, 'message': "You can't unlike a person you are not liking." })
        }
        else {
            await User.findOneAndUpdate({ _id: req.body.userId },
                { $pull: { whoILiked: req.body.unlikedUserId } },
                {
                    new: true
                });

                await User.findOneAndUpdate({ _id: req.body.unlikedUserId },
                    { $pull: { whoLikedMe: req.body.userId } },
                    {
                        new: true
                    });
        }

        return res.status(200).json({ 'status': 200, 'message': "The unlike is recorded." })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
});


backend.put('/notificationToken', getAuth, async (req, res) => {
    try {
        if (!req.body.notificationToken) {
            res.status(400).json({ 'status': 400, 'message': `Please give the notificationToken.` });
        }
        else {
            let response = await User.findOneAndUpdate({ _id: req.body.userId },
                { $set: { 'notificationToken': req.body.notificationToken } },
                {
                    new: true
                });
            return res.status(200).json({ 'status': 200, 'message': "The notificationToken has been updated." })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ 'status': 500, 'message': 'The server is down.' })
    }
});


const updateLeaderboard = async () => {
    let updatedAt = new Date(Date.now()).toISOString();
    const usersWithRanks = await User.aggregate([
        {
            $setWindowFields: {
                partitionBy: "$state",
                sortBy: { monthlyMiles: -1 },
                output: {
                    rankNumber: {
                        $rank: {}
                    }
                }
            }
        },
        { $project: { _id: 0, userId: "$_id", rankNumber: 1, updatedAt: updatedAt, userName: "$userName", monthlyMiles: 1, dailyMiles: 1 } }, // TODO: add the other required attributes
    ])
    try {
        let response = await Rank.insertMany(usersWithRanks);

        for (let i = 0; i < usersWithRanks.length; i++) {
            if (usersWithRanks[i].rankNumber === 1) {
                let user = await User.findOne({ _id: usersWithRanks[i].userId });
                usersWithRanks[i].championSignature = user.championSignature;
            }
        }
        leaderboard = usersWithRanks;
        // TODO: remove daily miles once pushed to the leaderboard.
    }
    catch (error) {
        console.log(error)
    }
}


const checkChampions = async () => {
    monthlyLeaderboard = leaderboard;
    let champions = leaderboard.filter(function (el) {
        return el.rankNumber === 1
    });

    let championIds = champions.map(function (el) {
        return el.userId
    })

    await User.updateMany({ _id: championIds },
        { $inc: { 'championTimes': 1 } },
        {
            new: true
        });

    // TODO: remove daily miles once pushed to the leaderboard.
}

const job = schedule.scheduleJob(process.env.UPDATE_RANKS_CRON, function () {
    updateLeaderboard();
});


const job2 = schedule.scheduleJob(process.env.CHECK_CHAMPION_CRON, function () {
    checkChampions();
});
updateLeaderboard();

const port = process.env.PORT || 43030
http.listen(port, () => {
    log(`Listening on port ${port}...`)
})

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    backend.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    backend.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}