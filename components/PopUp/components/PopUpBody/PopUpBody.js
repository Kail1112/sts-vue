import './index.scss';

export default {
  name: "PopUpBody",
  props: {
    moreClass: { type: String, default: '' }, /// доп. класс
    scrolled: { type: Boolean, default: true } /// нужно ли разрешать прокрутку содержимого
  },
  render (h) {
    return h('div', { class: ['popup-body', { 'no-scroll': !this.$props.scrolled }, this.$props.moreClass] }, this.$slots.default)
  }
}
