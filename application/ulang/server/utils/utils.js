// Filters out anything that's null
module.exports.filterFalseyValues = (inputs) =>
  Object.entries(inputs).reduce(
    (acc, [key, val]) => (val == null ? { ...acc } : { ...acc, [key]: val }),
    {}
  )

module.exports.capitalizeWord = (word) => (
  word.charAt(0).toUpperCase() + word.slice(1)
)

module.exports.getRelevantConjugationData = (conjugation) => {
  return ['tl', 'tr', 'ml', 'mr', 'bl', 'br', 'title'].reduce((acc, cur) => {
    return conjugation[cur]
      ? { ...acc, [cur]: conjugation[cur] }
      : acc
  }, {})
}
