import express from 'express'
import itemRouter from './item.routes'
import itemRatingRouter from './itemRating.routes'

const router = express.Router()
router.use('/item', itemRouter)
router.use('/itemRating', itemRatingRouter)

export default router
