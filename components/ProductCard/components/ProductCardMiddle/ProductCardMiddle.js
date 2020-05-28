export default {
  name: 'ProductCardMiddle',
  props: {
    onlyCart: { type: Boolean, default: false }, // карточка для корзины
    shortInfo: { type: Array, default: () => [] }, // краткое описание
    calcInfo: { type: Boolean, default: false },
    getLink: { type: String, default: '/undefined' },
    getTitle: { type: Function, default: () => 'undefined' },
  },
  render (h) {
    const self = this
    const {onlyCart, shortInfo, calcInfo, getLink, getTitle} = self.$props
    // Описание товара
    const shortInfoElement = shortInfo.length ? h('div', { class: 'typography ul-variant-2' }, [
      h('ul', { class: { 'product-middle-info': true, 'more': calcInfo } }, shortInfo.slice(0, 4).map((info, index) => h('li', { props: { key: `product-info-${index}` }, domProps: { innerHTML: info } })))
    ]) : null
    // Ссылка на товар
    const linkToProduct = calcInfo ? h('router-link', { props: { to: getLink }, class: 'links product-middle-link' }, getTitle('show-all')) : null
    // render
    return !onlyCart ? h('div', { class: 'product-middle' }, [
      shortInfoElement,
      linkToProduct
    ]) : null
  }
}
