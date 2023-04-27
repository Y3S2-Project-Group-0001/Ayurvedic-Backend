import mongoose from 'mongoose'

const RatingSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },

    rating: {
      type: String,
      required: false,
    },

    userID: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    productID: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'edited_at' },
  },
)

const Rating = mongoose.model('Rating', RatingSchema)

export default Rating
