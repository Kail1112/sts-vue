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
    // Все классы для кнопки
    const classList = (self.$props.btn.className !== '' ? self.$props.btn.className : '') + (self.$props.isActive ? ' active' : '')
    // render
    return h(withNormalBlock, [
      h(self.btn.tagName, { class: classList, on: { click: self.$props.onClickBtn } }, self.$slots.default)
    ])
  }
}
