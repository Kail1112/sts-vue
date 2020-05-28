import './index.scss';

export default {
  name: "PopUpBody",
  props: {
    moreClass: { type: String, default: '' }, /// доп. класс
    scrolled: { type: Boolean, default: true } /// нужно ли разрешать прокрутку содержимого
  },
  render (h) {
    const self = this
    const classList = 'popup-body' + ( !self.$props.scrolled ? ' no-scroll' : '' ) + ( self.$props.moreClass !== '' ? ` ${self.$props.moreClass}` : '' )
    return h('div', { class: classList }, self.$slots.default)
  }
}
