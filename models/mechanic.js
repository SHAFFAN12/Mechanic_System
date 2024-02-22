const mongoose = require('mongoose')

const mechanicSchema = mongoose.Schema({
    CNIC: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{13}$/.test(v);
            },
            message: props => `${props.value} is not a valid CNIC Number!`
        }
    },
    utilityImage: {
        type: String, // Assuming you will store the URL of the image in Cloudinary
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        // Example of custom validation for Pakistani phone number format
        validate: {
            validator: function(v) {
                return /^\d{11}$/.test(v);
            },
            message: props => `${props.value} is not a valid Pakistani phone number!`
        }
    },
    location: {
        type: String,
        enum: ['Karachi South', 'Karachi East', 'Karachi West', 'Karachi Central', 'Karachi North', 'Korangi'],
        required: true
    },
    
    service:{
        type: String,
        required:true
    },
    verification: {
        type: Boolean,
        default: false
    },
    serviceVerification: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Mechanic', mechanicSchema)
