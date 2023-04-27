import express, { Request, response, Response } from 'express'
let Cart = require('../models/cart')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

export function addNewCart(req, res) {
  console.log(req.body)
  const products = req.body.products || []
  const subTotal = Number(req.body.subTotal) || 0
  const shippingCost = req.body.shippingCost || 0
  const customerId = req.body.customerId

  const newCart = new Cart({
    products,
    subTotal,
    shippingCost,
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
      // addNewCart(req,res) TODO need to do this when there is no customer cart
    })
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

export function updateCart(req, res) {
  const products = req.body.products
  const subTotal = Number(req.body.subTotal)
  const shippingCost = req.body.shippingCost
  console.log(products)
  // update cart
  Cart.findOneAndUpdate({ _id: req.body.cartId }, { products, subTotal, shippingCost })
    .then(() => {
      res.json('cart updated')
    })
    .catch((err) => {
      console.log(err)
    })
}

export function cleanCart(customerId) {
  const products = []
  const subTotal = 0
  const shippingCost = 0
  Cart.findOneAndUpdate({ customerId }, { products, subTotal, shippingCost })
    .then(() => {
      return true
    })
    .catch((err) => {
      console.log('failed cleaning cart ', err)
      return false
    })
}
