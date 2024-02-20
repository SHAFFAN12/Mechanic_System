const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult}=require('express-validator');
const User =require('../models/user');
const Admin =require('../models/admin');
const Mechanic =require('../models/mechanic');
const mechanic = require('../models/mechanic');

const userregister =async (req,res) =>{
    const result= validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors:result.array()})
    } 
    const {userName, email,password,phoneNumber}=req.body
    try{
let user = await User.findOne({email});
if(user){
    return res.status(400).json({msg:'User already exist'})
}
user= new User({
    userName,
    email,
    password,
    phoneNumber
})


const salt =await bcrypt.genSalt(10)
user.password=await bcrypt.hash(password,salt);


await user.save();

const payload={
    user:{
        id:user.id,
    }
}

jwt.sign(payload,process.env.secretkey,{expiresIn:'2hr'},(err,token)=>{
    if(err) throw err
return res.json({token}) 
})

}catch(err){
console.error(err.message)
res.status(500).json({msg:'server error'})        
}
    }
    


const userlogin=async(req,res)=>{
const result = validationResult(req)
if(!result.isEmpty()){
    return res.status(400).json({error:result.array()})
}
const {email,password}=req.body;
try{
    const user =await User.findOne({email})
if(!user){
    return res.status(400).json({msg:'User dosnot exist'})
}
const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.status(400).json({msg:'invalid password'})
}
const payload={
    user:{
        id:user.id,
    },
};
jwt.sign(payload,process.env.secretkey,{expiresIn:'2hr'},(err,token)=>{
    if (err) throw err;
    return res.json({
        token
    })
})
}catch(err){
console.error(err.message)
return res.status(500).json({msg:'server error'})
}


}

const userauth =async (req,res)=>{
try{
    const user=await User.findById(req.user.id).select('-password')
    return res.json(user);
}
catch(err){
    console.error(err.message)
    return res.status(500).json({msg:'server error'})
}

}




// mechanic
const mechanicregister =async (req,res) =>{
    const result= validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors:result.array()})
    } 
    const {CNIC,name,password,phoneNumber,location,service}=req.body
    try{
let mechanic = await Mechanic.findOne({phoneNumber});
if(mechanic){
    return res.status(400).json({msg:'mechanic already exist'})
}
    mechanic= new Mechanic({
    CNIC,
    name,
    password,
    service,
    phoneNumber,
    location
})


const salt =await bcrypt.genSalt(10)
mechanic.password=await bcrypt.hash(password,salt);


await mechanic.save();

const payload={
    mechanic:{
        id:mechanic.id,
    }
}

jwt.sign(payload,process.env.secretkey,{expiresIn:'2hr'},(err,token)=>{
    if(err) throw err
return res.json({token}) 
})

}catch(err){
console.error(err.message)
res.status(500).json({msg:'server error'})        
}
    }
    


const mechaniclogin=async(req,res)=>{
const result = validationResult(req)
if(!result.isEmpty()){
    return res.status(400).json({error:result.array()})
}
const {phoneNumber,password}=req.body;
try{
    const mechanic =await Mechanic.findOne({phoneNumber})
if(!mechanic){
    return res.status(400).json({msg:'mechanic does not exist'})
}
const isMatch = await bcrypt.compare(password,mechanic.password);
if(!isMatch){
    return res.status(400).json({msg:'invalid password'})
}
const payload={
    mechanic:{
        id:mechanic.id,
    },
};
jwt.sign(payload,process.env.secretkey,{expiresIn:'2hr'},(err,token)=>{
    if (err) throw err;
    return res.json({
        token
    })
})
}catch(err){
console.error(err.message)
return res.status(500).json({msg:'server error'})
}


}

const mechanicauth =async (req,res)=>{
try{
    const mechanic =await Mechanic.findById(req.mechanic.id).select('-password')
    return res.json(mechanic);
}
catch(err){
    console.error(err.message)
    return res.status(500).json({msg:'server error'})
}

}


const getmechanicbyparams = async (req, res) => {
    try {
        const id = req.params.mechanicid;
        const getmechanic = await Mechanic.findById(id).select('-password');
        if (!getmechanic) {
            return res.status(404).json({ msg: 'Mechanic not found' });
        }
        res.json(getmechanic);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Server error' });
    }
};













// admin
const adminregister =async (req,res) =>{
    const result= validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors:result.array()})
    } 
    const {adminName, email,password,phoneNumber}=req.body
    try{
let admin = await Admin.findOne({email});
if(admin){
    return res.status(400).json({msg:'admin already exist'})
}
    admin = new Admin({
        adminName,
        email,
        password,
        phoneNumber
})


const salt =await bcrypt.genSalt(10)
admin.password=await bcrypt.hash(password,salt);


await admin.save();

const payload={
    admin:{
        id:admin.id,
    }
}

jwt.sign(payload,process.env.secretkey,{expiresIn:'2hr'},(err,token)=>{
    if(err) throw err
return res.json({token}) 
})

}catch(err){
console.error(err.message)
res.status(500).json({msg:'server error'})        
}
    }
    


const adminlogin=async(req,res)=>{
const result = validationResult(req)
if(!result.isEmpty()){
    return res.status(400).json({error:result.array()})
}
const {email,password}=req.body;
try{
    const admin =await Admin.findOne({email})
if(!admin){
    return res.status(400).json({msg:'admin does not exist'})
}
const isMatch = await bcrypt.compare(password,admin.password);
if(!isMatch){
    return res.status(400).json({msg:'invalid password'})
}
const payload={
    admin:{
        id:admin.id,
    },
};
jwt.sign(payload,process.env.secretkey,{expiresIn:'2hr'},(err,token)=>{
    if (err) throw err;
    return res.json({
        token
    })
})
}catch(err){
console.error(err.message)
return res.status(500).json({msg:'server error'})
}


}

const adminauth =async (req,res)=>{
try{
    const admin =await Admin.findById(req.admin.id).select('-password')
    return res.json(admin);
}
catch(err){
    console.error(err.message)
    return res.status(500).json({msg:'server error'})
}

}












module.exports={userauth,userlogin,userregister,mechanicauth,mechaniclogin,mechanicregister,adminauth,adminlogin,adminregister,getmechanicbyparams}