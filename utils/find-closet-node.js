/*
* Функция поиска билжайшего подходящего элемента
* */

/**
 * @param {Node & ParentNode} current
 * @param {string} method
 * @param {string} selector
 * @return {array}
 * */

const findClosetNode = (current, method = 'class', selector = '') => {
  if (current !== undefined && method !== '' && selector !== '') {
    let el = (block) => block.getAttribute('class')
    switch (method) {
      case 'class': el = (block) => block.getAttribute('class'); break;
      case 'id': el = (block) => block.getAttribute('id'); break;
      case 'tag': el = (block) => block.tagName.toLowerCase(); break;
    }
    let result = [];
    while (current.parentNode !== null && current.parentNode !== document.documentElement) {
      if (new RegExp(`(^| )${selector}( |$)`).test(el(current.parentNode)))
        result.push(current.parentNode);
      current = current.parentNode;
    }
    if (result.length === 0) result = [document.documentElement];
    return result;
  } else return [document.documentElement]
}

export default findClosetNode
