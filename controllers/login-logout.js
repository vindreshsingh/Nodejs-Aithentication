const passport = require('passport');
//---- Login Handle Of User -----//
exports.loginHandle = function(req, res, next) {
    try{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
}
catch(err){
    console.log(err);
    return;
}
}
//---- Logout Handles Of the User -------//
exports.logoutHandle =function(req, res){
    try{
    req.logout();
    req.flash('success_msg', 'You are succefully logged out');
    res.redirect('/auth/login');
}
catch(err){
    console.log(err);
    return;
}
}