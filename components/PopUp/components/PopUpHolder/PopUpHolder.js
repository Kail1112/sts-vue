import './index.scss';

export default {
  name: "PopUpHolder",
  render (h) {
    return h('div', { class: 'popup-holder' }, this.$slots.default)
  }
}
