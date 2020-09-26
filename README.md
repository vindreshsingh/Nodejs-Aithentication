# NodeJS Authentication App
> This is the complete authentication for signin,signup,signout and reset password  using your email application.This is completely develop using Nodejs,mongoose,nodemailer for mail sent,JWT for authenticate,express js and use connect-flash for showing success_msg and error_msg.


## GitHub Link
https://github.com/vindreshsingh/Nodejs-Aithentication

## app link
(screenshot)[https://drive.google.com/file/d/1_sQgyBRWxwRHFIdWKD7Na63rsAwdkLSb/view?usp=sharing]


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
| --- |___register.png <br>
│ --- ├──reset.svg <br>
│ --- └── css <br>
│ ----     └── bootstrap.min.css <br>
├── config <br>
│ --- ├── checkAuth.js <br>
│ --- └── passport.js <br>
├── controllers <br>
│ --- ├──login-logout.js <br>
│ --- ├── register.js <br>
│ --- └── reset.js <br>
├── models <br>
│ --- └── User.js <br>
├── node_modules <br>
├── routes <br>
│ --- ├── auth.js <br>
│ --- └── index.js <br>
├── views <br>
│ --- └── partials <br>
│ -------- └── flash-message.ejs <br>
│ -------- └── password-form.ejs <br>
│ --- ├── dash.ejs <br>
│ --- ├── forgot.ejs <br>
│ --- ├── layout.ejs <br>
│ --- ├── login.ejs <br>
│ --- ├── register.ejs <br>
│ --- ├── reset.ejs <br>
│ --- └── welcome.ejs <br>
├── .gitignore <br>
├── package.json <br>
├── package-lock.json <br>
├── README.md <br>
└── server.js <br>
