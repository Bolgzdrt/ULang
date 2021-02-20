// Filters out anything that's null
module.exports.filterUpdates = (inputs) =>
  Object.entries(inputs).reduce(
    (acc, [key, val]) => (val == null ? { ...acc } : { ...acc, [key]: val }),
    {}
  )

module.exports.capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
