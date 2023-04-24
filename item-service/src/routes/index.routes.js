import express from 'express'
import itemRouter from './item.routes'

const router = express.Router()
router.use('/item', itemRouter)

export default router

// import express from 'express'
// import ratingRouter from './rating.routes'
// const router = express.Router()

// router.use('/rating', ratingRouter)

// export default router
