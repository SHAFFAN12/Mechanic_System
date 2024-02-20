
const User =require('../models/user')
const Order =require('../models/order')
const Mechanic =require('../models/mechanic')





const getAllmechanic =async(req,res)=>{
 try {
    const getmechanic = await Mechanic.find().select('-password');
    res.json(getmechanic)
 } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}


const deactivateMechanic = async(req,res)=>{
const mechanicId   =  req.params.mechanicid;
try {
    await Mechanic.findByIdAndUpdate(mechanicId, { verification: false }, { new: true });
    res.json({ msg: 'Mechanic profile deactivated ' });
    
} catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'Server error'})
}

}

const activateMechanic = async(req,res)=>{
const mechanicId   =  req.params.mechanicid;
try {
    await Mechanic.findByIdAndUpdate(mechanicId, { verification: true }, { new: true });
    res.json({ msg: 'Mechanic profile  activated ' });
    
} catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'Server error'})
}

}




const rejectMechanicservices = async(req,res)=>{
const mechanicId   =  req.params.mechanicid;
try {
    await Mechanic.findByIdAndUpdate(mechanicId, { serviceVerification: false }, { new: true });
    res.json({ msg: 'Mechanic services are rejected ' });
    
} catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'Server error'})
}

}

const approveMechanicservices = async(req,res)=>{
const mechanicId   =  req.params.mechanicId;
try {
    await Mechanic.findByIdAndUpdate(mechanicId, { serviceVerification: true }, { new: true });
    res.json({ msg: 'Mechanic services are  accepted ' });
    
} catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'Server error'})
}

}






const getAlluser = async(req,res) => {
 try {
    const getallusers = await User.find().select('-password');
    res.json(getallusers)
 } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}

































const getAllOrders =async(req,res)=>{

    try {
        const order= await Order.find()
        res.json(order)
    }
     catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}













const getAllOrderscompleted=async(req,res)=>{
try {
const completedorder =await Order.find({status:'Completed'})
res.json(completedorder)    

} catch (error) {
    console.error(error.message);
    res.status(500).json({msg:'server error'})

}
}

const getAllOrdersongoing = async(req, res) => {
    try {
        const ongoingorder = await Order.find({status:'Ongoing'})
        res.json(ongoingorder)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({msg:'server error'})    
    }
}


const getAllOrderscancel = async(req, res) => {
    try {
        const orderscancel = await Order.find({status:'Cancel'})
        res.json(orderscancel) 
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({msg:'server error'})
    }
}
const getAllOrderswaiting = async(req, res) => {
    try {
        const orderwaiting = await Order.find({status:'waiting'})
        res.json(orderwaiting) 
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({msg:'server error'})
    }
}


module.exports={getAllOrderscompleted,getAllOrdersongoing,getAllOrderscancel,getAllOrderswaiting,getAllOrders,getAllmechanic,activateMechanic,deactivateMechanic,approveMechanicservices,rejectMechanicservices,getAlluser}