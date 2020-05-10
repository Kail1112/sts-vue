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
        containerLeft = containerRect.left + parseFloat(window.getComputedStyle(container).paddingLeft),
        containerWidth = container.clientWidth,
        containerAllValues = containerLeft + containerWidth;

      const dependenceRect = dependence.getBoundingClientRect(),
        dependenceLeft = dependenceRect.left,
        dependenceWidth = res.default(window, dependence),
        dependenceRight = getWindowWidth(window) - (dependenceWidth + dependenceLeft);

      const getAllValues = (result, window, el) => {
        const widthEl = res.default(window, el),
          elRect = el.getBoundingClientRect(),
          elPositionLeft = result.left !== '' ? parseFloat(result.left) : elRect.left
        const all = result.right !== '' ? parseFloat(result.right) + widthEl : widthEl + elPositionLeft
        // console.log(all, elPositionLeft, containerAllValues, containerLeft)
        return {
          width: widthEl,
          left: elPositionLeft,
          all
        }
      }
      if (getAllValues(result, window, el).all > containerAllValues) {
        result.left = ''
        result.right = `${dependenceRight}px`
      }
      if (containerLeft > getAllValues(result, window, el).left) {
        /* Если левый край попапа выходит за рамки контейнера */
        result.left = `${dependenceLeft}px`
        result.right = ''
      }
      if (getAllValues(result, window, el).all - containerLeft > containerWidth) {
        result.left = ''
        result.right = `${dependenceRight}px`
        result.maxWidth = `${containerWidth - (parseFloat(window.getComputedStyle(container).paddingLeft) + parseFloat(window.getComputedStyle(container).paddingRight))}px`
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
