const Order = require('../models/order')
const User =  require('../models/user')
const Mechanic =  require('../models/mechanic')
const Feedback =  require('../models/feedback')



// const getallMechanics = async (req, res) => {
//   try {
//       const mechanics = await Mechanic.find().select('-password');
//       res.json(mechanics);
//   } catch (error) {
//       console.error(error.message);
//       res.status(500).json({ msg: 'Server error' });
//   }
// };
// const getallMechanics = async (req, res) => {
//   try {
//     const { location, neededService } = req.query;

//     // Check if location and neededService are provided
//     if (!location || !neededService) {
//       return res.status(400).json({ msg: 'Please provide both location and neededService parameters' });
//     }

//     // Query to find mechanics based on location and needed service
//     const mechanics = await Mechanic.find({
//       location: location,
//       service: neededService
//     }).select('-password');

//     // Check if mechanics are found
//     if (!mechanics || mechanics.length === 0) {
//       return res.status(404).json({ msg: 'No mechanics found matching the criteria' });
//     }

//     res.json(mechanics);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };



const getallMechanics = async (req, res) => {
  try {
    const { location, neededService } = req.query;

    // Check if location and neededService are provided
    if (!location || !neededService) {
      return res.status(400).json({ msg: 'Please provide both location and neededService parameters' });
    }

    // Assuming you have a way to verify the login status of the mechanic
    const loggedInMechanic = req.loggedInMechanic;

    // Query to find mechanics based on location and needed service
    let mechanicsQuery = {
      location: location,
      service: neededService,
      verification: true // Assuming this field indicates the verification status of the mechanic
    };

    // If a mechanic is logged in, only show that mechanic
    if (loggedInMechanic) {
      mechanicsQuery._id = loggedInMechanic._id;
    }

    const mechanics = await Mechanic.find(mechanicsQuery).select('-password');

    // Check if mechanics are found
    if (!mechanics || mechanics.length === 0) {
      return res.status(404).json({ msg: 'No mechanics found matching the criteria' });
    }

    res.json(mechanics);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};






const makeOrder = async (req, res) => {
  try {
      const userId = req.user.id;
      const order = req.body; // Assuming only one order is sent in the request body
      
      console.log('Received Request Body:', req.body);

      const { mechanicId, Service, Location, status } = order;

      const mechanic = await Mechanic.findById(mechanicId);

      if (!mechanic) {
          throw new Error(`Mechanic with ID ${mechanicId} not found`);
      }

      const newOrder = new Order({
          user: userId,
          mechanicId: mechanicId,
          Service,
          status,
          Location,
      });

      await newOrder.save();

      res.status(201).json(newOrder);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
  }
};






 const getuserprofile =async(req,res)=>{
try {
    const userId = req.user.id;
    const userprofile =await User.findById(userId).select('-password');
    if(!userprofile) throw new Error('User Not found');
    res.json(userprofile)
    

} catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
}
 }

// const updateuserprofile =()=>{

// }


 const orderhistory =async(req,res)=>{
    try {
    const userId=req.user.id;
    const orderHistory= await Order.find({user:userId}).sort({
        created_at:-1
    });

res.json(orderHistory);
 } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'Server error'})
 }

 }


 const feedback = async (req, res) => {
  try {
    const mechanicId = req.params.id;
    const feedbacks = await Feedback.find({ mechanicId: mechanicId });
    res.json({ feedbacks: feedbacks });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const submitFeedback = async (req, res) => {
  try {
    
    const {  rating, comment } = req.body;
    const mechanicId = req.params.id
const userId= req.user.id
    // Check if the mechanic exists
    const mechanic = await Mechanic.findById(mechanicId);
    if (!mechanic) {
      return res.status(404).json({ msg: 'Mechanic not found' });
    }
    
    const newFeedback = new Feedback({
      mechanicId: mechanicId,
      userId: userId,
      rating: rating,
      comment: comment
    });
    await newFeedback.save();
    res.json({ msg: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
module.exports={feedback,submitFeedback,getallMechanics,makeOrder,getuserprofile, orderhistory}

