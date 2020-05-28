import './index.scss';

import {spaceBetweenNumber} from '~/plugins/filters'

import PopUp from "../../../../../PopUp/PopUp";
import PopUpHolder from "../../../../../PopUp/components/PopUpHolder/PopUpHolder";
import PopUpBody from "../../../../../PopUp/components/PopUpBody/PopUpBody";
import PopUpTop from "../../../../../PopUp/components/PopUpTop/PopUpTop";
import ProductCard from "../../../../../ProductCard/ProductCard";

export default {
  name: "HeaderBottomCart",
  computed: {
    /// productsFromCart - массив продуктов из корзины
    productsFromCart () { return this.$root.$store.getters.GET_PRODUCTS_FROM_CART },
    /*----------------------*/

    /// countProductInCart - общее кол-во продуктов в корзине
    countProductInCart () {
      const result = this.$root.$store.getters.GET_ALL_COUNT_PRODUCTS_IN_CART
      return result > 99 ? '99+' : result + ''
    },
    /*----------------------*/

    /// allPriceCart - стоимсть всех товаров в корзине
    allPriceCart () {
      return this.$root.$store.getters.GET_ALL_PRICE_CART
    },
    /*----------------------*/
  },
  methods: {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/

    /// removeOverflow
    setOverflow () { !this.$root.$store.getters.GET_NOW_OVERFLOW && this.$root.$store.dispatch('changeOverflow', true) },
    /*----------------------*/

    /// removeOverflow
    removeOverflow () { this.$root.$store.getters.GET_NOW_OVERFLOW && this.$root.$store.dispatch('changeOverflow', false) }
    /*----------------------*/
  },
  components: {
    PopUp,
    PopUpHolder,
    PopUpBody,
    PopUpTop,
    ProductCard
  },
  render (h) {
    const self = this
    // Кнопка
    const btnPopUp = h('template', { slot: 'btn' }, [
      h('p', { class: 'sts-icon sts-iconshopping-cart' }),
      h('p', { class: 'text' }, self.getTitle('cart-title')),
      h('p', {
        class: 'text',
        attrs: {
          title: self.allPriceCart > 0 ? `${self.getTitle('cart-all-price-title')} ${spaceBetweenNumber(self.allPriceCart)} сум` : self.getTitle('cart-empty')
        }
      }, self.allPriceCart > 0 ? `${self.getTitle('cart-all-price-title')} ${spaceBetweenNumber(self.allPriceCart)} сум` : self.getTitle('cart-empty')),
      self.countProductInCart !== '0' ? h('p', { class: 'counter' }, [ h('span', self.countProductInCart) ]) : null
    ])
    // Список продукции
    const popUpProducts = self.productsFromCart.length === 0 ? [h('div', { class: 'cart-empty' }, [
      h('p', { class: 'sts-icon sts-iconshopping-cart' }),
      h('h3', self.getTitle('cart-empty'))
    ])] : self.productsFromCart.map((product, index) => {
      const props = {
        key: `popup-cart-product-${index}`,
        id: product.id,
        link: product.link,
        name: product.name,
        image: product.image,
        moreClass: 'product-cart',
        cart: true
      }
      return h(ProductCard, {props})
    })
    // Контент попап
    const contentPopUp = h('template', { slot: 'inner' }, [
      h(PopUpHolder, [
        h(PopUpTop, { props: { title: self.getTitle('cart-title'), hasCloseBtn: true, closeBtnFunction: self.removeOverflow } }),
        h(PopUpBody, { props: { moreClass: self.productsFromCart.length === 0 ? 'popup-body-cart empty' : 'popup-body-cart' } }, popUpProducts)
      ])
    ])
    // render
    return h('PopUp', { props: { keyPopUp: 'user-cart', btn: {tagName: 'div', className: 'header-cart'}, functionOnOpen: self.setOverflow } }, [
      btnPopUp,
      contentPopUp
    ])
  }
}
