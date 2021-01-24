const mongoose = require('mongoose')
const Word = require('./Word').wordSchema

const setSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set must have a name']
    },
    language: {
      type: String,
      required: true
    },
    words: {
      type: [Word] // TODO: Type will be list of Words
    },
    favorite: {
      type: Boolean,
      required: true,
      default: false
    },
    description: {
      type: String
    }
  },
  {
    collection: 'set',
    timestamps: true
  }
)

module.exports = {
  Set: mongoose.model('set', setSchema),
  setSchema
}
