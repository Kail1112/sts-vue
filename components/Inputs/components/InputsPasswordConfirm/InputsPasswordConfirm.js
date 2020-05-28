import InputsText from "../InputsText/InputsText";
import InputsSignature from "../InputsSignature/InputsSignature";
import RadioInput from "../../../RadioInput/RadioInput";

export default {
  name: "InputsPasswordConfirm",
  data () {
    return {
      type: 'password',
      error: false,
      success: false,
      valueFirst: '', /// Запись в первом поле
      hasValueFirst: false, /// Есть ли запись в первом поле
      valueSecond: '', /// Запись в втором поле
      hasValueSecond: false /// Есть ли запись в втором поле
    }
  },
  props: {
    placeholder: { type: Array, default: () => ['Придумайте пароль', 'Повторите пароль']},
    signature: { type: Array, default: () => ['', '']},
    callback: { type: Function, default: () => null },
    onSuccess: { type: Function, default: () => null },
    onError: { type: Function, default: () => null }
  },
  methods: {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/

    /// onChange - функция изменения данных в полях
    onChange ({keyValue, keyHasChange, value}) {
      const alternativeKeyValue = keyValue === 'valueFirst' ? 'valueSecond' : 'valueFirst'
      const {callback, onSuccess, onError} = this.$props
      let typeCallback = 'undefined'
      this[keyHasChange] = value !== '';
      this[keyValue] = value
      if (value !== this[alternativeKeyValue]) {
        this.success = false
        this.error = true
        typeCallback = 'error'
        onError({type: typeCallback, value: {valueFirst: this['valueFirst'], valueSecond: this['valueSecond']}})
      } else {
        if (value !== '' || this[alternativeKeyValue] !== '') {
          this.success = true
          typeCallback = 'success'
          onSuccess({type: typeCallback, value: {valueFirst: this['valueFirst'], valueSecond: this['valueSecond']}})
        }
        this.error = false
      }
      callback({type: typeCallback, value: {valueFirst: this['valueFirst'], valueSecond: this['valueSecond']}})
    },
    /*----------------------*/

    /// onChangeFirst
    onChangeFirst (value) {
      this.onChange({keyValue: 'valueFirst', keyHasChange: 'hasValueFirst', value})
      return false
    },
    /*----------------------*/

    /// onChangeSecond
    onChangeSecond (value) {
      this.onChange({keyValue: 'valueSecond', keyHasChange: 'hasValueSecond', value})
      return false
    },
    /*----------------------*/

    /// onChangeShowPassword - функция смены отображения в полях
    onChangeShowPassword (checked) { this.type = checked ? 'text' : 'password' },
    /*----------------------*/

    /// classForLabels - установка нужных классов
    classForLabels: (value = false, success = false, error = false) => `label-input${value ? ' val' : ''}${error ? ' error' : ''}${success ? ' success' : ''}`,
    /*----------------------*/
  },
  render (h) {
    const self = this
    const password = h('label', {
      class: self.classForLabels(self.hasValueFirst, self.success, self.error)
    }, [
      h(InputsText, {
        props: {
          placeholder: self.$props.placeholder[0],
          type: self.type,
          callback: self.onChangeFirst
        }
      })
    ])
    const confirmPassword = h('label', {
      class: self.classForLabels(self.hasValueSecond, self.success, self.error)
    }, [
      h(InputsText, {
        props: {
          placeholder: self.$props.placeholder[1],
          type: self.type,
          callback: self.onChangeSecond
        }
      })
    ])
    return h('div', { class: 'normal-block' }, [
      password,
      confirmPassword,
      h(RadioInput, {
        props: {
          type: 'checkbox',
          signature: self.getTitle('form-btn-show-password'),
          callback: self.onChangeShowPassword
        }
      })
    ])
  }
}
