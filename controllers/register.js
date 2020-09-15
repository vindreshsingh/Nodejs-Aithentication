const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactivatedaccount5198";

//------ User Models ------//
const User = require('../models/User');
//--- Register Handler ------//
exports.registerHandle =function(req,res){
    try{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password
    const  confirm_password= req.body.confirm_password;
    let errors = [];
   
    //------ Checking all required fields in your form ---------//
    if (!name) {
        errors.push({ msg:'Please enter your name here' });
    }
    if(!email){
        errors.push({ msg:'Please enter your existing email id here' });
    }
    if(!password){
        errors.push({ msg:'Create your password' });
    }
    if(!confirm_password){
        errors.push({ msg:'Confirm your password' });
    }

    //----- Checking password match or not ------//
    if (password!=confirm_password) {
        errors.push({ msg:'Your Passwords do not match, Please enter correct password' });
    }

    //---- Checked here for password length ----//
    if(password.length<6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if(errors.length>0) {
        res.render('register',{
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else{
        //------------ Create some validation passed ------------//
        User.findOne({ email:email }).then(user=>{
            if (user) {
                //------------ User already exists ------------//
                errors.push({ msg: 'This Email ID already registered,Please login' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    confirm_password
                });
            } 
            else{

                const jwt_token =jwt.sign({ name,email,password },JWT_KEY,{ 
                    expiresIn: '15m' });
                const CLIENT_Request_URL = 'http://'+req.headers.host;

                const output = `<h2>Please click on below link and activate your account</h2>
                <p>${CLIENT_Request_URL}/auth/activate/${jwt_token}</p>
                <p><b>NOTE: </b> The above activation link expires in 15 minutes.</p>
                `;

                const transporter=nodemailer.createTransport({
                    service: 'gmail',
                    port:578,
                    secure:false, // for true user port 465 ,otherwise use any port
                    auth: {
                        user: "nodejsa@gmail.com",
                        pass: "nodejs123",
                    },
                });

                // send mail with defined transport object
                const mailOptions = {
                    from: '"Auth Admin" <nodejsa@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Account Verification: NodeJS Auth ✔", // Subject line
                    html: output, // html body
                };

                transporter.sendMail(mailOptions,function(error, info) {
                    if (error) {
                        console.log(error);
                        req.flash(
                            'error_msg',
                            'Something went wrong on our end or your end. Please register again.'
                        );
                        res.redirect('/auth/login');
                    }
                    else {
                        console.log('Mail sent : %s',info.response);
                        req.flash(
                            'success_msg',
                            'Activation link sent to Your email ID. Please activate to log in.'
                        );
                        res.redirect('/auth/login');
                    }
                })

            }
        });
    }
}
catch(err){
    console.log(err);
    return('back');
}
}

// ------Activated Handler --------//
exports.activateHandle = function(req,res){
    try{
    const jwt_token = req.params.token;
    let errors = [];
    if (jwt_token) {
        jwt.verify(jwt_token,JWT_KEY,function(err,decodedToken){
            if (err){
                req.flash(
                    'error_msg',
                    'Something is not correct or This link is expired! Please register again.'
                );
                res.redirect('/auth/register');
            }
            else{
                const name=decodedToken;
                const email=decodedToken;
                const password=decodedToken;
                User.findOne({ email:email }).then(user=>{
                    if (user) {
                        //------------ This Username  already exists ------------//
                        req.flash(
                            'error_msg',
                            'Email ID already registered! Please log in. or try another username'
                        );
                        res.redirect('/auth/login');
                    } else {
                        const newUser=new User({
                            name,
                            email,
                            password
                        });
                        //-------Activate account------//
                        bcryptjs.genSalt(10,function(err,salt){
                            bcryptjs.hash(newUser.password,salt,function(err,hash) {
                                if(err) {
                                    throw err;
                                }
                                newUser.password=hash;
                                newUser.save().then(user=>{
                                        req.flash(
                                            'success_msg',
                                            'Account activated. You can now log in.'
                                        );
                                        res.redirect('/auth/login');
                                    }).catch(err=>console.log("error "+ err));
                            });
                        });
                    }
                });
            }

        })
    }
    else {
        console.log("Account activation error!")
    }
}
catch(err){
    console.log(err);
    return('back');
}
}