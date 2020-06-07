import './index.scss';

import maskInput from "../../utils/mask-input";
import objForEach from "../../utils/object-for-each";

import InputsText from './components/InputsText/InputsText';
import InputsSignature from './components/InputsSignature/InputsSignature';
import RadioInput from '../RadioInput/RadioInput';
import InputsPasswordConfirm from './components/InputsPasswordConfirm/InputsPasswordConfirm'

export default {
  name: "Inputs",
  data () {
    return {
      typeInput: 'password',
      input: false, /// был ли введен символ
      error: false, /// была ли ошибка
      success: false, /// успешно ли
      maskSplit: [], indexEmpty: [], registerSymbols: []
    }
  },
  props: {
    mode: { type: String, default: 'single' }, /// способ отображения
    switchPasswordShow: { type: Boolean, default: false }, /// отображать ли кнопку переключения пароля
    placeholder: { type: Array,  default: () => [''] }, ///
    signature: { type: Array, default: () => [''] }, /// подпись под полем для ввода
    type: { type: String, default: 'text' }, /// тип полей для ввода
    startValue: { type: String, default: '' }, /// стартовое значение
    callback: { type: Function, default: () => null }, /// колбек изменения данных
    onSuccess: { type: Function, default: () => null }, /// колбек успешный
    onError: { type: Function, default: () => null }, /// колбек с ошибкой
    patternToCheck: { type: String, default: '' }, /// регулярка проверки правильности заполнения
    mask: { type: String, default: '' }, /// маска заполнения
    mapMask: { type: Object, default: () => ({
        'D': (symbol) => !Number.isNaN(symbol * 1) && Number.isInteger(symbol * 1),
        'S': (symbol) => /[a-z]/gi.test(symbol) || /[А-ЯЁ]/gi.test(symbol)
      })
    }
  },
  methods : {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/

    /// changeInput
    changeInput (status) { this.input = status },
    /*----------------------*/

    /// changeError
    changeError (status) { this.error = status },
    /*----------------------*/

    /// changeSuccess
    changeSuccess (status) { this.success = status },
    /*----------------------*/

    /// regularFunction
    regularFunction (reg, string) { return new RegExp(reg, 'gi').test(string) },
    /*----------------------*/

    /// setError - установка флага ошибки
    setError (val) {
      if (!this.error) this.changeError(true)
      if (this.success) this.changeSuccess(false)
      this.$props.onError({type: 'error', value: val})
      return 'error'
    },
    /*----------------------*/

    /// setSuccess - установка флага удачного набора
    setSuccess (val) {
      if (this.error) this.changeError(false)
      if (!this.success) this.changeSuccess(true)
      this.$props.onSuccess({type: 'success', value: val})
      return 'success'
    },
    /*----------------------*/

    /// checkOnChange - проверка данных
    checkOnChange (val) {
      let typeCallback = 'undefined'
      let value = val
      this.changeInput(val !== '')
      const {type, mask, patternToCheck, callback} = this.$props
      const {input, error, success, changeInput, changeSuccess, changeError, setSuccess, setError, regularFunction} = this

      /// проверка данных на соответствие
      if (value !== '') {
        if (mask !== '') {
          const result = maskInput(value, mask, this.$props.mapMask)
          if (result !== '') { if (!input) changeInput(true) }
          else { if (input) changeInput(false) }
          value = result
        }


        // if (mask !== '') {
        //   const filters = {
        //     S: (symbol) => /[a-zA-Z]/g.test(symbol),
        //     D: (symbol) => Number.isInteger(symbol * 1)
        //   }
        //   const result = maskInput(value, filters, mask)
        //   if (result !== '') { if (!input) changeInput(true) }
        //   else { if (input) changeInput(false) }
        //   value = result
        // }
        // if (type === 'email') {
        //   const regEmail = regularFunction('(\\d|\\w)*\\@(\\d|\\w){2,}\\.(\\d|\\w){2,}', value)
        //   if (regEmail) typeCallback = setSuccess(value)
        //   else typeCallback = setError(value)
        // } else {
        //   if (patternToCheck !== '') {
        //     const testRegular = regularFunction(patternToCheck, value)
        //     if (testRegular) typeCallback = setSuccess(value)
        //     else typeCallback = setError(value)
        //   }
        // }
      } else {
        if (error) changeError(false)
        if (success) changeSuccess(false)
      }
      /*---------------------------------------*/

      /// Генерация колбека
      callback({type: typeCallback, value})
      return value
    },
    /*----------------------*/

    /// changeShowPassword - показать ли пароль
    changeShowPassword () { this.typeInput = this.typeInput === 'password' ? 'text' : 'password' },
    /*----------------------*/
  },
  created () {
    const {mask, mapMask} = this.$props
    if (mask !== '') {
      let lastString = '', maskSplit = [], indexEmpty = [], registerSymbols = []
      for (let i = 0; i < mask.length; i++) {
        if (!mapMask.hasOwnProperty(mask[i])) {
          lastString += mask[i]
        } else {
          lastString !== '' && maskSplit.push(lastString)
          registerSymbols.push(i)
          maskSplit.push(mask[i])
          indexEmpty.push(maskSplit.length - 1)
          lastString = ''
        }
      }
      lastString !== '' && maskSplit.push(lastString)
      this.maskSplit = maskSplit
      this.indexEmpty = indexEmpty
      this.registerSymbols = registerSymbols
    }
  },
  render (h) {
    const self = this
    const elementShowPassword = self.$props.mode === 'single' && self.$props.switchPasswordShow ? h(RadioInput, {
      props: {
        type: 'checkbox',
        signature: self.getTitle('form-btn-show-password'),
        callback: self.changeShowPassword
      }
    }) : null
    let elements = h('label', {
      class: {
        'label-input': true,
        'val': self.input,
        'error': self.error,
        'success': self.success
      }
    }, [
      h(InputsText, {
        props: {
          placeholder: self.$props.placeholder[0],
          type: self.$props.switchPasswordShow ? self.typeInput : self.$props.type,
          startValue: self.$props.startValue,
          maxSymbol: self.$props.mask.length,
          callback: self.checkOnChange
        }
      }),
      h(InputsSignature, {
        props: {
          signature: self.$props.signature[0]
        }
      })
    ])
    // Если нужно отобразить инпуты генерации пароля
    if (self.$props.mode === 'password-confirm') {
      elements = h(InputsPasswordConfirm, {
        props: {
          placeholder: self.$props.placeholder,
          signature: self.$props.signature,
          callback: self.$props.callback,
          onSuccess: self.onSuccess,
          onError: self.onError
        }
      })
    }
    // Если нужно отобразить инпуты генерации пароля - END
    return h('div', { class: 'normal-block' }, [
      elements,
      elementShowPassword
    ])
  }
}
