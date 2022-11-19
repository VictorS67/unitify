log = console.log;
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;
let mongoDB = connectionString;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const schemas = require('./schema.js');

const User = mongoose.model('users', schemas.userSchema, 'users');

const backend = express();


/**
 * Get /user
 * Return the user object if the user logins in. Otherwise return undefined.
 */
backend.get("/user", (req, res) => {
    console.log("Received a request to check if logged in.")
    if (req.session.loggedin) {
        return res.status(200).json({ "status": 200, "user": req.session.user})
    }
    else {
        return res.status(200).json({ "status": 200, "user": undefined})
    }
})



/**
 * POST /auth
 * Login Authedication. 
 * Will set up user object in the session if the user exists and the credentials match.
 * The Request Body includes username & password.
 */
backend.post('/auth', (req, res) => {
    User.findOne({username: req.body.username}, function(err, user) {
        if (user === null) {
            return res.status(404).json({'status': 200, 'message': `The user doesn't exist.`});
        }
        else if (!Bcrypt.compareSync(req.body.user.password, user.password)) {
            return res.status(400).json({'status': 400, 'message': `The username and the password don't match.`});
        }
        else {
            // The credentials match.
            req.session.loggedin = true
            req.session.user = {
                username: user.username,
                _id: user._id
            }
            return res.status(200).json({'status': 200, 'message': `Logged in.`})
        }
    })
    .catch(error => {
        return res.status(500).json({'status': 500, 'message': 'The server is down.'})
    })
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