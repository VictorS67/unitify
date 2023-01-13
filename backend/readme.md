# Unitify Backend

## Environment
- Ubuntu 20.04
- MongoDB 5.0.9
- Nginx 1.18.0
- Redis 5.0.7

## Installation

Clone the repo.
`git clone https://github.com/VictorS67/unitify.git`

Switch to the backend branch.
`git checkout backend`

Install all the necsessary node libraries and dependencies.
`npm install`

Now, you need to set up the necessary environments:

Run this code first to copy from the .env template:
`cp .env-sample .env`

```
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
SIGNATURE_CHAR_LIMIT=THE_CHAMPION_SIGNATURE_LENGTH_LIMIT
CHECK_CHAMPION_CRON=CRON_FREQUENCY_OF_CHECKING_CHAMPION
UPDATE_RANKS_CRON=CRON_FREQUENCY_OF_UPDATING_LEARERBOARDT
PORT=PORT_THE_BACKEND_IS_RUNNING
```

Now, after the above steps, you can run the backend: 
`node unitify-server.js`

And you can verify by running: 
`localhost:PORT/hello-world`

You should be able to see the following output in your browser:
`Congratulations, the Unitify backend is now running.`

If you want to run the app in the backend (production), you can run the following command, but make sure that you have PM2 installed in your ubuntu machine (you can use this tutorial: https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps): 

`pm2 start unitify-server.js`

## Usage

### GET /user: to get a user object if logged in
#### Parameter
None
#### Responses
200
When a user has logged in before and has not logged out yet.
```
{
	"status": 200, 
	"user": UserObject,
      "message": "Returned user object in session."
}
```
The returned UserObject is a JSON object itself:
```
{
	"_id": userId,
	"username": "username"
}
```

404
When the user has not logged in yet.
```
{
	"status": 400, 
	"user": undefined,
      "message": "The user has not logged in."
}
```

500
The server runs into some issue.
```
{
	"status": 500, 
	"user": undefined,
      "message": "The Server is down."
}
```


### POST /auth: to login - update the user object in session
#### Request Body
```
{
	"username": username,
	"password": password
}
```

#### Responses
200
When the username exists and the username and password match.
This API will create a userObject in the session, and make `session.loggedin = true`: 
```
req.session.loggedin = true
req.session.user = {
username: username,
 _id: user._id
}
Response as follow: 
{
	"status": 200, 
	"user": UserObject,
      "message": "Logged in."
}
```

#### 404
When the username doesn’t exist in the database.
```
{
	"status": 404, 
      "message": "The user doesn't exist."
}
```

#### 400
When the username exists, but the password is not correct.
```
{
	"status": 400, 
	"user": undefined,
      "message": "The credentials don't match."
}
```

#### 500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### POST /signup: to signup - create a new user
#### Request Body
```
{
	"username": username,
      "email": emailAddress,
	"password": password, 
      "confirmedPassword": confirmedPassword
}
```
#### Responses
200
The username doesn’t exist and every input is valid.
```
{
	"status": 200, 
      "message": "Sign up successfully."
}
```
400
When the username already exists or any input is not valid.
```
{
	"status": 400, 
      "message": someErrorMessage
}
```
500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### DELETE /logout: to logout - delete the session

#### Request Body
None
Responses
200
The session will be destroyed (empty).

Response as follow: 
```
{
	"status": 200, 
      "message": "Signed out."
}
```

400
When the user is not logged in (the session is empty already).
```
{
	"status": 400, 
      "message": "Not logged in."
}
```

500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### POST /location: to add a new location record in location table

#### Request Body
```
{
	"userId": userId, # the userId of the user we are saving location for
	"location": LIST(43.6532, -79.3832) # a list of length 2
}
```
#### Responses
200
The userid and location are both valid, and the location is saved to the database.
Response as follow: 
```
{
	"status": 200, 
      "message": "The location is saved to the database."
}
```
403
The userid doesn’t match what’s in the session (or the user is logged in)
```
{
	"status": 403, 
      "message": "You don’t have the permission to perform this action."
}
```
400
The location is not in the right format.
```
{
	"status": 400, 
      "message": "Please give the location and make sure it is in the right format."
}
```
500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### POST /questionnaire: to add a new response to a questionnaire

