import express from 'express'
import { addNewCart, getCustomerCart } from '../controller/cart'
import { addNewOrder, getCustomerOrders, approveOrder, declineOrder } from '../controller/order'

const orderRouter = express.Router()

orderRouter.post('/addCart', addNewCart)
orderRouter.post('/getCustomerCart', getCustomerCart)
orderRouter.post('/addNewOrder', addNewOrder)
orderRouter.post('/getCustomerOrders', getCustomerOrders)
orderRouter.post('/approveOrder', approveOrder)
orderRouter.post('/declineOrder', declineOrder)
// orderRouter.post('/editUser', editUser)
// orderRouter.post('/getOneUser', getOneUser)
// orderRouter.post('/delete', deleteUser)

export default orderRouter
