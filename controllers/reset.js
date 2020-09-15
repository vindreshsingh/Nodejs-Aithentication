const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const JWT_RESET_KEY = "jwtresetpassword987";

//------User Models ------//
const User = require('../models/User');
//------ Reset Your Password Handle -------//
exports.forgotPassword =function(req, res){
    try{
    const {email}  = req.body;
     let errors = [];

    //------------ Checking all required fields in form ------------//
    if (!email) {
        errors.push({ msg: 'Please enter Your an email ID' });
    }

    if(errors.length>0) {
        res.render('forgot', {
            errors,
            email
        });
    } else{
        User.findOne({ email: email }).then(user=>{
            if (!user){
                //---This UserName already exists or not-------//
                errors.push({ msg: 'Your Email ID does not exist!,First you registerd' });
                res.render('forgot', {
                    errors,
                    email
                });
            } else {

                const jwt_token = jwt.sign({ _id: user._id }, JWT_RESET_KEY, { expiresIn: '30m' });
                const CLIENT_REQUEST_URL = 'http://' + req.headers.host;
                const output = `
                <h1>Please click on below link to reset your account password</h1>
                <p>${CLIENT_REQUEST_URL}/auth/forgot/${jwt_token}</p>
                <p><b>NOTE: </b> The activation link expires in 30 minutes.</p>
                `;

                User.updateOne({resetLink:jwt_token },function(err, success){
                    if(err) {
                        errors.push({msg:'Something Error in Your resetting password!' });
                        res.render('forgot', {
                            errors,
                            email
                        });
                    }
                    else{
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            port:578,
                            secure:false,
                            auth: {
                                user: "nodejsa@gmail.com",
                                pass: "nodejs123",
                            },
                        });

                        // send mail with defined transport object
                        const mailOptions = {
                            from: '"Auth Admin" <nodejsa@gmail.com>', // sender address
                            to: email, // list of receivers
                            subject: "Account Password Reset: NodeJS Auth ✔", // Subject line
                            html: output, // html body
                        };

                        transporter.sendMail(mailOptions,function(error, info){
                            if(error) {
                                console.log(error);
                                req.flash(
                                    'error_msg',
                                    'Something went wrong on our end. Please try again later.'
                                );
                                res.redirect('/auth/forgot');
                            }
                            else{
                                console.log('Mail sent : %s', info.response);
                                req.flash(
                                    'success_msg',
                                    'Your reset link sent to your email ID. Please follow the instructions.'
                                );
                                res.redirect('/auth/login');
                            }
                        })
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

//------------ Redirect to Reset Handle ------------//
exports.gotoReset = (req, res) => {
    try{
    const { token } = req.params;

    if (token) {
        jwt.verify(token, JWT_RESET_KEY, (err, decodedToken) => {
            if (err) {
                req.flash(
                    'error_msg',
                    'Incorrect or your link expired ! Please try again.'
                );
                res.redirect('/auth/login');
            }
            else {
                const { _id } = decodedToken;
                User.findById(_id, (err, user) => {
                    if (err) {
                        req.flash(
                            'error_msg',
                            'Your email ID does not exist!First you register then,Please try again.'
                        );
                        res.redirect('/auth/login');
                    }
                    else {
                        res.redirect(`/auth/reset/${_id}`)
                    }
                })
            }
        })
    }
    else {
        console.log("Something error in your reseting password!,please try again")
    }
}
catch(err){
    console.log("err");
    return ("back");
}
}


exports.resetPassword = (req, res) => {
    try{
    var { password, confirm_password } = req.body;
    const id = req.params.id;
    
    //------------ Checking required fields ------------//
    if (!password || !confirm_password) {
        req.flash(
            'error_msg',
            'Please enter all fields.'
        );
        res.redirect(`/auth/reset/${id}`);
    }

    //------------ Checking password length ------------//
    else if (password.length < 6) {
        req.flash(
            'error_msg',
            'Password must be at least 6 characters.'
        );
        res.redirect(`/auth/reset/${id}`);
    }

    //------------ Checking password mismatch ------------//
    else if (password != confirm_password) {
        req.flash(
            'error_msg',
            'Passwords do not match.'
        );
        res.redirect(`/auth/reset/${id}`);
    }

    else {
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(password, salt, (err, hash) => {
                if (err) throw err;
                password = hash;

                User.findByIdAndUpdate(
                    { _id: id },
                    { password },
                    function (err, result) {
                        if (err) {
                            req.flash(
                                'error_msg',
                                'Error in resetting password!'
                            );
                            res.redirect(`/auth/reset/${id}`);
                        } else {
                            req.flash(
                                'success_msg',
                                'Your password reset successfully!'
                            );
                            res.redirect('/auth/login');
                        }
                    }
                );
                
            });
        });
    }
}
catch(err){
    console.log("err");
}
}