import './index.scss';

import {withNormalBlock} from '../Wrapper/';
import Inputs from "../Inputs/Inputs";

export default {
  name: 'FormsRegister',
  methods: {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/

    /// onSubmit
    onSubmit (e) {
      e.preventDefault()
    },
    /*----------------------*/
  },
  components: {
    Inputs
  },
  render (h) {
    const self = this
    // Какие поля отрисовать
    const labels = [
      { placeholder: [self.getTitle('form-input-login')] },
      { placeholder: [self.getTitle('form-input-email')], type: 'email' },
      { placeholder: [self.getTitle('form-input-phone-number')], mask: '+DDD (DD) DDD-DD-DD', },
      { placeholder: [self.getTitle('form-input-generate-password'), self.getTitle('form-input-generate-password-repeat')], mode: 'password-confirm' }
    ]
    // render
    return h('form', {
      class: 'form login-form',
      on: { submit: self.onSubmit }
    }, [
      h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, labels.map(label => h(Inputs, { props: label }))),
      h('button', { class: 'button full no-margin' }, self.getTitle('form-btn-register'))
    ])
  }
}
