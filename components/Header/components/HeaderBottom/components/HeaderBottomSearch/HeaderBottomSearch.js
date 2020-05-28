import './index.scss';

export default {
  name: "HeaderBottomSearch",
  methods: {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/
  },
  render (h) {
    const self = this
    return h('div', { class: 'header-search' }, [
      h('input', { attrs: { type: 'text', placeholder: self.getTitle('search-placeholder') }, class: 'header-search-input' })
    ])
  }
}
