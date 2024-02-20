const Mechanic = require('../models/mechanic');
const Order =require('../models/order')


const getorder =async(req,res)=>{
try {
  const id= req.mechanic.id;
  const order = await Order.find({mechanicId: id,status:'waiting' }).sort({
    created_at:-1
  })

  res.json(order)

} catch (error) {
  console.error(error.message)
  res.status(500).json({msg:'server error'})
}
} 

const orderhistory =async(req,res)=>{
  try {
  const id=req.mechanic.id;
  const orderHistory = await Order.find({ mechanicId: id }).sort({ created_at: -1 });


res.json(orderHistory);
} catch (err) {
  console.error(err.message)
  res.status(500).json({msg:'Server error'})
}

}









const getprofile =async(req,res)=>{
 try {
  const id= req.mechanic.id

  const profile =await Mechanic.findById(id).select('-password')


  res.json(profile)

  
 } catch (error) {
  console.error(error.message)
  res.status(500).json({msg:'Server error'})
 }

}










const approveorder = async (req, res) => {
  try {
    const orderId = req.params.orderid;
    const order = await Order.findByIdAndUpdate(orderId, { status: 'Ongoing' }, { new: true });
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


const cancelorder = async (req, res) => {
  try {
    const orderId = req.params.orderid;
    const order = await Order.findByIdAndUpdate(orderId, { status: 'Cancel' }, { new: true });
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};





const completedorder = async (req, res) => {
  try {
    const orderId = req.params.orderid;
    const serviceDescription = req.body.serviceDescription;
    const order = await Order.findByIdAndUpdate(orderId, { status: 'Completed', servicedescription: serviceDescription }, { new: true });
    res.json( order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};






module.exports = { getorder, orderhistory, getprofile, approveorder, cancelorder, completedorder };
