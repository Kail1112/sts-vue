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
  created () {
    if (this.$props.startValue !== '') this.val = this.$props.startValue
  },
  render (h) {
    const self = this
    let attrsForInput = { type: self.$props.type }
    self.$props.maxSymbol !== 0 && (attrsForInput['maxlength'] = self.$props.maxSymbol)
    return h('span', {
      class: 'label-input-holder'
    }, [
      h('input', {
        attrs: attrsForInput,
        on: {
          input: (e) => {
            const value = e.target.value
            if (value !== undefined) {
              const {callback} = self.$props
              let result = callback(value)
              if (result !== null && result !== false) {
                const isDelete = self.val && value.length < self.val.length;
                if (isDelete) {
                  if (/(\W|\D)/g.test(result[result.length - 1])) {
                    let countDelete = 1
                    for (let i = result.length - 2; i > 0; i--) {
                      if (/(\w|\d)/g.test(result[i])) break;
                      else countDelete++;
                    }
                    e.target.value = result.slice(0, result.length - countDelete)
                  } else e.target.value = result
                } else e.target.value = result
              }
              self.val = value
            }
          }
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
