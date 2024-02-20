const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

const userAuth = require('../middleware/user')
const mechanicAuth = require('../middleware/mechanic')
const adminAuth = require('../middleware/admin')
const {check} = require('express-validator')


router.post('/userregister',[
check('userName','Enter your full name').not().isEmpty(),
check('email','Enter your full email').isEmail(),
check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
check('phoneNumber', 'Phone number is required').not().isEmpty(),
],authController.userregister);


router.post('/userlogin',
[
    check('email','Enter your full email').isEmail(),
    check('password','Enter your valid password').exists(),
],authController.userlogin);

router.get('/user-login',userAuth,authController.userauth);


















router.post('/mechanicregister',[
    check('CNIC','Enter your full CNIC Number').not().isEmpty(),
    check('name','Enter your full name').not().isEmpty(),
    // check('email','Enter your full email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
    check('location').isIn(['Karachi South', 'Karachi East', 'Karachi West', 'Karachi Central', 'Karachi North', 'Korangi']).withMessage('Invalid location'),
],authController.mechanicregister);
    
    
    
router.post('/mechaniclogin',
[
    check('phoneNumber','Enter your full Phone Number').not().isEmpty(),
    check('password','Enter your valid password').exists(),
],authController.mechaniclogin);


    router.get('/mechanic-login',mechanicAuth,authController.mechanicauth);
//get by params    
router.get('/mechaniclogin/:mechanicid',authController.getmechanicbyparams);































    
router.post('/adminregister',[
    check('adminName','Enter your full name').not().isEmpty(),
    check('email','Enter your full email').isEmail(),
    check('password', 'Please enter a password with 4 or more characters').isLength({ min: 4 }),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
    ],authController.adminregister);
    
    
    router.post('/adminlogin',
[
    check('email','Enter your full email').isEmail(),
    check('password','Enter your valid password').exists(),
],authController.adminlogin);


    router.get('/admin-login',adminAuth,authController.adminauth);



module.exports = router;