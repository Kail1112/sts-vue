<template>
  <PopUp :keyPopUp="'user-panel'"
         :btn="{tagName: 'div', className: 'header-btn__user'}"
         :event-add-elements="eventAddElements"
         :init-calc="callbackOnChangeTab">
    <!-- Кнопка -->
    <template v-slot:btn>
      <p class="text">
        <small>
          <button>Авторизация</button> | <button>Регистрация</button>
        </small>
      </p>
      <p class="sts-icon sts-iconuser"></p>
      <p class="sts-icon sts-iconarrow-bottom"></p>
    </template>
    <!-- Кнопка - END -->

    <!-- Шапка попапа -->
    <template v-slot:top>
      <transition name="fade" tag="div" :css="true" @before-enter="changeNowTab">
        <div class="popup-top animation-item" v-if="activeTab === 'register'" :key="'register-tab-form'">
          <button class="popup-top__left" @click="backToLogin">
            <span class="sts-icon sts-iconarrow-left"></span>
          </button>
          <h3>Регистрация</h3>
          <button class="popup-top__right" @click="closeAllPopup">
            <span class="sts-icon sts-iconclose"></span>
          </button>
        </div>
      </transition>
    </template>
    <!-- Шапка попапа - end -->

    <!-- Контент -->
    <template v-slot:body>

      <transition name="fade" tag="div" :css="true" @before-enter="changeNowTab">
        <div class="animation-item" v-if="activeTab === 'login'" :key="'login-tab-form'">
          <FormsLogin :has-register-btn="true"
                      :callback-click-register-btn="changeActiveTabUserPanel"/>
        </div>
        <div class="animation-item" v-if="activeTab === 'register'" :key="'register-tab-form'">
          <FormsRegister/>
        </div>
      </transition>

    </template>
    <!-- Контент - END -->

  </PopUp>
</template>

<script>
  import PopUp from "../../../../../PopUp/PopUp";
  import FormsLogin from "../../../../../Forms/FormsLogin";
  import FormsRegister from "../../../../../Forms/FormsRegister";

  const getDefaultLayout = import('~/utils/get-default-layout.js')

  export default {
    name: "HeaderUserPanel",
    data () {
      return {
        activeTab: 'login',
        callbackOnChangeTab: {status: false, callback: (status) => null}
      }
    },
    props: {
      eventAddElements: { type: Function, default: () => null }
    },
    methods: {
      /// changeNowTab
      changeNowTab () {
        const callback = (status) => {
          if (status) {
            this.callbackOnChangeTab = {status: false, callback: (status) => null}
          }
        }
        this.callbackOnChangeTab = {status: true, callback}
      },
      /*----------------------*/

      /// changeActiveTabUserPanel - активный таб в лк пользователя
      changeActiveTabUserPanel (tab) {
        if (this.activeTab !== tab)
          this.activeTab = tab
      },
      /*----------------------*/

      /// backToLogin
      backToLogin () {
        if (this.activeTab !== 'login')
          this.activeTab = 'login'
      },
      /*----------------------*/

      /// closeAllPopup
      closeAllPopup () {
        getDefaultLayout.then(async res => {
          const parent = res.default(this.$root, 'class', 'main')
          if (parent !== undefined) {
            if (parent.closeAllPopUp ?? false) {
              parent.closeAllPopUp()
              if (this.activeTab !== 'login') this.activeTab = 'login'
            }
          }
        })
      },
      /*----------------------*/
    },
    components: {
      PopUp,
      FormsLogin,
      FormsRegister
    },
    mounted() {
      console.log(this.activeTab)
    }
  }
</script>
