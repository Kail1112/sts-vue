import './index.scss';

import RadioInputSignature from './components/RadioInputSignature/RadioInputSignature';

export default {
  name: 'RadioInput',
  props: {
    type: { type: String, default: 'radio' },
    checked: { type: Boolean, default: false },
    signature: { type: String, default: '' },
    name: { type: String, default: '' },
    moreClass: { type: String, default: '' },
    callback: { type: Function, default: () => null }
  },
  components: {
    RadioInputSignature
  },
  render (h) {
    const self = this
    const {type, checked, signature, name, moreClass} = self.$props
    // render
    return h('label', {
      class: ['switch-input', moreClass],
      on: { change: e => self.$props.callback(e.target.checked) }
    }, [
      h('input', {
        attrs: { type, checked: checked, name } ,
        on: { change: () => self.$emit('change') }
      }),
      h('span', { class: 'switch-input__indicator' }, [ h('span', { class: 'switch-input__dot' }) ]),
      h(RadioInputSignature, { props: { signature } })
    ])
  }
}
