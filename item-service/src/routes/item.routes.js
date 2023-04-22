import express from 'express'
import { addItem, getAllItems } from '../controller/item'

const itemRouter = express.Router()

itemRouter.post('/addItem', addItem)
itemRouter.post('/getAllItems', getAllItems)
// itemRouter.post('/getOneUser', getOneUser)
// itemRouter.post('/delete', deleteUser)

export default itemRouter