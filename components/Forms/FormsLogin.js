import {withNormalBlock} from '../Wrapper'

import Inputs from '../Inputs/Inputs';

export default {
  name: 'FormsLogin',
  props: {
    hasRegisterBtn: { type: Boolean, default: false },
    callbackClickRegisterBtn: { type: Function, default: () => null }
  },
  methods: {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/

    /// onSubmit
    onSubmit (e) {
      e.preventDefault()
    },
    /*----------------------*/

    /// onClickRegister
    onClickRegister () { this.$props.callbackClickRegisterBtn('register') },
    /*----------------------*/
  },
  components: {
    Inputs
  },
  render (h) {
    const self = this
    // Поле ввода логина
    const labelLogin = h(Inputs, {
      props: { placeholder: [self.getTitle('form-input-login')] }
    })
    // Поле ввода пароля
    const labelPassword = h(Inputs, {
      props: {
        switchPasswordShow: true,
        type: 'password',
        placeholder: [self.getTitle('form-input-password')]
      }
    })
    // Кнопка смены таба
    const btnRegister = self.$props.hasRegisterBtn ? h('div', { class: 'col-auto' }, [
      h('span', {
        class: 'button no-margin',
        on: { click: self.onClickRegister }
      }, self.getTitle('form-btn-register'))
    ]) : null
    // Кнопка аторизации
    const btnAuth = h('div', { class: 'col-auto' }, [
      h('button', { class: 'button no-margin' }, self.getTitle('from-btn-login'))
    ])
    // render
    return h(withNormalBlock, [
      h('form', {
        class: 'form login-form',
        on: { submit: self.onSubmit }
      }, [
        labelLogin,
        labelPassword,
        h(withNormalBlock, [
          h('div', { class: 'row row-small justify-space-between' }, [
            btnAuth,
            btnRegister
          ])
        ])
      ])
    ])
  }
}
