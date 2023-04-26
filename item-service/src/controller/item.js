import express, { Request, response, Response } from 'express'
let Item1 = require('../models/item')

//add items
export function addItem(req, res) {
  const itemName = req.body.itemName
  const description = req.body.description
  const category = req.body.category
  const price = Number(req.body.price)
  const stockAmount = Number(req.body.stockAmount)
  const image = req.body.image
  //const rating = Number(req.body.rating)

  const newItem = new Item1({
    itemName,
    description,
    category,
    price,
    stockAmount,
    image,
    //rating
  })

  newItem
    .save()
    .then(() => {
      res.json('Item added')
    })
    .catch((err) => {
      console.log(err)
    })
}

/*
    fetch all products
*/
export function getAllItems(req, res) {
  Item1.find()
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
    })
}

/*
  update the product by id
*/
export function updateItem(req, res, next) {
  Item1.findByIdAndUpdate(
    req.params._id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        //return next(error)
        console.log('item not found')
      } else {
        res.json(data)
        console.log('Item updated successfully !')
      }
    },
  )
}

//delete the product
export function deleteItem(req, res) {
  let _id = req.params._id

  Item1.findOneAndDelete(_id)
    .then(() => {
      res.json('deleted')
    })
    .catch((err) => {
      console.log(err.message)
      //res.status(500).send({status: "Error with deleting data", err})
    })
}

//filter data by id
export function getOneItem(req, res) {
  let _id = req.params._id

  Item1.findById(_id)
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      console.log(err.message)
    })
}

//filter data by category
export function getItemsByCategory(req, res) {
  let category = req.params.category

  Item1.find(category)
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      console.log(err.message)
    })
}
