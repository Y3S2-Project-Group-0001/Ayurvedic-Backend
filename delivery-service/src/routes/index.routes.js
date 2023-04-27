import express from 'express'
import mongoose from 'mongoose';
const router = express.Router()
import { addAddress, getAddresses, updateAddress, deleteOneAddress, deleteAddresses } from '../controller/Delivery';

// Add new Address or add new to already existing array
router.post("/addAddress", addAddress)


// Get all addresses 
router.get("/getAddresses", getAddresses)


// Update single address
router.put("/updateAddress", updateAddress) 

// Delete one Address
router.delete("/deleteOneAddress", deleteOneAddress)


// Delete all addressses of a customer
router.delete("/deleteAddresses", deleteAddresses)

export default router

