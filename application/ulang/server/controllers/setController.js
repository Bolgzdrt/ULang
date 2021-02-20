const Set = require('../models/Set')
const User = require('../models/User')
const { filterUpdates } = require('../utils/utils')

const createSet = async (req, res) => {
  const { name, language, words, description, ownerId, quickAccess } = req.body
  try {
    const user = await User.findById(ownerId)
    const set = await Set.create({
      name,
      language,
      words,
      description,
      ownerId
    })
    if (quickAccess) {
      User.findByIdAndUpdate(user._id, { $push: { sets: set._id, quickAccess: set._id }}, { useFindAndModify: false }).exec()
    } else {
      User.findByIdAndUpdate(user._id, { $push: { sets: set._id }}, { useFindAndModify: false }).exec()
    }
    res.status(201).json({
      success: true,
      id: set._id
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const getAllSetsOfLanguage = async (req, res) => {
  const { id, lang } = req.params
  try {
    const user = await User.findById(id)
    const setsOfUser = user.sets;
    const sets = await Set.find({ _id: { $in: setsOfUser }, language: lang })
    res.status(200).json({
      success: true,
      sets
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const getSetById = async (req, res) => {
  const { id } = req.params

  try {
    const set = await Set.findById(id)
    res.status(200).json({
      success: true,
      set
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

/*
  Favorite on the set should only reflect the ownerId.
  If we allow people to favorite other peoples' sets,
  then there needs to be a different means of storing that,
  or it needs to just be moved to the user.
*/
const toggleFavorite = async (req, res) => {
  const { id } = req.params

  try {
    const set = await Set.findById(id)
    await Set.findByIdAndUpdate(
      id,
      { favorite: !set.favorite },
      { new: true, useFindAndModify: false }
    )
    res.status(200).json({
      success: true,
      set: updatedSet
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const updateSet = async (req, res) => {
  const { id } = req.params
  const args = req.body
  const inputs = ({
    name: args.name,
    language: args.language,
    words: args.words,
    favorite: args.favorite,
    description: args.description
  } = req.body)

  const updates = filterUpdates(inputs)
  try {
    const updatedSet = await Set.findByIdAndUpdate(id, updates, { new: true, useFindAndModify: false })
    res.status(200).json({
      success: true,
      set: updatedSet
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const deleteSet = async (req, res) => {
  const { id } = req.params

  try {
    await Set.findByIdAndDelete(id)
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

module.exports = {
  createSet,
  getAllSetsOfLanguage,
  getSetById,
  updateSet,
  toggleFavorite,
  deleteSet
}
