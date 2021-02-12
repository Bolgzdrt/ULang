const mongoose = require('mongoose')

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
      type: [String] // List of IDs of words
    },
    favorite: {
      type: Boolean,
      required: true,
      default: false
    },
    description: {
      type: String
    },
    ownerId: {
      type: String,
      required: true
    }
    // highScores: {} // ??
  },
  {
    collection: 'set',
    timestamps: true
  }
)

module.exports = mongoose.model('set', setSchema)

