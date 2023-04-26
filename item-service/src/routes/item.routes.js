import express from 'express'
import {
  addItem,
  getAllItems,
  updateItem,
  deleteItem,
  getOneItem,
  getItemsByCategory,
} from '../controller/item'

const itemRouter = express.Router()

itemRouter.post('/addItem', addItem)
itemRouter.post('/getAllItems', getAllItems)
itemRouter.post('/updateItem/:_id', updateItem)
itemRouter.post('/deleteItem/:_id', deleteItem)
itemRouter.post('/getOneItem/:_id', getOneItem)
//itemRouter.post('/getItemsByCategory/:category', getItemsByCategory)

export default itemRouter
