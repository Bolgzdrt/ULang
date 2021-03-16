const User = require('../models/User')
const Set = require('../models/Set')
const { capitalizeWord, filterFalseyValues } = require('../utils/utils')
const bcrypt = require('bcrypt')

const followUser = async (req, res) => {
  // The id of the person to follow
  const { userId, followUserId } = req.body

  try {
    await User.findByIdAndUpdate(
      userId,
      { $push: { following: followUserId } },
      { new: true }
    )
    res.status(200).json({
      success: true
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const unfollowUser = async (req, res) => {
  const { userId, unfollowUserId } = req.body

  try {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { following : unfollowUserId } },
      { new: true }
    )
    res.status(200).json({
      success: true,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

/**
 * Get a list of followed user ids
 */
const getFollowingList = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    res.status(200).json({
      success: true,
      following: user.following,
      user
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: 'Error getting followed users'
    })
  }
}

// Get followed user information
const getFolledUserInfo = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    const followedUsers = await User.find({ _id: { $in: user.following }, })
    res.status(200).json({
      success: true,
      following: followedUsers
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: 'Error getting followed users'
    })
  }
}

const getUserInfo = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      createdDate: user.createdAt,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: 'Error getting user info'
    })
  }
}

const getUserLanguages = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    res.status(200).json({
      success: true,
      languages: user.languagesStudying,
      primaryLanguage: user.primaryLanguage
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const addLanguagesToUser = async (req, res) => {
  console.log('addLanguagesToUser')
  const { id } = req.params
  // Send this as "french," "spanish," etc.
  const { languagesToAdd } = req.body

  try {
    languagesToAdd.forEach(async (language) => {
      // Create a new dictionary and add it to the user's set list
      const newSet = await Set.create({
        name: `${capitalizeWord(language)} dictionary`,
        language: language,
        ownerId: id
      })

      User.findByIdAndUpdate(
        id,
        {
          $push: {
            languagesStudying: language,
            sets: newSet._id
          }
        },
        { useFindAndModify: false }
      ).exec()

      res.status(200).json({
        success: true,
        message: `New Language${languagesToAdd.length > 1 ? 's' : ''} added.`
      })
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const updateUserInfo = async (req, res) => {
  const { id } = req.params
  const inputs = ({ email, password, firstName, lastName } = req.body)
  const updates = filterFalseyValues(inputs)
  try {
    // const updates = filterFalseyValues(inputs)
    const user = await User.findByIdAndUpdate(id, updates, { new: true })
    res.status(200).json({
      success: true,
      user
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const changeEmail = async (req, res) => {
  const { id } = req.params
  const { email, password } = req.body
  try {
    const user = await User.findById(id)
    const success = await bcrypt.compare(password, user.password)
    if (success) {
      const updatedUser = await User.findByIdAndUpdate(id, { email }, { new: true })
      res.status(200).json({
        success: true,
        user: updatedUser
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Password incorrect'
      })
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const changePassword = async (req, res) => {
  const { id } = req.params
  const { oldPassword, newPassword } = req.body
  try {
    const user = await User.findById(id)
    const success = await bcrypt.compare(oldPassword, user.password)
    if (success) {
      const salt = await bcrypt.genSalt()
      const password = await bcrypt.hash(newPassword, salt)
      await User.findByIdAndUpdate(id, { password }, { new: true })
      res.status(200).json({
        success: true,
        message: 'Password Successfully Updated'
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Password incorrect'
      })
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const deleteAccount = async (req, res) => {
  const { id } = req.params
  const { password } = req.body
  try {
    const user = await User.findById(id)
    const success = await bcrypt.compare(password, user.password)
    if (success) {
      await User.findByIdAndDelete(id)
      res.status(200).json({
        success: true,
        message: 'Account Successfully Deleted'
      })
    } else {
      res.status(200).json({
        success: false,
        message: 'Password incorrect'
      })
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const searchNames = async (req, res) => {
  const { query } = req.params
  try {
    const users = await User.find(
      { 
        $or: [
          {firstName: { '$regex': query, '$options': 'i' }},
          {lastName: { '$regex': query, '$options': 'i' }},
          {username: { '$regex': query, '$options': 'i' }},
        ]
      }
    )
    // Return only the first 20 results
    const maxResults = 20
    res.status(200).json({
      success: true,
      users: users.slice(0, maxResults)
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const getQuickSets = async (req, res) => {
  const { id, language } = req.params

  try {
    const user = await User.findById(id)
    const quickAccessOfUser = user.quickAccess
    const sets = await Set.find({ _id: { $in: quickAccessOfUser }, language: language })
    res.status(200).json({
      sets
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: 'Error getting user quick access sets'
    })
  }
}

module.exports = {
  followUser,
  unfollowUser,
  getFollowingList,
  getFolledUserInfo,
  getUserInfo,
  getUserLanguages,
  addLanguagesToUser,
  updateUserInfo,
  changeEmail,
  changePassword,
  deleteAccount,
  searchNames,
  getQuickSets
}
