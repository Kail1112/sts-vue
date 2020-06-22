import './index.scss';

import {findRoot} from '../../utils'

import {withNormalBlock} from '../Wrapper/';
import Inputs from "../Inputs/";

export default {
  name: 'FormsRegister',
  functional: true,
  render (h, context) {
    const root = findRoot(context)
    // Какие поля отрисовать
    const labels = [
      { placeholder: [root.getTitle('form-input-login')] },
      { placeholder: [root.getTitle('form-input-email')], type: 'email' },
      { placeholder: [root.getTitle('form-input-phone-number')], mask: '+DDD (DD) DDD-DD-DD', },
      { placeholder: [root.getTitle('form-input-generate-password'), root.getTitle('form-input-generate-password-repeat')], mode: 'password-confirm' }
    ]
    // render
    return h('form', {
      class: 'form login-form',
      on: {
        submit: (e) => {
          e.preventDefault()
        }
      }
    }, [
      h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, labels.map(label => h(Inputs, { props: label }))),
      h('button', { class: 'button full no-margin' }, root.getTitle('form-btn-register'))
    ])
  }
}
