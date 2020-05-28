import './index.scss';

export default {
  name: "PopUpTop",
  props: {
    title: { type: String, default: '' },
    hasBackBtn: { type: Boolean, default: false }, /// нужно ли отображать кнопку возврата
    backBtnFunction: { type: Function, default: () => null }, /// функция которая будет вызывать по нажатию на кнопку возврата
    hasCloseBtn: { type: Boolean, default: false }, /// нужно ли отображать кнопку закрытия
    closeBtnFunction: { type: Function, default: () => null } /// функция которая так-же будет вызвана с закрытие попапа
  },
  methods: {
    /// goBack - вернуться обратно
    goBack () { this.$props.backBtnFunction() },
    /*----------------------*/

    /// closePopUp - закрытие попапов
    closePopUp () {
      this.$root.$store.dispatch('changePopUoOpen', '')
      this.$props.closeBtnFunction()
    },
    /*----------------------*/
  },
  mounted () {
    const refs = this.$refs,
      checkTitle = refs['popup-title'] ?? undefined,
      checkTop = refs['popup-top'] ?? undefined;
    (checkTitle !== undefined && checkTop !== undefined) && (checkTitle.style.maxWidth = `${checkTop.clientWidth}px`)
  },
  render (h) {
    const self = this
    // Кнопка step back
    const btnStepBack = self.$props.hasBackBtn ? h('button', { class: 'popup-top__left', on: { click: self.goBack } }, [ h('span', { class: 'sts-icon sts-iconarrow-left' }) ]) : null
    // Заголовок попапа
    const title = self.$props.title !== '' ? h('h3', { ref: 'popup-title' }, self.$props.title) : null
    // Кнопка закрытия
    const btnClose = self.$props.hasCloseBtn ? h('button', { class: 'popup-top__right', on: { click: self.closePopUp } }, [ h('span', { class: 'sts-icon sts-iconclose' }) ]) : null
    // render
    return h('div', { class: 'popup-top', ref: 'popup-top' }, [btnStepBack, title, btnClose])
  }
}
