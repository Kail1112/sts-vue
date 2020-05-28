export default {
  name: "InputsPlaceHolder",
  props: {
    placeholder: { type: String, default: '' }
  },
  render (h) {
    if (this.$props.placeholder !== '') {
      return h('span', {
        class: 'label-placeholder',
        domProps: {
          innerHTML: this.$props.placeholder
        }
      })
    } else return null
  }
}
