const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    adminName: {
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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    
})

module.exports = mongoose.model('Admin', adminSchema)
