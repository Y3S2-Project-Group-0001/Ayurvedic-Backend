import express from 'express'
import { addNewCart, getCustomerCart, updateCart } from '../controller/cart'
import {
  addNewOrder,
  getCustomerOrders,
  getAdminOrders,
  getOrder,
  approveOrder,
  declineOrder,
} from '../controller/order'

const orderRouter = express.Router()

orderRouter.post('/addCart', addNewCart)
orderRouter.post('/getCustomerCart', getCustomerCart)
orderRouter.post('/addNewOrder', addNewOrder)
orderRouter.post('/getCustomerOrders', getCustomerOrders)
orderRouter.post('/getAdminOrders', getAdminOrders)
orderRouter.post('/getOrder', getOrder)
orderRouter.post('/approveOrder', approveOrder)
orderRouter.post('/declineOrder', declineOrder)
orderRouter.post('/updateCart', updateCart)
// orderRouter.post('/editUser', editUser)
// orderRouter.post('/getOneUser', getOneUser)
// orderRouter.post('/delete', deleteUser)

export default orderRouter
