export default {
  name: 'WithNormalBlock',
  props: {
    moreClass: { type: String, default: '' }
  },
  render (h) {
    return h('div', { class: ['normal-block', this.$props.moreClass] }, this.$slots.default)
  }
}
