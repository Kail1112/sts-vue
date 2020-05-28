import './index.scss';

import RadioInput from '../../../RadioInput/RadioInput';

export default {
  name: 'SelectDrop',
  data () {
    return {
      value: {
        normal: '',
        checkbox: {},
        radio: ''
      },
    }
  },
  props: {
    open: { type: Boolean, default: false }, // открыт ли dropdown
    values: { type: Array, default: () => [] }, // значения
    startValue: { type: Number, default: -1 },
    closeOnClick: { type: Boolean, default: false },
    callback: { type: Function, default: () => null }
  },
  watch: {
    /// startValue
    values () { this.updateStartValue() },
    /*----------------------*/
  },
  methods: {
    /// selectOption - метод изменения выбранных данных
    selectOption (type = '', value = '', name = '') {
      let cloneValue = {...this.value}
      if (type !== '' && value !== '' && name !== '') {
        switch (type) {
          case "normal": {
            if (cloneValue['normal'] === value)
              cloneValue['normal'] = ''
            else
              cloneValue['normal'] = value
          } break;
          case "radio": {
            if (cloneValue['radio'] === value)
              cloneValue['radio'] = ''
            else
              cloneValue['radio'] = value
          } break;
          default: {
            let cloneCheckboxValue = {...cloneValue['checkbox']}
            if (cloneCheckboxValue[name] === undefined) {
              cloneCheckboxValue[name] = value
            } else {
              delete cloneCheckboxValue[name]
            }
            cloneValue['checkbox'] = cloneCheckboxValue
          } break;
        }
        this.value = cloneValue
        this.$props.callback(cloneValue)
        if (this.$props.closeOnClick) {
          this.$root.$store.dispatch('changeSelectOpen', '')
        }
      }
    },
    /*----------------------*/

    /// updateStartValue - обновление стартового значения
    updateStartValue () {
      const {startValue, values, callback} = this.$props
      if (startValue !== -1) {
        if (values[startValue] !== undefined) {
          const startType = values[startValue].type
          switch (startType) {
            case "normal": this.value['normal'] = values[startValue].value; break;
            case "radio": this.value['radio'] = values[startValue].value; break;
            default: {
              let template = {}
              template[values[startValue].name] = values[startValue].value
              this.value['checkbox'] = {...template}
            } break;
          }
          callback(this.value)
        }
      }
    },
    /*----------------------*/
  },
  components: {
    RadioInput
  },
  created () {
    this.updateStartValue()
  },
  render (h) {
    const self = this
    const {value, selectOption} = self
    const {open, values} = self.$props
    return open && values.length > 0 ? h('div', { class: 'select-drop' }, [
      h('ul', values.map(({value: valueItem, type, name}, index) => {
        // Список классов
        let classList = (className, last) => className + (last ? ' last' : '')
        // Привычное отображение тега select
        const normalItem = type === 'normal' ? h('span', {
          class: { 'select-normal': true, 'last': index === values.length - 1, 'active': value.normal === valueItem },
          on: { click: () => selectOption(type, valueItem, name) }
        }, valueItem) : null
        // Отображение checkbox | radio
        const inputItem = type === 'radio' || type === 'checkbox' ? h(RadioInput, {
          props: { type, checked: value.checkbox[name] !== undefined, signature: valueItem, name, moreClass: classList(type === 'radio' ? 'input-radio' : 'input-checkbox', index === values.length - 1), callback: () => selectOption(type, valueItem, name) }
        }) : null
        // render
        return h('li', { props: { key: `drop-item-${index}-${name}` } }, [
          normalItem,
          inputItem
        ])
      }))
    ]) : null
  }
}
