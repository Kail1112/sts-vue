import {withContainer} from '../../../Wrapper';

export default {
  name: 'FooterBottom',
  methods: {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/
  },
  render (h) {
    const self = this
    return h(withContainer, [
      h('div', { class: 'footer-bottom' }, [
        [['p', self.getTitle('copyright')], ['p', self.getTitle('date-copyright')]].map(item => {
          return h(item[0], item[1])
        })
      ])
    ])
  }
}
