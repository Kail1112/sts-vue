import './index.scss';

import objForEach from "../../utils/object-for-each";
import destructStateSelect from "../../utils/destruct-state-select";

import SelectDrop from './components/SelectDrop/SelectDrop';

export default {
  name: 'Select',
  data () {
    return {
      value: {
        normal: '',
        checkbox: {},
        radio: ''
      },
      selected: false,
      error: false,
      workCallback: false,
      dropIsOpened: false
    }
  },
  props: {
    id: { type: String, default: '', required: true },
    placeholder: { type: String, default: '' },
    values: { type: Array, default: () => [] },
    startValue: { type: Number, default: -1 },
    moreClass: { type: String, default: '' },
    closeOnClick: { type: Boolean, default: true },
    initOnStart: { type: Boolean, default: false },
    callback: { type: Function, default: () => null }
  },
  computed: {
    /// isOpen - открыт ли селектор
    isOpen () {
      const check = `select-id-${this.$props.id}` === this.$root.$store.getters.GET_NOW_OPEN_SELECT
      if (!check) this.dropIsOpened && (this.dropIsOpened = false)
      return check
    },
    /*----------------------*/

    /// destructValue - получение всех выбранных значений
    destructValue () {
      return destructStateSelect(this.value)
    },
    /*----------------------*/

    /// hasSelectedValue - есть ли выбранные элементы
    hasSelectedValue () {
      return destructStateSelect(this.value) !== ''
    },
    /*----------------------*/
  },
  methods: {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/

    /// openDrop - открыть выбор вариантов
    openDrop () {
      if (this.dropIsOpened) {
        // Если нужно закрыть
        this.$root.$store.dispatch('changeSelectOpen', '')
        this.dropIsOpened = false
      } else {
        // Если нужно открыть
        this.$root.$store.dispatch('changeSelectOpen', `select-id-${this.$props.id}`)
        this.dropIsOpened = true
      }
    },
    /*----------------------*/

    /// callbackForDrop - колбек для отслеживания изменений в dropdown'e
    callbackForDrop (params) { this.value = params },
    /*----------------------*/
  },
  watch: {
    /// value
    value (val) {
      const result = []
      objForEach(val, (item, key) => {
        if (key === 'normal' || key === 'radio') item !== '' && result.push(item)
        else objForEach(item, (el) => el !== '' ? result.push(el) : undefined)
      })
      if (this.workCallback || this.$props.initOnStart) this.$props.callback({type: 'change', val: result})
      else !this.workCallback && (this.workCallback = true)
      this.selected = !!result.length
    },
    /*----------------------*/
  },
  components: {
    SelectDrop
  },
  render (h) {
    const self = this
    const {placeholder, startValue} = self.$props
    const {selected, error, dropIsOpened, openDrop, destructValue, isOpen, values, closeOnClick, callbackForDrop} = self
    // Что выбрано
    const nowSelected = h('p', { class: 'select-text', ref: 'val', on: { click: openDrop } }, destructValue)
    // Подпись для select
    const placeholderElement = h('div', { class: 'select-placeholder', on: { click: openDrop }, domProps: { innerHTML: placeholder } })
    // arrow
    const arrow = h('div', { class: 'sts-icon sts-iconarrow-bottom', on: { click: openDrop } })
    // render
    return h('div', { class: [self.$props.moreClass, { 'select': true, 'val': selected, 'open': dropIsOpened, error }] }, [
      h('div', { class: 'select-holder' }, [
        nowSelected,
        placeholderElement,
        arrow,
        h(SelectDrop, { props: { open: isOpen, values, startValue, closeOnClick, callback: callbackForDrop } })
      ])
    ])
  }
}
