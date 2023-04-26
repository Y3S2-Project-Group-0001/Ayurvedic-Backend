import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
})

const orderSchema = new Schema({
  products: [productSchema],
  subTotal: { type: Number, required: true, default: 0 },
  shippingCost: { type: Number, required: true, default: 0 },
  orderDate: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true, default: 'pending' },
  address: { type: String, required: true },
  customerId: {
    type: String,
    required: true,
  },
})
const Order = mongoose.model('Order', orderSchema)

module.exports = Order
