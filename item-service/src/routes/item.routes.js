import express from 'express'
import { addItem, getAllItems, updateItem, deleteItem, getOneItem } from '../controller/item'

const itemRouter = express.Router()

itemRouter.post('/addItem', addItem)
itemRouter.post('/getAllItems', getAllItems)
itemRouter.post('/updateItem/:id', updateItem)
itemRouter.post('/deleteItem/:id', deleteItem)
itemRouter.post('/getOneItem/:id', getOneItem)

export default itemRouter
