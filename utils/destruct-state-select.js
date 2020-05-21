import objForEach from "./object-for-each";

/**
 * @param {Object} value
 * @return {String}
 * */

const destructStateSelect = (value) => {
  let result = ''
  objForEach(value, (item, key) => {
    if (key === 'normal' || key === 'radio') {
      if (item !== '') {
        result += result === '' ? item : `, ${item}`
      }
    } else {
      objForEach(item, (el) => result += result === '' ? el : `, ${el}`)
    }
  })
  return result
}

export default destructStateSelect
