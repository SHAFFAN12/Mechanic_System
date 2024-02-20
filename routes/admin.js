const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const userauth = require('../middleware/user');
const mechanicauth = require('../middleware/mechanic');
const auth = require('../middleware/admin');



// mechanic management
router.get('/mechanicprofile', auth, adminController.getAllmechanic);
router.put('/mechanicprofile/:mechanicid/activate', auth, adminController.activateMechanic);
router.put('/mechanicprofile/:mechanicid/deactivate', auth, adminController.deactivateMechanic);



// // vendor management

router.put('/serviceverification/:mechanicId/approve', auth, adminController.approveMechanicservices);
router.put('/serviceverification/:mechanicId/reject', auth, adminController.rejectMechanicservices);



// getalluserprofiles
router.get('/userprofile', auth, adminController.getAlluser);




// Order Management
router.get('/orders', auth, adminController.getAllOrders);
router.get('/orders/completed', auth, adminController.getAllOrderscompleted);
router.get('/orders/ongoing', auth, adminController.getAllOrdersongoing);
router.get('/orders/cancel', auth, adminController.getAllOrderscancel);
router.get('/orders/waiting', auth, adminController.getAllOrderswaiting);















 


module.exports= router;