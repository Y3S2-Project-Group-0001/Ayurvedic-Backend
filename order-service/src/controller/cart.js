import express, { Request, response, Response } from 'express'
let Cart = require('../models/cart')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

export function addNewCart(req, res) {
  console.log(req.body)
  const products = req.body.products
  const subTotal = Number(req.body.subTotal)
  const shippingCost = req.body.shippingCost
  const status = req.body.status
  const customerId = req.body.customerId

  const newCart = new Cart({
    products,
    subTotal,
    shippingCost,
    status,
    customerId,
  })

  console.log(newCart)

  newCart
    .save()
    .then(() => {
      res.json('product added')
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

export function getCustomerCart(req, res) {
  Cart.find({ customerId: req.body.customerId })
    .then((cart) => {
      res.json(cart)
    })
    .catch((err) => {
      console.log(err)
    })
}
