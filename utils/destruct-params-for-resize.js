/*
* Функция преобразующая список эфентов в обычный массив
* */

const destructParamsForResize = (params) => {
  const result = params.list.reduce((acc, key) => {
    const obj = params.hash[key]
    if (obj.length > 0) {
      obj.forEach(elem => {
        elem.value.forEach(func => acc.push(func))
      })
    }
    return acc
  }, [])
  return result
}

export default destructParamsForResize
