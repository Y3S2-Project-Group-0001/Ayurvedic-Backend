const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deliveryDetailsSchema = new Schema({
    CID:{
        type: String,
        required: false
    },
    Addresses: [{
        Title:{
            type: String,
            required: false
        },
        HouseNo:{
            type: String,
            required: false
        },
        Address:{
            type: String,
            required: false
        },
        city:{
            type: String,
            required: false
        },
        street:{
            type: String,
            required: false
        },
    }],
}, {timestamps : true})

module.exports = mongoose.model('DeliveryDetails', deliveryDetailsSchema)