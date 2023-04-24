import mongoose from 'mongoose'
//import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const ItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    stockAmount: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

// ItemSchema.plugin(aggregatePaginate)

// ItemSchema.index({ createdAt: 1 })

// const Item = mongoose.model('Item', ItemSchema)

// Item.syncIndexes()

// export default Item

const Item = mongoose.model('Item', ItemSchema)

//export default Item

module.exports = Item
