const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'An email is required'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'A valid email is required']
    },
    password: {
      type: String,
      required: [true, 'A password is required'],
      minlength: [6, 'Minimum password length is 6 characters']
    },
    username: {
      type: String,
      required: [true, 'A username is required'],
      unique: true
    },
    wordSetList: {
      type: [String] // List of IDs of sets
    },
    friendsList: {
      type: String // List of IDs of friends
    },
    recentList: {
      // type: [String] // TODO
    }
  },
  {
    collection: 'user',
    timestamps: true
  }
)

// fire a funciton before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// static method to login a user
userSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('Incorrect password')
  }
  throw Error(`Username "${username}" is not registered`)
}

module.exports = mongoose.model('user', userSchema)
