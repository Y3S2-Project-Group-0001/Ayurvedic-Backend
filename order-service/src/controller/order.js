import express, { Request, response, Response } from 'express'
let Order = require('../models/order')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

export function addNewOrder(req, res) {
  console.log(req.body)
  const products = req.body.products
  const subTotal = Number(req.body.subTotal)
  const shippingCost = req.body.shippingCost
  const orderDate = req.body.orderDate
  const status = req.body.status
  const customerId = req.body.customerId

  const newOrder = new Order({
    products,
    subTotal,
    shippingCost,
    orderDate,
    status,
    customerId,
  })

  console.log(newOrder)

  newOrder
    .save()
    .then(() => {
      res.json('order added')
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

export function getCustomerOrders(req, res) {
  // find orders by customerId and sort by orderDate
  Order.find({ customerId: req.body.customerId })
    .sort({ orderDate: -1 })
    .then((cart) => {
      res.json(cart)
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

export function approveOrder(req, res) {
  // change order status to approved
  Order.findOneAndUpdate({ _id: req.body.orderId }, { status: 'approved' })
    .then(() => {
      res.json('order approved')
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

export function declineOrder(req, res) {
  // change order status to approved
  Order.findOneAndUpdate({ _id: req.body.orderId }, { status: 'declined' })
    .then(() => {
      res.json('order declined')
    })
    .catch((err) => {
      console.log(err)
    })
}
