import express from 'express'
const router = express.Router()
import { stripePay, addPayment, deleteOnePayment, getPaymanetOptions, updatePayment, deletePayments } from '../controller/Payment'

// Add a payment option
router.post("/addPayment", addPayment)

//using strip to pay
router.post("/stripePay", stripePay)

// Delete one payment option
router.delete("/deleteOnePayment", deleteOnePayment)

// get all payment options
router.get("/getPaymanetOptions", getPaymanetOptions)

// Update single address
router.put("/updatePayment", updatePayment)

// Delete all addressses of a customer
router.delete("/deletePayments", deletePayments) 

export default router