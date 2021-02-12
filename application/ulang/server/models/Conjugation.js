const mongoose = require('mongoose')

const conjugationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    tl: {
      type: String
    },
    ml: {
      type: String
    },
    bl: {
      type: String
    },
    tr: {
      type: String
    },
    mr: {
      type: String
    },
    br: {
      type: String
    }
  },
  {
    collection: 'conjugation',
    timestamps: true
  }
)

module.exports = mongoose.model('conjugation', conjugationSchema)
