import express from 'express'
const DeliveryDetails = require('../models/deliveryDetails')
const router = express.Router()


router.get('/my', async(req, res) =>{
    const post = "TEST WORK"
    res.status(200).json(post)
});

// Add review
// router.post("/addReview", customerAuthRequired, async (req, res) => {
//     try {
//       let data = req.body;
//       data.customerID = req.session.customer_id;
//       let customer = await Customer.findById(data.customerID, {
//         f_name: 1,
//         l_name: 1,
//       });
//       data.fname = customer.f_name;
//       data.lname = customer.l_name;
//       const newTest = new Review(data);
//       await newTest.save();
//     } catch (e) {
//       res.status(500).json({ status: "error", message: "something went wrong" });
//     }
//     res.status(200).json({ status: "ok" });
//   });

export default router
