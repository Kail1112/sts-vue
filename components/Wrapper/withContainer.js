export default {
  name: 'WithContainer',
  props: {
    moreClass: { type: String, default: '' }
  },
  render (h) {
    const classList = 'container' + (this.$props.moreClass !== '' ? ` ${this.$props.moreClass}` : '')
    return h('div', { class: classList }, this.$slots.default)
  }
}
