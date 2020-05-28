export default {
  name: "InputsSignature",
  props: {
    signature: {
      type: String,
      default: ''
    }
  },
  render (h) {
    if (this.$props.signature !== '') {
      return h('span', {
        class: 'label-signature',
        domProps: {
          innerHTML: this.$props.signature
        }
      })
    } else return null
  }
}
