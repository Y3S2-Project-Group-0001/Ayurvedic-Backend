import Review from '../models/itemRating'

//add One Review
export const addOneReview = async (reviewContent) => {
  const review = await new Review(reviewContent).save()
  if (!review) return null
  console.log('repository', review)
  return review
}
//delete One Review
export const deleteOneReview = async (reviewId) => {
  console.log('repository', reviewId.reviewId)
  const review = await Review.deleteOne({ _id: reviewId.reviewId })
  if (!review) return null
  console.log('repository', review)
  return review
}
//update Review
export const updateReviewRepository = async (filters, data) => {
  const review = await Review.updateOne(filters, data)
  if (!review) return null
  console.log('repository', review)
  return review
}
//get my reviews
export const getMyReviewsRepository = async ({ email }) => {
  const reviews = await Review.find({ user_email: email }).sort({ created_at: -1 })
  if (!reviews) return null
  console.log('repository', reviews)
  return reviews
}
//get all reviews
export const getAllReviewsRepository = async () => {
  const reviews = await Review.find().sort({ created_at: -1 })
  if (!reviews) return null
  console.log('repository', reviews)
  return reviews
}
//get review
export const getReviewRepository = async ({ reviewId }) => {
  const review = await Review.findOne({ _id: reviewId })
  if (!review) return null
  console.log('repository', review)
  return review
}

// export const getAnswersRepository = async (question_id) => {
//   console.log('question_id', question_id)
//   const answers = await Answer.find({question_id: question_id}).sort({created_at: -1})
//   if(!answers) return null
//   console.log('repository', answers)
//   return answers
// }
