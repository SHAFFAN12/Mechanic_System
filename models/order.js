const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    mechanicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mechanic',
        required: true
    },
    Date: {
        type: Date,
        default: Date.now,
        required: true
    },
    Service: {
        type: String,
        required: true
    },
    Servicedescription: {
        type: String,
        // required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Completed', 'Ongoing', 'Cancel','waiting'],
        default:'waiting',
        // required: true
    },
    Location: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);
