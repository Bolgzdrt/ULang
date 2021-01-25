const Word = require('../models/Word')
const { filterUpdates } = require('../utils/utils')

const createWord = async (req, res) => {
  const { word, language, english, partOfSpeech, notes, ownerId } = req.body

  try {
    const newWord = await Word.create({
      word,
      language,
      english,
      partOfSpeech,
      notes,
      ownerId
    })
    res.status(201).json({
      success: true,
      id: newWord._id
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const getAllWordsOfUser = async (req, res) => {
  const { ownerId } = req.body
  try {
    const words = await Word.find({ ownerId })
    res.status(200).json({
      success: true,
      words
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const getWordById = async (req, res) => {
  const { id } = req.params

  try {
    const word = await Word.findById(id)
    res.status(200).json({
      success: true,
      word
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const updateWord = async (req, res) => {
  const args = req.body

  const inputs = ({
    word: args.word,
    language: args.language,
    english: args.english,
    partOfSpeech: args.partOfSpeech,
    notes: args.notes,
    ownerId: args.ownerId
  } = req.body)

  const updates = filterUpdates(inputs)
  try {
    const updatedWord = await Word.findByIdAndUpdate(args._id, updates, {
      new: true
    })
    res.status(200).json({
      success: true,
      word: updatedWord
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

const deleteWord = async (req, res) => {
  const { id } = req.params

  try {
    await Word.findByIdAndDelete(id)
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
  createWord,
  getAllWordsOfUser,
  getWordById,
  updateWord,
  deleteWord
}
