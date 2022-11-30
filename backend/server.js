log = console.log;
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const bodyParser = require('body-parser')

const connectionString = process.env.MONGODB_URI;
let mongoDB = connectionString;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const schemas = require('./schema.js');
const e = require('express');

const User = mongoose.model('users', schemas.userSchema, 'users');

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



/**
 * Get /user
 * Return the user object if the user logins in. Otherwise return undefined.
 */
backend.get("/user", (req, res) => {
    console.log("Received a request to check if logged in.")
    if (req.session.loggedin) {
        return res.status(200).json({ "status": 200, "user": req.session.user })
    }
    else {
        return res.status(200).json({ "status": 200, "user": undefined })
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
                return res.status(200).json({ 'status': 200, 'message': `Logged in.` })
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
        if(req.session.user) {
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






const port = process.env.PORT || 43030
backend.listen(port, () => {
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