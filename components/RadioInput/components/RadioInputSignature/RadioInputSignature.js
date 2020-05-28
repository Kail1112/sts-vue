export default {
  name: 'RadioInputSignature',
  props: {
    signature: { type: String, default: '' }
  },
  render (h) {
    return this.$props.signature !== '' ? h('span', { class: 'switch-input__signature', domProps: { innerHTML: this.$props.signature } }) : null
  }
}
