import './index.scss';

import {withContainer} from "../../../Wrapper/";
import HeaderUserPanel from "./components/HeaderUserPanel/HeaderUserPanel";
import Select from "../../../Select/Select";

export default {
  name: 'HeaderTop',
  data () {
    return {
      lang: [
        { id: 0, short: 'ru', value: 'russian' },
        { id: 1, short: 'en', value: 'english' }
      ]
    }
  },
  computed: {
    /// getLangArray - получение списка языков
    getLangArray () {
      const {lang, getTitle} = this
      const curLang = this.$root.$store.getters.GET_SYSTEM_LANG
      return lang.reduce((acc, item, index) => {
        let cloneItem = {...item}
        const {short, value} = cloneItem
        cloneItem['value'] = getTitle(value)
        cloneItem['type'] = 'normal'
        cloneItem['name'] = `header-select-lang-system-${index + 1}`
        if (short === curLang) {
          acc = [cloneItem, ...acc]
        } else {
          acc.push(cloneItem)
        }
        return acc
      }, [])
    },
    /*----------------------*/
  },
  methods: {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/

    /// changeLang - изменение языка
    changeLang (param) {
      if (param.val[0] !== undefined) {
        const {getTitle} = this
        const el = this.lang.find(el => getTitle(el.value) === param.val[0])
        if (el !== undefined) {
          let link = `/${el.short}`
          if (this.$root.$route.params.hasOwnProperty('LANG')) {
            link = `/${el.short}/${this.$root.$route.fullPath.split('/').slice(2).join('/')}`
          } else {
            const splitPath = this.$root.$route.fullPath.split('/').slice(1)
            if (this.$root.$store.getters.HAS_LANGUAGE(splitPath[0])) {
              splitPath[0] = el.short
              link = `/${splitPath.join('/')}`
            }
          }
          this.$root.$router.push({ path: link })
        }
      }
    },
    /*----------------------*/
  },
  render (h) {
    const self = this
    // Выбор языка
    const chooseLang = h('div', { class: 'col-auto' }, [
      h('div', { class: 'header-top-lang' }, [
        h(Select, {
          props: {
            id: 'header-select-lang-system',
            placeholder: `<b>${self.getTitle('lang')}:</b>`,
            values: self.getLangArray,
            moreClass: 'select-simple',
            closeOnClick: true,
            startValue: 0,
            callback: self.changeLang
          }
        })
      ])
    ])
    // ЛК|Авторизация
    const userPanel = h(HeaderUserPanel)
    // Кнопка сравнения
    const btnComparison = h('button', { class: 'header-btn' }, [
      h('span', { class: 'sts-icon sts-iconchart-bar' })
    ])
    // render
    return h('div', { class: 'header-top' }, [
      h(withContainer, [
        h('div', { class: 'header-top-wrapper' }, [
          h('div', { class: 'row justify-space-between align-items-center' }, [
            chooseLang,
            h('div', { class: 'col-auto' }, [
              h('div', { class: 'header-top-buttons' }, [
                userPanel,
                btnComparison
              ])
            ])
          ])
        ])
      ])
    ])
  }
}
