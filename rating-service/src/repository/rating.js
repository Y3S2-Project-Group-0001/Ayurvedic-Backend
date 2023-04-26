import Review from '../models/rating'

export const addOneReview = async (reviewContent) => {
  const review = await new Review(reviewContent).save()
  if (!review) return null
  console.log('repository', review)
  return review
}

export const deleteOneReview = async (reviewId) => {
  console.log('repository', reviewId.reviewId)
  const review = await Review.deleteOne({ _id: reviewId.reviewId })
  if (!review) return null
  console.log('repository', review)
  return review
}

export const updateReviewRepository = async (filters, data) => {
  const review = await Review.updateOne(filters, data)
  if (!review) return null
  console.log('repository', review)
  return review
}

export const getMyReviewsRepository = async ({ email }) => {
  const reviews = await Review.find({ user_email: email }).sort({ created_at: -1 })
  if (!reviews) return null
  console.log('repository', reviews)
  return reviews
}

export const getAllReviewsRepository = async () => {
  const reviews = await Review.find().sort({ created_at: -1 })
  if (!reviews) return null
  console.log('repository', reviews)
  return reviews
}

export const getReviewRepository = async ({ reviewId }) => {
  const review = await Review.findOne({ _id: reviewId })
  if (!review) return null
  console.log('repository', review)
  return review
}
