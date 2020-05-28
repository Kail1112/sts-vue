import InputsPlaceHolder from '../InputsPlaceHolder/InputsPlaceHolder'

export default {
  name: "InputsText",
  data () {
    return {
      val: ''
    }
  },
  props: {
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    callback: { type: Function, default: () => null },
    startValue: { type: String, default: '' },
    maxSymbol: { type: Number, default: 0 }
  },
  components: {
    InputsPlaceHolder
  },
  created () {
    if (this.$props.startValue !== '') this.val = this.$props.startValue
  },
  render (h) {
    const self = this
    let attrsForInput = { type: self.$props.type }
    self.$props.maxSymbol !== 0 && (attrsForInput['maxlength'] = self.$props.maxSymbol)
    return h('span', {
      class: 'label-input-holder',
      on: {
        input: async (e) => {
          const value = e.target.value
          if (value !== undefined) {
            const {callback} = self.$props
            const result = await callback(value)
            if (result !== null && result !== false) self.val = result
            if (result === false) self.val = e.target.value
          }
        }
      }
    }, [
      h('input', {
        domProps: {
          value: self.val
        },
        attrs: attrsForInput,
        on: {
          input: () => self.$emit('input')
        }
      }),
      h(InputsPlaceHolder, {
        props: {
          placeholder: self.$props.placeholder
        }
      })
    ])
  }
}
