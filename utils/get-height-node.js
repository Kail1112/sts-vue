/*
* Функция получения высоты блока
* */

/**
 * @param {Window} window
 * @param {Element} node
 * @return {number}
 * */

const getHeightNode = (window, node) => {
  if (window) {
    let height = node.clientHeight,
      styles = window.getComputedStyle(node)
    height += parseInt(styles.marginTop, 10)
    height += parseInt(styles.marginBottom, 10)
    height += parseInt(styles.borderTopWidth, 10)
    height += parseInt(styles.borderBottomWidth, 10)
    return height
  }
  return 0
}

export default getHeightNode
