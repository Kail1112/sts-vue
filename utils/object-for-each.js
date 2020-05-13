/**
 * @typedef {function(*, *, Number, Object)} callbackFunction
 * */

/**
 * @param {Object} obj - Объект который нужно обработать
 * @param {callbackFunction} callback - Функция колбека на каждый проход
 * */

const objForEach = (obj, callback) => {
  let index = 0;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      callback(obj[key], key, index, obj)
      index++
    }
  }
}

export default objForEach
