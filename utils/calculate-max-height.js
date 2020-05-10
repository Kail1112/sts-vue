/*
* Функция вычисления максимальной высоты для блока
* */

/**
 * @param {Window} window
 * @param {Element} current
 * @param {Array} nodes
 * @param {Element} dependence
 * @return {number}
 * */

const getHeightNode = import('./get-height-node.js') /// Функция получения высоты блока

const calculateMaxHeight = async (window, current, nodes = [], dependence) => {
  if (window) {
    return await getHeightNode.then((getHeightNode) => {
      let balance = window.innerHeight;
      balance -= nodes.length > 0 ? nodes.reduce((acc, item) => {
        acc += getHeightNode.default(window, item)
        return acc
      }, 0) : 0
      let dependenceTop = 0
      if (dependence !== undefined) {
        dependenceTop = dependence.getBoundingClientRect().top + getHeightNode.default(window, dependence)
        balance -= dependenceTop
      }
      if (current !== undefined) {
        const currentRect = current.getBoundingClientRect(),
          currentTop = currentRect.top;
        let dependenceAllValues = 0
        if (dependenceTop > 0) {
          dependenceAllValues = dependenceTop + getHeightNode.default(window, dependence)
        }
        if (dependenceTop > 0 && currentTop > dependenceAllValues)
          balance -= currentTop - dependenceAllValues
      }
      return balance
    })
  }
  return 0
}

export default calculateMaxHeight
