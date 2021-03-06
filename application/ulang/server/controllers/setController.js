const Set = require('../models/Set')
const User = require('../models/User')
const Word = require('../models/Word')
const { filterFalseyValues } = require('../utils/utils')

/**
 * handles the creation of a set and adding the set to the user's set list in the db
 */
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

/**
 * returns a list of all sets given a user id and language
 */
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

/**
 * returns a single set given the set id
 */
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

/**
 * returns all user sets that contain verbs, mainly used for conjugation practice
 */
const getSetsWithVerbs = async (req, res) => {
  const { id, lang } = req.params
  try {
    const user = await User.findById(id)
    const setsOfUser = user.sets;
    const sets = await Set.find({ _id: { $in: setsOfUser }, language: lang })
    let verbContainingSets = []
    for (let s of sets) {
      for (let w of s.words) {
        const word = await Word.findById(w)
        if (word.conjugationIds.length) {
          verbContainingSets.push(s)
          break
        }
      }
    }
    res.status(200).json({
      success: true,
      sets: verbContainingSets
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    })
  }
}

/**
 * returns the word data for all words in the given set
 */
const getWordsInSet = async (req, res) => {
  const { id } = req.params

  try {
    const set = await Set.findById(id)
    const setWordIds = set.words
    const wordPromises = setWordIds.map(word => Word.findById(word))
    const words = await Promise.all(wordPromises)
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

/*
  Favorite on the set should only reflect the ownerId.
  If we allow people to favorite other peoples' sets,
  then there needs to be a different means of storing that,
  or it needs to just be moved to the user.
*/
/**
 * adds/removes set from user's favorite set list
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

/**
 * updates set in db with provided information
 */
const updateSet = async (req, res) => {
  const { id } = req.params
  const args = req.body
  const input = {
    name: args.name,
    language: args.language,
    words: args.words,
    favorite: args.favorite,
    description: args.description
  }
  const updates = filterFalseyValues(input)

  try {
    const updatedSet = await Set.findByIdAndUpdate(id, updates, { new: true })
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

/**
 * removes set from user's set list permanently
 */
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

/**
 * returns the last 4 most recently created sets for a given user and language
 */
const getMostRecentSets = async (req, res) => {
  const { id, lang } = req.params
  try {
    const user = await User.findById(id)
    const setsOfUser = user.sets;
    const sets = await Set.find({ _id: { $in: setsOfUser }, language: lang }).sort({ createdAt: -1 }).limit(4)
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

module.exports = {
  createSet,
  getAllSetsOfLanguage,
  getSetById,
  getWordsInSet,
  updateSet,
  toggleFavorite,
  deleteSet,
  getSetsWithVerbs,
  getMostRecentSets
}
