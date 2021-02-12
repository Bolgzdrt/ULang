const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    english: {
      type: String,
      required: true
    },
    // Noun, Verb, Adjective, etc.
    partOfSpeech: {
      type: String,
      required: true
    },
    notes: {
      type: String
    },
    definition: {
      type: String
    },
    conjugationIds: {
      type: [String]
    },
    ownerId: {
      type: String,
      required: true
    }
  },
  {
    collection: 'word',
    timestamps: true
  }
)

module.exports = mongoose.model('word', wordSchema)