#### Request Body
```
{
	"userId": userId, # the userId of the user we are saving location for
	"question": Question Content,
      "answer": response to the question
}
```
#### Responses
200
The userid is valid, and question and answer are both given as required.
Response as follow: 
```
{
	"status": 200, 
      "message": "The response to the questionnaire is saved to the database."
}
```
403
The userid doesn’t match what’s in the session (or the user is logged in)
```
{
	"status": 403, 
      "message": "You don’t have the permission to perform this action."
}
```

400
question and answer are not given.
```
{
	"status": 400, 
      "message": "Please give the location and make sure it is in the right format."
}
```

500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### PUT /visitedNumber: to increment the like number of a user being visited
To increase the visitedNumber of a user by their user id.

#### Request Body
```
{
	"userId": userId, # the userId of the user
	"visitedUserId": the user id which is being visited
}
```
#### Responses
200
Response as follow: 
```
{
	"status": 200, 
      "message": "The visited number has been incremented."
}
```
403
The userid doesn’t match what’s in the session (or the user is logged in)
```
{
	"status": 403, 
      "message": "You don’t have the permission to perform this action."
}
```
500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### GET /likeNumber/:userId: get the like number of the current user

#### Responses
200
```
{
	"status": 200, 
      "data": #LikeNumber
}
```
403
The userid doesn’t match what’s in the session (or the user is logged in)
```
{
	"status": 403, 
      "message": "You don’t have the permission to perform this action."
}
```
500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### PUT /miles: to increase a user’s miles record
It will increase the monthlyMiles and totalMiles of a user. It won’t change the rank in real time.
Cron job to update users ranking based on monthly miles. Define the frequency in .env.
Cron job to clear month miles at the end of the month.

#### Request Body
```
{
	"userId": userId, # the userId of the user
	"miles": the miles to add
}
```
#### Responses
200
The userid is valid, and question and answer are both given as required.
Response as follow: 
```
{
	"status": 200, 
      "message": "The miles have been added."
}
```
403
The userid doesn’t match what’s in the session (or the user is logged in)
```
{
	"status": 403, 
      "message": "You don’t have the permission to perform this action."
}
```

500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```
### GET /dailyLeaderboard?startIndex=&endIndex=: get leaderboard in a range
It will return a slice of the leaderboard in the memory, given the startIndex and endIndex.
Note that it won’t always return all the ties.
leaderboard.slice(startIndex, endIndex)
By default startIndex = 0, endIndex = 10
This is the live-time leaderboard.

#### Request Paramters
```
{
	"startIndex": the start index of the leaderboard
	"endIndex": the end index of the leaderboard
}
```
#### Responses
200
Response as follow:
```
{
	"status": 200, 
      "data": an array of the people in the leaderboard
}
```
501
The leaderboard is empty (not available or something is wrong in updating the leaderboard)
```
{
	"status": 501, 
      "message": "The leaderboard is not available yet."
}
```

500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### GET /monthlyLeaderboardmonthlyLeader?startIndex=&endIndex=: get leaderboard in a range
It will return a slice of the leaderboard in the memory, given the startIndex and endIndex.
Note that it won’t always return all the ties.
leaderboard.slice(startIndex, endIndex)
By default startIndex = 0, endIndex = 10
#### Request Paramters
```
{
	"startIndex": the start index of the leaderboard
	"endIndex": the end index of the leaderboard
}
```
#### Responses
200
Response as follow: 
```
{
	"status": 200, 
      "data": an array of the people in the leaderboard
}
```
501
The leaderboard is empty (not available or something is wrong in updating the leaderboard)
```
{
	"status": 501, 
      "message": "The leaderboard is not available yet."
}
```
500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### PUT /championSignature: to update a user’s champion signature
#### Request Body
```
{
	"userId": userId, # the userId of the user
	"championSignature": the new champion signature
}
```
#### Responses
200
The userid is valid, the champion signature has length between 0 and 100.
Response as follow: 
```
{
	"status": 200, 
      "message": "The chapion signature has been updated."
}
```
403
The userid doesn’t match what’s in the session (or the user is logged in)
```
{
	"status": 403, 
      "message": "You don’t have the permission to perform this action."
}
```
400
The champion signature has length > ENV.SIGNATURE_CHAR_LIMIT or the champion signature is missing.
```
{
	"status": 400, 
      "message": "Please don’t write more than ENV.SIGNATURE_CHAR_LIMIT characters."
}
```
500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### GET /getLastestUserStatus/:userId: get the whole user object
#### Responses
200
The userid is valid, and question and answer are both given as required.
Response as follow: 
```
{
	"status": 200, 
      "data": userObject
}
```
403
The userid doesn’t match what’s in the session (or the user is logged in)
```
{
	"status": 403, 
      "message": "You don’t have the permission to perform this action."
}
```
500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```


