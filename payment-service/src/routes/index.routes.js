import express from 'express'
const PaymentDetails = require('../models/payment')
const router = express.Router()
// const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const stripe = require("stripe")("sk_test_51N1AX3FnH26RCzINKGIWEDesfNcK9tT5YXjeRrc2saEgn36kkdtwrFzCUWqa1oR4oCH5kMjYoJZTSpCZqNrQWvIk00DypxsO7A")


// Add a payment option
router.post("/addPayment", async (req, res) => {
    let data = req.body;
    try{
        const modelPayment = await PaymentDetails.findOne({ CID: data.CID })
    
        // Adding completely new payment
        if (!modelPayment){
            const newModel = new PaymentDetails(data);
            await newModel.save();
        }
        // Adding another payment
        if (modelPayment) {
            modelPayment.PaymentDetails.push(data.PaymentDetails)
            await modelPayment.save();
        } else {
        console.log('Document not found');
        }
        res.status(200).send("Payment added successfully");
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal server error");
    }
})

// Delete one payment option
router.delete("/deleteOnePayment", async (req, res) => {
    const payment = await PaymentDetails.updateOne(
        { CID: req.query.CID },
        { $pull: { PaymentDetails: { _id: req.query.paymentID } } }
    );
    if(!payment){
        return res.status(404).json({error:'no post'})
    }
        return res.status(200).json(payment)
})



// get all payment options
router.get("/getPaymanetOptions", async (req, res) => {
    const paymentOptions = await PaymentDetails.find({CID : req.query.CID , Type : req.query.Type}).sort({createdAt: -1})
    res.status(200).json(paymentOptions)
})

//Stripe
router.post("/stripePay", async (req, res) => {
   let {amount, id} = req.body
   try {
    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "CEYLONHERB",
        payment_method: id,
        confirm: true
    })
    console.log("Payment", payment)
    res.json({
        message:"Payment successful",
        success: true
    })

   } catch (error) {
    console.log("Error", error)
    res.json({
        message:"Payment unsuccessful",
        success: false
    })
   }
    res.status(200)
})


// Update single address
router.put("/updatePayment", async (req, res) => {
    try {
      const payment = await PaymentDetails.findOneAndUpdate(
        { CID : req.body.CID, "Payments._id": req.body.Payments._id },
        { $set: { "Payments.$": req.body.Payments } },
        { new: true }
      );
  
      if (!payment) {
        return res.status(404).json({ error: "No data found" });
      }
  
      return res.status(200).json(payment);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });




// Delete all addressses of a customer
router.delete("/deletePayments", async (req, res) => {
    const payment = await PaymentDetails.findOneAndDelete({CID : req.body.CID})
    if(!payment){
        return res.status(404).json({error:'no post'})
    }
    return res.status(200).json(payment)
})


export default router

// NOTE -> THESE ENDPOINTS NEEDS TO BE TESTED. THESE ARE NOT YET TESTED.