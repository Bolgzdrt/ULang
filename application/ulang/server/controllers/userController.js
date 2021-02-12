const User = require('../models/User')
const Set = require('../models/Set')
const { languageCodes } = require('../utils/utils')

const followUser = async (req, res) => {
  // The id of the person to follow
  const { userId, followUserId } = req.body

  try {
    const user = await User.findById(userId)
    await User.findByIdAndUpdate(
      userId,
      {
        friendsList: [...user.friendsList, followUserId]
      },
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
    const user = await User.findById(userId)
    const newFriendsList = user.friendsList.filter(
      (friend) => friend._id !== unfollowUserId
    )
    await User.findByIdAndUpdate(
      userId,
      {
        friendsList: newFriendsList
      },
      { new: true }
    )
    res.status(200).json({
      success: true,
      message: 'Followed User'
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const getUserInfo = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    res.status(200).json({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      username: user.username
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
      languages: user.languagesStudying
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
  const { id } = req.params
  // Send this as "french," "spanish," etc.
  const { languagesToAdd } = req.body

  try {
    languagesToAdd.forEach(async (language) => {
      // Create a new dictionary and add it to the user's set list
      const newSet = await Set.create({
        name: `${language} dictionary`,
        language: languageCodes[language],
        ownerId: id
      })

      User.findByIdAndUpdate(id, {
        $push: {
          languagesStudying: languageCodes[language],
          sets: newSet._id
        }
      }).exec()

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

module.exports = {
  followUser,
  unfollowUser,
  getUserInfo,
  getUserLanguages,
  addLanguagesToUser
}
