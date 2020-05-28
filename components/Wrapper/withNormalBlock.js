export default {
  name: 'WithNormalBlock',
  props: {
    moreClass: { type: String, default: '' }
  },
  render (h) {
    const classList = 'normal-block' + (this.$props.moreClass !== '' ? ` ${this.$props.moreClass}` : '')
    return h('div', { class: classList }, this.$slots.default)
  }
}
