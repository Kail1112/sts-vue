export default {
  name: 'ProductCardBottom',
  props: {
    price: { type: Number, default: 0 },
    oldPrice: { type: Number, default: 0 },
    spaceBetweenNumber: { type: Function, default: (price) => price },
    getLink: { type: String, default: '/undefined' },
    getTitle: { type: Function, default: () => 'undefined' },
    productInComparison: { type: Boolean, default: false }, // товар в сравнение
    btnComparisonAction: { type: Function, default: () => null },
    productInCart: { type: Boolean, default: false }, // товар в корзине
    btnCartAction: { type: Function, default: () => null },
  },
  render (h) {
    const self = this
    const {price, oldPrice, spaceBetweenNumber, getLink, getTitle, productInComparison, btnComparisonAction, productInCart, btnCartAction} = self.$props
    // Блок с ценами
    const priceElement = h('div', { class: 'product-price' }, [
      h('div', { class: 'row' }, [
        h('div', { class: 'col-24' }, [
          h('h2', { class: 'product-price-now' }, `${spaceBetweenNumber(price)} сум`),
          h('h3', { class: 'product-price-old' }, `${spaceBetweenNumber(oldPrice)} сум`)
        ])
      ])
    ])
    // Кнопка перехода к детальной странице
    const btnToDetail = h('div', { class: 'col-14' }, [
      h('router-link', { props: { to: { path: getLink } }, class: 'button full center no-margin medium' }, getTitle('more-details'))
    ])
    // Кнопка управления сравнением
    const btnComparisonControl = h('div', { class: 'col-5' }, [
      h('button', {
        class: { 'button': true, 'full': true, 'center': true, 'no-margin': true, 'medium': true, 'border': productInComparison },
        attrs: { title: productInComparison ? getTitle('comparison-remove-product') : getTitle('comparison-add-product') },
        on: { click: btnComparisonAction }
      }, [ h('span', { class: 'sts-icon sts-iconchart-bar' }) ])
    ])
    // Кнопка управления корзиной
    const btnCartControl = h('div', { class: 'col-5' }, [
      h('button', {
        class: { 'button': true, 'full': true, 'center': true, 'no-margin': true, 'medium': true, 'border': productInCart },
        attrs: { title: productInCart ? getTitle('cart-remove-product') : getTitle('cart-add-product') },
        on: { click: btnCartAction }
      }, [ h('span', { class: 'sts-icon sts-iconshopping-cart' }) ])
    ])
    // Родительский элемент для кнопок
    const parentElementForButtons = h('div', { class: 'product-bottom-buttons' }, [
      h('div', { class: 'row row-small' }, [btnToDetail, btnComparisonControl, btnCartControl])
    ])
    // render
    return h('div', { class: 'product-bottom' }, [priceElement, parentElementForButtons])
  }
}
