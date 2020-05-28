import PopUp from "../../../../../PopUp/PopUp";
import PopUpHolder from "../../../../../PopUp/components/PopUpHolder/PopUpHolder";
import PopUpBody from "../../../../../PopUp/components/PopUpBody/PopUpBody";
import PopUpTop from "../../../../../PopUp/components/PopUpTop/PopUpTop";
import FormsLogin from "../../../../../Forms/FormsLogin";
import FormsRegister from "../../../../../Forms/FormsRegister";

export default {
  name: 'HeaderUserPanel',
  data () {
    return {
      activeTab: 'login',
      scrollBody: true
    }
  },
  methods: {
    /// getTitle - получение системного сообщения в зависимости от языка
    getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
    /*----------------------*/

    /// tabBeforeEnter
    tabBeforeEnter () { this.scrollBody === true && (this.scrollBody = false) },
    /*----------------------*/

    /// tabBeforeEnter
    tabEnter () { this.scrollBody === false && (this.scrollBody = true) },
    /*----------------------*/

    /// changeActiveTabUserPanel - активный таб в лк пользователя
    changeActiveTabUserPanel (tab) { this.activeTab !== tab && (this.activeTab = tab) },
    /*----------------------*/

    /// backToLogin
    backToLogin () { this.activeTab !== 'login' && (this.activeTab = 'login') },
    /*----------------------*/

    /// removeOverflow
    setOverflow () { !this.$root.$store.getters.GET_NOW_OVERFLOW && this.$root.$store.dispatch('changeOverflow', true) },
    /*----------------------*/

    /// removeOverflow
    removeOverflow () { this.$root.$store.getters.GET_NOW_OVERFLOW && this.$root.$store.dispatch('changeOverflow', false) }
    /*----------------------*/
  },
  render (h) {
    const self = this
    // Кнопка
    const btn = h('template', { slot: 'btn' }, [
      h('p', { class: 'text' }, [
        h('button', self.getTitle('form-auth')),
        ' | ',
        h('button', self.getTitle('form-register'))
      ]),
      h('p', { class: 'sts-icon sts-iconuser' }),
      h('p', { class: 'sts-icon sts-iconarrow-bottom' })
    ])
    // Таб авторизации
    const tabLogin = self.activeTab === 'login' ? h('div', { class: 'animation-item', key: 'login-tab-form' }, [
      h(PopUpTop, { props: { title: self.getTitle('form-auth'), hasCloseBtn: true, closeBtnFunction: self.removeOverflow } }),
      h(PopUpBody, { props: { scrolled: self.scrollBody, moreClass: 'small has-top' } }, [
        h(FormsLogin, { props: { hasRegisterBtn: true, callbackClickRegisterBtn: self.changeActiveTabUserPanel } })
      ])
    ]) : null
    // Таб регистрации
    const tabRegister = self.activeTab === 'register' ? h('div', { class: 'animation-item', props: { key: 'register-tab-form' } }, [
      h(PopUpTop, { props: { title: self.getTitle('form-register'), hasCloseBtn: true, closeBtnFunction: self.removeOverflow, hasBackBtn: true, backBtnFunction: self.backToLogin } }),
      h(PopUpBody, { props: { scrolled: self.scrollBody, moreClass: 'medium has-top' } }, [
        h(FormsRegister)
      ])
    ]) : null
    // Content
    const content = h('template', { slot: 'inner' }, [
      h(PopUpHolder, [
        h('transition', { props: { name: 'fade' }, on: { 'before-enter': self.tabBeforeEnter, 'enter': self.tabEnter } }, [
          tabLogin,
          tabRegister
        ])
      ])
    ])
    // render
    return h(PopUp, { props: { keyPopUp: 'user-panel', btn: {tagName: 'div', className: 'header-btn__user'}, functionOnOpen: self.setOverflow } }, [
      btn,
      content
    ])
  }
}
