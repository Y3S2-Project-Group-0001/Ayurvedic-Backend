import express, { Request, response, Response } from 'express'
import { cleanCart } from './cart'
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
  const address = req.body.address
  const customerId = req.body.customerId

  const newOrder = new Order({
    products,
    subTotal,
    shippingCost,
    orderDate,
    status,
    address,
    customerId,
  })

  newOrder
    .save()
    .then(() => {
      cleanCart(customerId)
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

export function getAdminOrders(req, res) {
  // find orders by customerId and sort by orderDate
  Order.find()
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

export function getOrder(req, res) {
  // find orders by customerId and sort by orderDate
  Order.findById(req.body.orderId)
    .then((order) => {
      res.json(order)
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
