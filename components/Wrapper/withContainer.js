export default {
  name: 'WithContainer',
  props: {
    moreClass: { type: String, default: '' }
  },
  render (h) {
    return h('div', { class: ['container', this.$props.moreClass] }, this.$slots.default)
  }
}
