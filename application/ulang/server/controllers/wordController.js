const Word = require('../models/Word')
const Set = require('../models/Set')
const User = require('../models/User')
const Conjugation = require('../models/Conjugation')
const { filterUpdates } = require('../utils/utils')

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

const getConjugation = async (req, res) => {
  const { id } = req.params

  try {
    const conjugation = await Conjugation.findById(id)
    const response = ['tl', 'tr', 'ml', 'mr', 'bl', 'br'].reduce((acc, cur) => {
      if(conjugation[cur]){
        return {
          ...acc,
          [cur]: conjugation[cur]
        }
      } else {
        return acc
      }
    }, {})
    response['title'] = conjugation.title
    res.status(200).json({
      success: true,
      conjugation: response
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
  getConjugation,
  updateWord,
  deleteWord
}
