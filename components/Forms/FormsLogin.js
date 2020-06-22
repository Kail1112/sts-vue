import {findRoot} from '../../utils'
import {withNormalBlock} from '../Wrapper'

import Inputs from '../Inputs/';

export default {
  name: 'FormsLogin',
  functional: true,
  props: {
    hasRegisterBtn: { type: Boolean, default: false },
    callbackClickRegisterBtn: { type: Function, default: () => null }
  },
  render (h, context) {
    const root = findRoot(context)
    // Переключение таба на регистрацию
    const onClickRegister = (e, props) => props.callbackClickRegisterBtn('register')
    // Поле ввода логина
    const labelLogin = h(Inputs, {
      props: { placeholder: [root.getTitle('form-input-login')] }
    })
    // Поле ввода пароля
    const labelPassword = h(Inputs, {
      props: {
        switchPasswordShow: true,
        type: 'password',
        placeholder: [root.getTitle('form-input-password')]
      }
    })
    // Кнопка смены таба
    const btnRegister = context.props.hasRegisterBtn ? h('div', { class: 'col-auto' }, [
      h('span', {
        class: 'button no-margin',
        on: { click: e => onClickRegister(e, context.props) }
      }, root.getTitle('form-btn-register'))
    ]) : null
    // Кнопка аторизации
    const btnAuth = h('div', { class: 'col-auto' }, [
      h('button', { class: 'button no-margin' }, root.getTitle('from-btn-login'))
    ])
    // render
    return h(withNormalBlock, [
      h('form', {
        class: 'form login-form',
        on: {
          submit: (e) => {
            e.preventDefault()
          }
        }
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
