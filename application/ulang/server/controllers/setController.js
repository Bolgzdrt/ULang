const Set = require('../models/Set')
const { filterUpdates } = require('../utils/utils')

const createSet = async (req, res) => {
  const { name, language, words, favorite, description, ownerId } = req.body

  try {
    const set = await Set.create({
      name,
      language,
      words,
      favorite,
      description,
      ownerId
    })
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

const getAllSets = async (req, res) => {
  try {
    const sets = await Set.find({})
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

const toggleFavorite = async (req, res) => {
  const { id } = req.params

  try {
    const set = await Set.findById(id)
    await set.findByIdAndUpdate(id, {
      favorite: !set.favorite
    }, { new: true })
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
  const inputs = {
    name: args.name,
    language: args.language,
    words: args.words,
    favorite: args.favorite,
    description: args.description
  } = req.body

  const updates = filterUpdates(inputs)
  try {
    const updatedSet = await Set.findByIdAndUpdate(id, updates, { new: true })
    res.status(200).json({
      success: true,
      set: updatedSet
    })
  } catch(err) {
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
    console.log(err);
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

module.exports = {
  createSet,
  getAllSets,
  getSetById,
  updateSet,
  toggleFavorite,
  deleteSet
}
