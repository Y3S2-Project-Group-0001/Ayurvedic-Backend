const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema({
    CID:{
        type: String,
        required: false
    },
    Payments: [{
        Type:{
            type: String,
            required: false
        },
        CardNumber:{
            type: String,
            required: false
        }
    }],
}, {timestamps : true})

module.exports = mongoose.model('PaymentDetails', paymentSchema)


