const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanic');

const mechanicauth = require('../middleware/mechanic')

// getorder
router.get('/',mechanicauth,mechanicController.getorder)

//orderhistory
router.get('/order-history',mechanicauth,mechanicController.orderhistory)


//getprofile
router.get('/profile',mechanicauth,mechanicController.getprofile)

//approve status of order
router.put('/approveorder/:orderid',mechanicauth,mechanicController.approveorder)

//cancel order status of order
router.put('/cancelorder/:orderid',mechanicauth,mechanicController.cancelorder)
//completed order status && add order decription of order
router.put('/completedorder/:orderid',mechanicauth,mechanicController.completedorder)





module.exports = router;