import './index.scss';

export default {
  name: 'ProductCardCartPrice',
  props: {
    id: { type: Number, default: -1 }, // id товара
    spaceBetweenNumber: { type: Function, default: (price) => price },
  },
  computed: {
    /// totalPrice - цена
    totalPrice () {
      return Number.isInteger(this.$props.id * 1) && (this.$props.id * 1) > -1 ? this.$root.$store.getters.GET_TOTAL_PRICE_PRODUCT_CART(this.$props.id * 1) : 0
    },
    /*----------------------*/
  },
  render (h) {
    return h('div', { class: 'product-bottom' }, [
      h('div', { class: 'product-price' }, [
        h('h2', { class: 'product-price-now' }, this.$props.spaceBetweenNumber(this.totalPrice))
      ])
    ])
  }
}
