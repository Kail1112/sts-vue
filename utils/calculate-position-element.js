/*
* Функция расчета оптимального положения элемента
* */

const getWidthNode = import('~/utils/get-width-node.js');

/**
 * @param {Element} el
 * @param {Element} dependence
 * @param {Element} container
 * @param {Window} window
 * @return {Object}
 * */

const calculatePositionElement = (el, dependence, container, window) => {
  let result = {
    left: '',
    right: '',
    maxWidth: ''
  }
  if (window) {
    return getWidthNode.then(res => {
      const getWindowWidth = (window) => window.innerWidth

      const containerRect = container.getBoundingClientRect(),
        containerLeft = containerRect.left,
        containerWidth = container.clientWidth,
        containerAllValues = containerLeft + containerWidth;

      const dependenceRect = dependence.getBoundingClientRect(),
        dependenceLeft = dependenceRect.left,
        dependenceWidth = res.default(window, dependence),
        dependenceRight = getWindowWidth(window) - (dependenceWidth + dependenceLeft);

      const getAllValues = (window, el) => {
        const widthEl = res.default(window, el),
          elRect = el.getBoundingClientRect(),
          elPositionLeft = result.left !== '' ? parseInt(result.left, 10) : elRect.left
        return {
          width: widthEl,
          left: elPositionLeft,
          all: result.right !== '' ? getWindowWidth(window) - parseInt(result.right, 10) : widthEl + elPositionLeft
        }
      }
      if (containerLeft > getAllValues(window, el).left) {
        /* Если левый край попапа выходит за рамки контейнера */
        result.left = `${dependenceLeft}px`
        result.right = ''
      }
      if (getAllValues(window, el).all > containerAllValues) {
        result.left = ''
        result.right = `${dependenceRight}px`
      }
      if (getAllValues(window, el).all > getWindowWidth(window)) {
        result.maxWidth = `${containerWidth}px`
        result.left = `-${dependenceLeft}px`
        result.right = `-${dependenceRight}px`
      }
      return {
        ...result,
        left: parseFloat(result.left) === dependenceLeft ? '0px' : result.left,
        right: parseFloat(result.right) === dependenceRight ? '0px' : result.right,
      }
    })
  } else return result
}

export default calculatePositionElement
