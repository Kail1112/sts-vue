<template>
  <PopUp :keyPopUp="'user-panel'" :btn="{tagName: 'div', className: 'header-btn__user'}">
    {{/* Кнопка */}}
    <template v-slot:btn>
      <p class="text">
        <small>
          <button>Авторизация</button> | <button>Регистрация</button>
        </small>
      </p>
      <p class="sts-icon sts-iconuser"></p>
      <p class="sts-icon sts-iconarrow-bottom"></p>
    </template>
    {{/* Кнопка - END */}}

    {{/* Контент */}}
    <template v-slot:inner>
      <PopUpHolder>
        <transition name="fade"
                    @before-enter="tabBeforeEnter"
                    @enter="tabEnter">
          {{/* Таб авторизации */}}
          <div class="animation-item" v-if="activeTab === 'login'" :key="'login-tab-form'">
            <PopUpBody :scrolled="scrollBody"
                       :moreClass="'small'">
              <FormsLogin :has-register-btn="true"
                          :callback-click-register-btn="changeActiveTabUserPanel"/>
            </PopUpBody>
          </div>
          {{/* Таб авторизации - END */}}

          {{/* Таб регистрации */}}
          <div class="animation-item" v-if="activeTab === 'register'" :key="'register-tab-form'">
            <PopUpTop :title="'Регистрация'"
                      :has-close-btn="true"
                      :has-back-btn="true"
                      :back-btn-function="backToLogin"/>
            <PopUpBody :scrolled="scrollBody"
                       :moreClass="'medium has-top'">
              <FormsRegister/>
            </PopUpBody>
          </div>
          {{/* Таб регистрации - END */}}
        </transition>
      </PopUpHolder>
    </template>
    {{/* Контент - END */}}
  </PopUp>
</template>

<script>
    import PopUp from "../../../../../PopUp/PopUp";
    import PopUpHolder from "../../../../../PopUp/components/PopUpHolder/PopUpHolder";
    import PopUpBody from "../../../../../PopUp/components/PopUpBody/PopUpBody";
    import PopUpTop from "../../../../../PopUp/components/PopUpTop/PopUpTop";
    import FormsLogin from "../../../../../Forms/FormsLogin";
    import FormsRegister from "../../../../../Forms/FormsRegister";

    export default {
        name: "HeaderUserPanel",
        data () {
            return {
                activeTab: 'login',
                scrollBody: true
            }
        },
        methods: {
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
        },
        components: {
            PopUp,
            PopUpHolder,
            PopUpBody,
            PopUpTop,
            FormsLogin,
            FormsRegister
        }
    }
</script>
