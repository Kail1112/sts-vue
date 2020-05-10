/*
* Функция получения дефолного компонента из папки layout
* */

/**
 * @param {Vue} component
 * @param {string} typeFind
 * @param {string} selector
 * @return {Vue|undefined}
 * */

const getDefaultLayout = (component, typeFind = 'class', selector= '') => {
  let result = undefined
  for (let index in component.$children) {
    const element = component.$children[index]?.$el ?? undefined
    if (element !== undefined && element.tagName !== undefined) {
      let methodFind = (block) => block.getAttribute('class')
      switch (typeFind) {
        case 'class': methodFind = (block) => block.getAttribute('class'); break;
        case 'id': methodFind = (block) => block.getAttribute('id'); break;
        case 'tag': methodFind = (block) => block.tagName.toLowerCase(); break;
      }
      if (new RegExp(`(^| )${selector}( |$)`).test(methodFind(element))) {
        result = component.$children[index]
        break;
      }
    }
  }
  return result
}

export default getDefaultLayout
