import {withNormalBlock} from '../../../Wrapper/'

export default {
  name: "PopUpBtn",
  props: {
    btn: { type: Object, default: () => ({tagName: '', className: ''})},
    isActive: { type: Boolean, default: false },
    onClickBtn: { type: Function, default: () => null }
  },
  render (h) {
    const self = this
    return h(withNormalBlock, [
      h(self.btn.tagName, { class: [this.$props.btn.className, { 'active': this.$props.isActive }], on: { click: this.$props.onClickBtn } }, this.$slots.default)
    ])
  }
}
