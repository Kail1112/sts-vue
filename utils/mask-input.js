/*
* Функция для работы с масками в формах
* */

/**
 * @param {String} value
 * @param {String} mask
 * @param {Object} mapMask
 * @return {String}
 * */

export default function maskInput (value, mask, mapMask) {
  let lastString = '', maskSplit = [], indexEmpty = [], clearValue = ''
  for (let i = 0; i < mask.length; i++) {
    !mapMask.hasOwnProperty(mask[i]) && (lastString += mask[i])
    if (mapMask.hasOwnProperty(mask[i])) {
      lastString !== '' && maskSplit.push(lastString)
      maskSplit.push(mask[i])
      indexEmpty.push(maskSplit.length - 1)
      lastString = ''
      if (value[i] !== undefined && value[i] !== '' && value[i] !== ' ') clearValue += value[i]
    }
  }
  lastString !== '' && maskSplit.push(lastString)

  let lastCursor = 0
  for (let i = 0; i < clearValue.length; i++) {
    if (indexEmpty[lastCursor] !== undefined && mapMask[maskSplit[indexEmpty[lastCursor]]](clearValue[i])) {
      maskSplit[indexEmpty[lastCursor]] = clearValue[i]
      lastCursor++
    }
  }
  return maskSplit.slice(0, indexEmpty[lastCursor]).join('')
}
