const DeliveryDetails = require('../models/deliveryDetails')

export async function addAddress(req, res){
    let data = req.body;
    console.log(data, "hello");
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
}

export async function getAddresses(req, res){
    const addresses = await DeliveryDetails.find({CID : req.query.CID}).sort({createdAt: -1})
    res.status(200).json(addresses)
}

export async function updateAddress(req, res){
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
}



export async function deleteOneAddress(req, res){
    console.log(req.query.CID + ">>>>" + req.query.AID)
    const address = await DeliveryDetails.updateOne(
        { CID: req.query.CID },
        { $pull: { Addresses: { _id: req.query.AID } } }
    );
    if (!address) {
        return res.status(404).json({ error: 'no post' });
    }
    return res.status(200).json(address);
}


export async function deleteAddresses(req, res){
    const address = await DeliveryDetails.findOneAndDelete({CID : req.body.CID})
    if(!address){
        return res.status(404).json({error:'no post'})
    }
    return res.status(200).json(address)
}