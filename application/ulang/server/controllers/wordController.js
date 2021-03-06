const Word = require('../models/Word')
const Set = require('../models/Set')
const User = require('../models/User')
const Conjugation = require('../models/Conjugation')
const { getRelevantConjugationData } = require('../utils/utils')

const createWord = async (req, res) => {
  const { word, language, english, partOfSpeech, definition, ownerId, setIds, conjugationData } = req.body

  try {
    let conjugationIds
    if (conjugationData) {
      const conjIds = conjugationData.map(async(conj) => {
        const newConj = await Conjugation.create(conj)
        return newConj._id
      });
      conjugationIds = await Promise.all(conjIds)
    }
    const newWord = await Word.create({
      word,
      language,
      english,
      partOfSpeech,
      definition,
      ownerId,
      conjugationIds
    })

    setIds.forEach(setId => {
      Set.findByIdAndUpdate(setId, { $push: { words: newWord._id }}).exec()
    });
    const user = await User.findById(ownerId)
    const dictsOfUser = user.dictionaries
    const dicts = await Set.find({ _id: { $in: dictsOfUser }, language: language })
    Set.findByIdAndUpdate(dicts[0]._id, { $push: { words: newWord._id }}).exec()

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
  const { id, language } = req.params
  try {
    const user = await User.findById(id)
    const dictsOfUser = user.dictionaries
    const dicts = await Set.find({ _id: { $in: dictsOfUser }, language: language })
    const wordIds = dicts[0].words
    const words = await Word.find({_id: { $in: wordIds}})
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
    let conjugationData = undefined;
    if (word.conjugationIds.length) {
      const conjugationDataPromises = word.conjugationIds.map((conjId) => {
        return Conjugation.findById(conjId)
      })
      conjugationData = await Promise.all(conjugationDataPromises)
      conjugationData = conjugationData.map(conj => getRelevantConjugationData(conj))
    }
    res.status(200).json({
      success: true,
      word: word._doc,
      conjugation: conjugationData,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message,
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

  try {
    const updatedWord = await Word.findByIdAndUpdate(args._id, inputs, {
      new: true,
      useFindAndModify: false
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
