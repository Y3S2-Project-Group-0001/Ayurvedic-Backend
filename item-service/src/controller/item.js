import express, { Request, response, Response } from 'express'
let Item1 = require('../models/item')
//import {Item} from  '../models/item';

export function addItem(req, res) {
  const itemName = req.body.itemName
  const description = req.body.description
  const category = req.body.category
  const price = Number(req.body.price)
  //const stockAmount = Number(req.body.stockAmount)
  //const rating = Number(req.body.rating)

  const newItem = new Item1({
    itemName,
    description,
    category,
    price,
    //stockAmount,
    //rating
  })

  newItem
    .save()
    .then(() => {
      res.json('Item added')
      // res.status(200).send({status: "item inserted"})
    })
    .catch((err) => {
      console.log(err)
      // res.status(500).send({status: "Error with inserting data", err})
    })
}

export function getAllItems(req, res) {
  Item1.find()
    .then((items) => {
      res.json(items)
      //res.status(200).send({status: "item updated", items})
    })
    .catch((err) => {
      console.log(err)
      //res.status(500).send({status: "Error with fetching data", err})
    })
  //res.json("send");
}

// export function updateItem(req,res) {
//     const id = req.body.id;
//     const newItemName = req.body.itemName
//     const newDescription = req.body.description
//     const newCategory = req.body.category
//     const newPrice = Number(req.body.price)
//     const newStockAmount = Number(req.body.stockAmount)
//     const newRating = Number(req.body.rating)

//     try{
//         Item1.findOne(id, (error, updateItem) => {
//             updateItem.itemName = newItemName;
//             updateItem.description = newDescription;
//             updateItem.category = newCategory;
//             updateItem.price = newPrice;
//             updateItem.stockAmount = newStockAmount;
//             updateItem.rating = newRating;
//             updateItem.save();
//         });
//     }catch(err){
//         console.log(err.message);
//         res.status(500).send({status: "Error with updating data", err})
//     }
// }

export function updateItem(req, res, next) {
  Item1.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        //return next(error)
        console.log("item not found")
      } else {
        res.json(data)
        console.log('Item updated successfully !')
      }
    },
  )
}

export function deleteItem(req, res) {
  let itemId = req.params.id

  Item1.findOneAndDelete(itemId)
    .then(() => {
      res.status(200).send({ status: 'Item deleted' })
    })
    .catch((err) => {
      console.log(err.message)
      //res.status(500).send({status: "Error with deleting data", err})
    })
}

//filter data by id
export function getOneItem(req, res) {
  let itemId = req.params.id

  const item = Item1.findById(itemId)
    .then((item) => {
      res.status(200).send({ status: 'item fetched', item })
    })
    .catch(() => {
      console.log(err.message)
      res.status(500).send({ status: 'Error with data fetching', error })
    })
}
