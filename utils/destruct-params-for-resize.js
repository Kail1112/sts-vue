/*
* Функция преобразующая список эфентов в обычный массив
* */

const objForEach = import('~/utils/object-for-each.js')

/**
 * @param {Object} params
 * @return {[Function]}
 * */

const destructParamsForResize = (params) => {
  return objForEach.then(({default: objForEach}) => {
    let result = []
    objForEach(params, item => {
      if (Array.isArray(item) && item.length > 0) {
        item.forEach(elem => {
          elem.value.forEach(func => result.push(func))
        })
      }
    })
    return result
  })
}

export default destructParamsForResize
