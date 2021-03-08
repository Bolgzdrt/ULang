const Word = require('../models/Word')
const Set = require('../models/Set')
const User = require('../models/User')
const Conjugation = require('../models/Conjugation')
const {
  getRelevantConjugationData,
  filterFalseyValues,
} = require('../utils/utils')
const { findByIdAndUpdate } = require('../models/Word')

const createWord = async (req, res) => {
  const {
    word,
    language,
    english,
    partOfSpeech,
    definition,
    ownerId,
    setIds,
    conjugationData,
  } = req.body

  try {
    let conjugationIds
    if (conjugationData) {
      const conjIds = conjugationData.map(async (conj) => {
        const newConj = await Conjugation.create(conj)
        return newConj._id
      })
      conjugationIds = await Promise.all(conjIds)
    }
    const newWord = await Word.create({
      word,
      language,
      english,
      partOfSpeech,
      definition,
      ownerId,
      conjugationIds,
    })

    setIds.forEach((setId) => {
      Set.findByIdAndUpdate(setId, { $push: { words: newWord._id } }).exec()
    })
    const user = await User.findById(ownerId)
    const dictsOfUser = user.dictionaries
    const dicts = await Set.find({
      _id: { $in: dictsOfUser },
      language: language,
    })
    Set.findByIdAndUpdate(dicts[0]._id, {
      $push: { words: newWord._id },
    }).exec()

    res.status(201).json({
      success: true,
      id: newWord._id,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message,
    })
  }
}

const getAllWordsOfUser = async (req, res) => {
  const { id, language } = req.params
  try {
    const user = await User.findById(id)
    const dictsOfUser = user.dictionaries
    const dicts = await Set.find({
      _id: { $in: dictsOfUser },
      language: language,
    })
    const wordIds = dicts[0].words
    const words = await Word.find({ _id: { $in: wordIds } })
    res.status(200).json({
      success: true,
      words,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message,
    })
  }
}

const getWordById = async (req, res) => {
  const { id } = req.params

  try {
    const word = await Word.findById(id)
    let conjugationData = undefined
    if (word.conjugationIds.length) {
      const conjugationDataPromises = word.conjugationIds.map((conjId) => {
        return Conjugation.findById(conjId)
      })
      conjugationData = await Promise.all(conjugationDataPromises)
      conjugationData = conjugationData.map((conj) =>
        ['tl', 'tr', 'ml', 'mr', 'bl', 'br', 'title', '_id'].reduce(
          (acc, cur) => {
            return conj[cur]
              ? { ...acc, [cur]: conj[cur] }
              : { ...acc, [cur]: '' }
          },
          {}
        )
      )
    }
    res.status(200).json({
      success: true,
      word: word._doc,
      conjugations: conjugationData,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message,
    })
  }
}

const getConjugation = async (req, res) => {
  const { id } = req.params

  try {
    const conjugation = await Conjugation.findById(id)
    const response = getRelevantConjugationData(conjugation)
    res.status(200).json({
      success: true,
      conjugation: response,
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
  const { id } = req.params
  const args = req.body

  const inputs = ({
    word: args.word,
    language: args.language,
    english: args.english,
    partOfSpeech: args.partOfSpeech,
    notes: args.notes,
    ownerId: args.ownerId,
  } = req.body)
  const updates = filterFalseyValues(inputs)

  try {
    const updatedWord = await Word.findByIdAndUpdate(id, updates, {
      new: true,
    })
    res.status(200).json({
      success: true,
      word: updatedWord,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message,
    })
  }
}

const updateConjugation = async (req, res) => {
  const { id } = req.params
  const inputs = ({ title, tl, tr, ml, mr, bl, br } = req.body)
  const updates = filterFalseyValues(inputs)

  try {
    const updatedConjugation = await Conjugation.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    )
    res.status(200).json({
      success: true,
      word: updatedConjugation,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message,
    })
  }
}

const createConjugationForWord = async (req, res) => {
  // word id
  const { id } = req.params
  const args = req.body
  const inputs = {
    title: args.title,
    tl: args.tl,
    tr: args.tr,
    ml: args.ml,
    mr: args.mr,
    bl: args.bl,
    br: args.br,
  }
  const conjugationData = filterFalseyValues(inputs)

  try {
    const newConjugation = await Conjugation.create(conjugationData)
    await Word.findByIdAndUpdate(id, {
      $push: { conjugationIds: newConjugation._id },
    })
    res.status(200).json({
      success: true,
      conjugation: newConjugation,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    })
  }
}

const deleteWord = async (req, res) => {
  const { id } = req.params

  try {
    await Word.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: 'Word Deleted Successfully'
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message,
    })
  }
}

module.exports = {
  createWord,
  getAllWordsOfUser,
  getWordById,
  getConjugation,
  updateWord,
  createConjugationForWord,
  updateConjugation,
  deleteWord,
}