### PUT /updateEmail: to update a user’s email
```
{
	"userId": userId, # the userId of the user
	"newEmail": the new email address
}
```
#### Responses
200
Response as follow: 
```
{
	"status": 200, 
      "message": "Email updated successfully."
}
```
403
The userid doesn’t match what’s in the session (or the user is logged in)
```
{
	"status": 403, 
      "message": "You don’t have the permission to perform this action."
}
```
400
New email is the same as the current one.
Email address is not valid.
```
{
	"status": 400, 
      "message": "Corresponding error message”
}
```
500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### PUT /changePassword: to update a user’s password
#### Request Body
```
{
	"userId": userId, # the userId of the user
	"oldPassword": the current password, 
      "newPassword": new password, 
      "confirmedNewPassword": confirmed new password
}
```
#### Responses
200
Response as follow: 
```
{
	"status": 200, 
      "message": "Password updated successfully."
}
```

403
The userid doesn’t match what’s in the session (or the user is logged in)
```
{
	"status": 403, 
      "message": "You don’t have the permission to perform this action."
}
```

400
new password is different from the confirmed new password
New password is the same as the old one.
Password doesn’t satisfy the requirement.
Old password is not correct.
```
{
	"status": 400, 
      "message": "Corresponding error message”
}
```

500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### GET /historyMiles/:userId:get the history monthly miles
Optional query values: startMonth, endMonth. Format: yyyy-mm
https://unitify-api.chenpan.ca/historyMiles/639de75e4f6f2dd7793c6f17?startMonth=2022-12

#### Responses
200
Response as follow: 
```
{
	"status": 200, 
      "data": aDataFrame(list) of object
}
```

403
The userid doesn’t match what’s in the session (or the user is logged in)
```
{
	"status": 403, 
      "message": "You don’t have the permission to perform this action."
}
```

500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### PUT /like: to like a user
#### Request Body
```
{
	"userId": userId, # the userId of the user
	"likedUserId": the userid of who is being liked
}
```

#### Responses
200
Response as follow: 
```
{
	"status": 200, 
      "message": "The like is recorded."
}
```

400
If the user has already been liked by the user (which should have been disallowed by the front end)
```
{
	"status": 400, 
      "message": "Don't like the same person twice!”
}
```

500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### PUT /unlike: to unlike a user
#### Request Body
```
{
	"userId": userId, # the userId of the user
	"unlikedUserId": the userid of who is being unliked
}
```

#### Responses
200
Response as follow: 
```
{
	"status": 200, 
      "message": "The unlike is recorded."
}
```

400
If the user is not liked by the current user.
```
{
	"status": 400, 
      "message": "You can't unlike a person you are not liking.”
}
```

500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```

### PUT /notificationToken: to update the notificationToken
#### Request Body
```
{
	"userId": userId, # the userId of the user
	"notificationToken": the new notificationToken
}
```

#### Responses
200
Response as follow:
```
{
	"status": 200, 
      "message": "The notificationToken has been updated."
}
```

500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```


### GET /getMyStatus/:userId: get the whole user object of the current user
#### Responses: 
200
The userid is valid, and question and answer are both given as required.
Response as follow: 
```
{
	"status": 200, 
      "data": userObject
}
```
403
The userid doesn’t match what’s in the session (or the user is logged in)
```
{
	"status": 403, 
      "message": "You don’t have the permission to perform this action."
}
```
500
The server runs into some issue.
```
{
	"status": 500, 
      "message": "The Server is down."
}
```









