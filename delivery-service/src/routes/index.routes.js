import express from 'express'
const DeliveryDetails = require('../models/deliveryDetails')
const router = express.Router()


router.get('/my', async(req, res) =>{
    const post = "TEST WORK"
    res.status(200).json(post)
});


// Add new Address or add new to already existing array
router.post("/addAddress", async (req, res) => {
let data = req.body;
try{
    const modelDelivery = await DeliveryDetails.findOne({ CID: data.CID })

    // Adding completely new address
    if (!modelDelivery){
        const newModel = new DeliveryDetails(data);
        await newModel.save();
    }
    // Adding another address to the same customer
    if (modelDelivery) {
        modelDelivery.Addresses.push(data.Addresses)
        await modelDelivery.save();
    } else {
    console.log('Document not found');
    }
    res.status(200).send("Address added successfully");
}
catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
}
})

//   Postman checker --
// {   "CID" : "897236ys8d9d41117",
//     "Addresses" : {
//          "Title": "home address",
//         "HouseNo": "1op234",
//         "Address": "123 Maind St",
//         "city": "Anywwtown",
//         "street": "Main"
//     }
// }


// Get all addresses 
router.get("/getAddresses", async (req, res) => {
    const addresses = await DeliveryDetails.find({CID : req.body.CID}).sort({createdAt: -1})
    res.status(200).json(addresses)
})

// Update single address
router.put("/updateAddress", async (req, res) => {
    try {
      const address = await DeliveryDetails.findOneAndUpdate(
        { CID : req.body.CID, "Addresses._id": req.body.Addresses._id },
        { $set: { "Addresses.$": req.body.Addresses } },
        { new: true }
      );
  
      if (!address) {
        return res.status(404).json({ error: "No data found" });
      }
  
      return res.status(200).json(address);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

//postman
//   {   "CID" : "897236ys8d9d41117Semora",
//     "Addresses" : {
//         "_id" : "643f9c22d9c56bec1695da43",
//          "Title": "home ME address",
//         "HouseNo": "1op234",
//         "Address": "123 Maind St",
//         "city": "Anywwtown",
//         "street": "Main"
//     }
// }

// Delete one Address
router.delete("/deleteOneAddress", async (req, res) => {
    const address = await DeliveryDetails.updateOne(
        { _id: req.body.CID },
        { $pull: { Addresses: { _id: req.body.addressID } } }
    );
    if(!address){
        return res.status(404).json({error:'no post'})
    }
        return res.status(200).json(address)
})


// Delete all addressses of a customer
router.delete("/deleteAddresses", async (req, res) => {
    const address = await DeliveryDetails.findOneAndDelete({CID : req.body.CID})
    if(!address){
        return res.status(404).json({error:'no post'})
    }
    return res.status(200).json(address)
})

// postman. use for both delete apis
// {
//     "CID" : "643f9abe3ac372fe5f4b08b4",
//     "addressID" : "643f9ac23ac372fe5f4b08cb"
// }

export default router
