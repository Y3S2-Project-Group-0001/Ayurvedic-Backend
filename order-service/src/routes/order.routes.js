import express from 'express'
import { addNewCart, getCustomerCart } from '../controller/cart'

const orderRouter = express.Router()

orderRouter.post('/addCart', addNewCart)
orderRouter.post('/getCustomerCart', getCustomerCart)
// orderRouter.post('/editUser', editUser)
// orderRouter.post('/getOneUser', getOneUser)
// orderRouter.post('/delete', deleteUser)

export default orderRouter
