const mongoose = require('mongoose')

// const userSchema = mongoose.Schema({
//     userName: {
//         type: String,
//         required: true
//     },
//     phoneNumber: {
//         type: String,
//         required: true,
//         // Example of custom validation for Pakistani phone number format
//         validate: {
//             validator: function(v) {
//                 return /^\d{11}$/.test(v);
//             },
//             message: props => `${props.value} is not a valid Pakistani phone number!`
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },

    
// })

// module.exports = mongoose.model('User', userSchema)












const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{11}$/.test(v);
            },
            message: props => `${props.value} is not a valid Pakistani phone number!`
        }
    },

    avatar:{
        type: String, //cloudinary url,
        required: true,
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
    location: {
        type: String,
        // required: true
    },
    neededService: {
        type: String,
        // required: true
    }
})
 module.exports = mongoose.model('User', userSchema)
