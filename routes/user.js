const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const userAuth = require('../middleware/user')


router.get('/', userController.getallMechanics);
router.get('/profile', userAuth, userController.getuserprofile);
router.get('/order-history', userAuth, userController.orderhistory);
router.post('/makeOrder', userAuth, userController.makeOrder);


//make reviews

router.get('/feedback/:id',  userController.feedback);
router.put('/feedBack/:id', userAuth, userController.submitFeedback);

module.exports = router;
