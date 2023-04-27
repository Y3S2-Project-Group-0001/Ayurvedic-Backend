import express, { Request, response, Response } from 'express'
let Payment = require('../models/payment')
const PaymentDetails = require('../models/payment')
const stripe = require("stripe")("sk_test_51N1AX3FnH26RCzINKGIWEDesfNcK9tT5YXjeRrc2saEgn36kkdtwrFzCUWqa1oR4oCH5kMjYoJZTSpCZqNrQWvIk00DypxsO7A")

export async function stripePay(req, res){
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
}

export async function addPayment(req, res){
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
}

export async function deleteOnePayment(req, res){
    const payment = await PaymentDetails.updateOne(
        { CID: req.query.CID },
        { $pull: { PaymentDetails: { _id: req.query.paymentID } } }
    );
    if(!payment){
        return res.status(404).json({error:'no post'})
    }
        return res.status(200).json(payment)
}

export async function getPaymanetOptions(req, res){
    const paymentOptions = await PaymentDetails.find({CID : req.query.CID , Type : req.query.Type}).sort({createdAt: -1})
    res.status(200).json(paymentOptions)
}


export async function updatePayment(req, res){
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
}


export async function deletePayments(req, res){
    const payment = await PaymentDetails.findOneAndDelete({CID : req.body.CID})
    if(!payment){
        return res.status(404).json({error:'no post'})
    }
    return res.status(200).json(payment)
}