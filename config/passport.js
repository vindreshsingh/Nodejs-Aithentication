const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//------------ Local User Model ------------//
const User = require('../models/User');

module.exports = function(passport) {
    try{
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            //------------ Check User Matching ------------//
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'Your email ID is not registered' });
                }

                //------------ check Password Matching ------------//
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Your Password is  incorrect! Please try again or reset your password.' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}
catch(err){
    console.log(err);
    return;
}
};