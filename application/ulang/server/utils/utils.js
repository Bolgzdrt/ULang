// Filters out anything that's null
module.exports.filterUpdates = (inputs) =>
  Object.entries(inputs).reduce(
    (acc, [key, val]) => (val == null ? { ...acc } : { ...acc, [key]: val }),
    {}
  )

module.exports.languageCodes = {
  french: 'FR',
  spanish: 'SP',
  italian: 'IT',
  german: 'GE',
  portuguese: 'PO',
  swedish: 'SW',
  dutch: 'DU',
  romanian: 'RO'
}
