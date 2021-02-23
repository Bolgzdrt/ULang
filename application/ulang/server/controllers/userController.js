const User = require('../models/User')
const Set = require('../models/Set')
const { capitalizeWord } = require('../utils/utils')
const bcrypt = require('bcrypt')

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
      { new: true, useFindAndModify: false }
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
      { new: true, useFindAndModify: false }
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
    console.log(user)
    res.status(200).json({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      username: user.username,
      createdDate: user.createdAt
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
  const updates = ({ email, password, firstName, lastName } = req.body)

  try {
    // const updates = filterUpdates(inputs)
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
  } catch (error) {
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
  addLanguagesToUser,
  updateUserInfo,
  changeEmail,
  changePassword,
}
