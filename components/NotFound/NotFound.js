import './index.scss';

import NotFoundImage from "./components/NotFoundImage/NotFoundImage";

export default {
  name: "NotFound",
  computed: {
    /// mainLink - изменение языка
    mainLink () {
      if (this.$root.$route.params.hasOwnProperty('LANG')) {
        return `/${this.$root.$route.params.LANG}`
      } else {
        const split = this.$root.$route.fullPath.split('/')
        return this.$root.$store.getters.HAS_LANGUAGE(split[1]) ? `/${split[1]}` : `/${this.$root.$store.getters.GET_DEFAULT_LANG}`
      }
    },
    /*----------------------*/
  },
  methods: {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/
  },
  components: {
    NotFoundImage
  },
  render (h) {
    const self = this
    return h('div', { class: 'normal-block margin-bottom margin-top' }, [
      h('div', { class: 'not-found' }, [
        h(NotFoundImage),
        h('div', { class: 'not-found-right' }, [
          h('h1', [h('b', self.getTitle('page-not-found'))]),
          h('h3', {
            domProps: {
              innerHTML: self.getTitle('page-not-found-detail')
            }
          }),
          h('router-link', {
            class: 'button border medium',
            props: {
              to: { path: self.mainLink }
            }
          }, self.getTitle('go-home'))
        ])
      ])
    ])
  }
}
