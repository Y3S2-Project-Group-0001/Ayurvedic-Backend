const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema({
    CID:{
        type: String,
        required: false
    },
    PaymentDetails: [{
        Type:{
            type: String,
            required: false
        },
        CardNumber:{
            type: String,
            required: false
        },
        CardHolderName:{
            type: String,
            required: false
        },
        Expire:{
            type: String,
            required: false
        },
        CVC:{
            type: String,
            required: false
        },
        Email: {
            type: String,
            required: false
        },
    }],
}, {timestamps : true})

module.exports = mongoose.model('PaymentDetails', paymentSchema)


