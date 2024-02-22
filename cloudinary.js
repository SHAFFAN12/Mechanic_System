const cloudinary = require('cloudinary').v2;
// import fs from 'fs'
const fs = require("fs")


cloudinary.config({ 
    cloud_name: process.env.Cloudinary_Cloud_Name, 
    api_key: process.env.Cloudinary_Api_Key, 
    api_secret: process.env.Cloudinary_Api_Secret 
  });

  const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null;
            //upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath, {
              resource_type: "auto"
            })
            // file has been uploaded successfully
            console.log("File has been uploaded on cloudinary",response.url);
            return response;
        
    } catch(error){
        fs.unlinkSync(localFilePath) // remove the saved locally temporary file as the upload operation got faield
        return null;
    }
  }

  module.exports={uploadOnCloudinary}