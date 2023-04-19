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
        modelDelivery.Addresses.push({
            HouseNo: data.Addresses.HouseNo,
            Address:  data.Addresses.Address,
            city:  data.Addresses.city,
            street:  data.Addresses.street
        });
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
//         "HouseNo": "1op234",
//         "Address": "123 Maind St",
//         "city": "Anywwtown",
//         "street": "Main"
//     }
// }


export default router
