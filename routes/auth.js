const express = require('express');
const router = express.Router();

//------------ Importing Controllers ------------//
const authController = require('../controllers/login-logout')
const register=require("../controllers/register");
const reset=require("../controllers/reset");
//------------ Login Route ------------//
router.get('/login', (req, res) => res.render('login'));

//------------ Forgot Password Route ------------//
router.get('/forgot', (req, res) => res.render('forgot'));

//------------ Reset Password Route ------------//
router.get('/reset/:id', (req, res) => {
    // console.log(id)
    res.render('reset', { id: req.params.id })
});

//------------ Register Route ------------//
router.get('/register', (req, res) => res.render('register'));

//------------ Register POST Handle ------------//
router.post('/register', register.registerHandle);

//------------ Email ACTIVATE Handle ------------//
router.get('/activate/:token', register.activateHandle);

//------------ Forgot Password Handle ------------//
router.post('/forgot', reset.forgotPassword);

//------------ Reset Password Handle ------------//
router.post('/reset/:id', reset.resetPassword);

//------------ Reset Password Handle ------------//
router.get('/forgot/:token', reset.gotoReset);

//------------ Login POST Handle ------------//
router.post('/login', authController.loginHandle);

//------------ Logout GET Handle ------------//
router.get('/logout', authController.logoutHandle);

module.exports = router;