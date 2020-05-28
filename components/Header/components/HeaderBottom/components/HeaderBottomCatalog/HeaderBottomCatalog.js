import './index.scss';

export default {
  name: "HeaderBottomCatalog",
  methods: {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/
  },
  render (h) {
    const self = this
    return h('div', { class: 'header-catalog' }, [
      h('button', { class: 'header-catalog-btn' }, [
        h('span', { class: 'sts-icon sts-iconmenu' }),
        h('span', { class: 'text' }, self.getTitle('catalog-title')),
        h('span', { class: 'text' }, self.getTitle('catalog-header-btn'))
      ])
    ])
  }
}
