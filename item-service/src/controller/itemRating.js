import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import {
  addReview,
  deleteReview,
  updateReviewService,
  getMyReviewsService,
  getAllReviewsService,
  getReviewService,
} from '../services/itemRating'

//add review
export const postReview = asyncHandler(async (req, res) => {
  const result = await addReview(req.body)
  if (!result)
    return makeResponse({
      res,
      status: 400,
      message: 'Cannot add your review, please try again.',
    })
  if (result.status) return makeResponse({ res, ...result })
  console.log('controller', result)
  return makeResponse({ res, message: 'Review Added Successfully!' })
})
//remove review
export const removeReview = asyncHandler(async (req, res) => {
  console.log('req.body in remove review', req.params)
  const result = await deleteReview(req.params)
  if (!result)
    return makeResponse({
      res,
      status: 400,
      message: 'Cannot delete your review, please try again.',
    })
  if (result.status) return makeResponse({ res, ...result })
  console.log('controller', result)
  return makeResponse({ res, message: 'Review Deleted Successfully!' })
})
//update review
export const updateReview = asyncHandler(async (req, res) => {
  const result = await updateReviewService(req.body)
  if (!result)
    return makeResponse({
      res,
      status: 400,
      message: 'Cannot edit your review, please try again.',
    })
  if (result.status) return makeResponse({ res, ...result })
  console.log('controller', result)
  return makeResponse({ res, message: 'Review Edited Successfully!' })
})
//get my reviews
export const getMyReviews = asyncHandler(async (req, res) => {
  const result = await getMyReviewsService(req.params)
  if (!result)
    return makeResponse({
      res,
      status: 400,
      message: 'Cannot get your reviews, please try again.',
    })
  if (result.status) return makeResponse({ res, ...result })
  console.log('controller', result)
  return makeResponse({ res, message: 'Reviews Retrieved Successfully!' })
})
//get all reviews
export const getAllReviews = asyncHandler(async (req, res) => {
  const result = await getAllReviewsService()
  if (!result)
    return makeResponse({
      res,
      status: 400,
      message: 'Cannot get your reviews, please try again.',
    })
  if (result.status) return makeResponse({ res, ...result })
  console.log('controller', result)
  return makeResponse({ res, data: result, message: 'Reviews Retrieved Successfully!' })
})
//get review
export const getReview = asyncHandler(async (req, res) => {
  const result = await getReviewService(req.params)
  if (!result)
    return makeResponse({
      res,
      status: 400,
      message: 'Cannot get your review, please try again.',
    })
  if (result.status) return makeResponse({ res, ...result })
  console.log('controller', result)
  return makeResponse({ res, data: result, message: 'Review Retrieved Successfully!' })
})
