/*
* Функция трансформирования данных для добавления в эфенты изменения размеров области просмотра
* */

const transformParamsForResize = (method, params, all) => {
  const newData = (obj, key, elem) => {
    if (obj.hash[key] === undefined) {
      obj.hash[key] = [elem]
      obj.list.push(key)
    } else {
      obj.hash[key].push(elem)
    }
    return obj
  }
  const {key, value} = params
  return value.reduce((acc, element) => {
    if (element.type === method) newData(acc, key, element)
    else {
      if (all) newData(acc, key, element)
    }
    return acc
  }, {hash: {}, list: []})
}

export default transformParamsForResize
