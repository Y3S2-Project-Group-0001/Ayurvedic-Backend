import mongoose from 'mongoose'

const Schema = mongoose.Schema

const cartProductSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
})

const cartSchema = new Schema({
  products: [cartProductSchema],
  subTotal: { type: Number, required: true, default: 0 },
  shippingCost: { type: Number, required: true, default: 0 },
  status: { type: String, required: true, default: 'cart' },
  customerId: {
    type: Number,
    required: true,
  },
})
const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
