const Set = require('../models/Set')

const createSet = async (req, res) => {
  const { name, language, words, favorite, description } = req.body

  try {
    const set = await Set.create({
      name,
      language,
      words,
      favorite,
      description
    })
    res.status(200).json({
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

const getAllSets = (req, res) => {}

const getSetById = (req, res) => {}

const updateSet = (req, res) => {}

const deleteSet = (req, res) => {}

module.exports = {
  createSet,
  getAllSets,
  getSetById,
  updateSet,
  deleteSet
}
