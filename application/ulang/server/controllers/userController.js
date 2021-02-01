const User = require('../models/User')

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

module.exports = {
  followUser,
  unfollowUser,
  getUserInfo
}
