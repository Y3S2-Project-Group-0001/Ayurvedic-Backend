import {
  addOneReview,
  deleteOneReview,
  updateReviewRepository,
  getMyReviewsRepository,
  getAllReviewsRepository,
  getReviewRepository,
} from '../repository/itemRating'

//Add Review
export const addReview = async (reviewContent) => {
  const review = await addOneReview(reviewContent)
  if (!review) return false
  console.log('service', review)
  return review
}
//Delete Review
export const deleteReview = async (reviewId) => {
  console.log('service', reviewId)
  const review = await deleteOneReview(reviewId)
  if (!review) return false
  console.log('service', review)
  return review
}
//Update Review
export const updateReviewService = async (reviewContent) => {
  console.log('reviewContent is this: ', reviewContent)
  const review = await updateReviewRepository({ _id: reviewContent._id }, reviewContent)
  if (!review) return false
  console.log('service', review)
  return review
}
//Get my Reviews
export const getMyReviewsService = async ({ email }) => {
  console.log('userid', email)
  const reviews = await getMyReviewsRepository({ email })
  if (!reviews) return false
  console.log('service', reviews)
  return reviews
}
//Get all Reviews
export const getAllReviewsService = async () => {
  const reviews = await getAllReviewsRepository()
  if (!reviews) return false
  console.log('service', reviews)
  return reviews
}
//Get Review
export const getReviewService = async (reviewId) => {
  const review = await getReviewRepository(reviewId)
  if (!review) return false
  console.log('service', review)
  return review
}
