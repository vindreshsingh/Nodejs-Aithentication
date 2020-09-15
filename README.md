# NodeJS Authentication App
> This is the complete authentication for signin,signup,signout and reset password our password using your email application.This is completely develop using Node-js,monoose,nodemailer for mail sent,JWT for athenticate,express js and use connect-flash for showing success_msg and error_msg.


## Web App Link
http://serene-headland-22338.herokuapp.com/

![Screenshot (4)](https://user-images.githubusercontent.com/49118089/90341145-b776a900-e01a-11ea-93c8-4f6864a141c1.png)

## Tech Stack
1.  NodeJS
2.  Express
3.  JWT
4.  MongoDB
5.  Mongoose
6.  PassportJS(Local-passport)
7. connect-flash
8.  ejs
9.  Nodemailer


## Prerequisites
- Git
- NodeJS
- CLI

## Installation Process

##### Clone the latest Repository



##### Into the project directory

`cd Nodejs-Authentication`

##### Installing NPM dependencies

`npm install`

##### Then simply start this app

`npm start run`

#### The Server should now be running at http://localhost:3500/

## Folder Structure

Nodejs-Authentication <br>
├── assets <br>
│ --- ├── forgot.svg <br>
│ --- ├── login-images.svg <br>
|-----|___register.png
|-----|___reset.svg
│ --- └── css <br>
│ -------- └── bootstrap.min.css <br>
├── config <br>
│ --- ├── checkAuth.js <br>
│ --- └── passport.js <br>
├── controllers <br>
│ --- └──login-logout.js
| --- |___register.js
| --- |___reset.js
├── models <br>
│ --- └── User.js <br>
├── node_modules <br>
├── routes <br>
│ --- ├── auth.js <br>
│ --- └── index.js <br>
├── views <br>
│ --- ├── dash.ejs <br>
│ --- ├── forgot.ejs <br>
│ --- ├── layout.ejs <br>
│ --- ├── login.ejs <br>
│ --- ├── messages.ejs <br>
│ --- ├── register.ejs <br>
│ --- ├── reset.ejs <br>
│ --- └── welcome.ejs <br>
├── .gitignore <br>
├── package.json <br>
├── package-lock.json <br>
├── README.md <br>
└── server.js <br>