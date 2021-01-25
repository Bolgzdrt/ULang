// Filters out anything that's null
module.exports.filterUpdates = (inputs) =>
  Object.entries(inputs).reduce(
    (acc, [key, val]) => (val == null ? { ...acc } : { ...acc, [key]: val }),
    {}
  )
