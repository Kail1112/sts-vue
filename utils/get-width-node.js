/*
* Функция получения ширины блока
* */

/**
 * @param {Window} window
 * @param {Element} node
 * @return {number}
 * */

const getWidthNode = (window, node) => {
  if (window) {
    let width = node.clientWidth,
      styles = window.getComputedStyle(node);
    width += parseInt(styles.marginLeft, 10)
    width += parseInt(styles.marginRight, 10)
    width += parseInt(styles.borderLeftWidth, 10)
    width += parseInt(styles.borderRightWidth, 10)
    return width;
  }
  return 0
}

export default getWidthNode
