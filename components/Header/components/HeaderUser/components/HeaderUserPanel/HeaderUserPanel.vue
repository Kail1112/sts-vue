<template>
  <PopUp :keyPopUp="'user-panel'"
         :btn="{tagName: 'div', className: 'header-btn__user'}"
         :event-add-elements="eventAddElements">
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

    <!-- Контент -->
    <template v-slot:body>
      <FormsLogin :has-register-btn="true"
                  :callback-click-register-btn="changeActiveTabUserPanel"/>
    </template>
    <!-- Контент - END -->
  </PopUp>
</template>

<script>
  import PopUp from "../../../../../PopUp/PopUp";
  import FormsLogin from "../../../../../Forms/FormsLogin";

  export default {
    name: "HeaderUserPanel",
    props: {
      eventAddElements: { type: Function, default: () => null }
    },
    methods: {
      /// changeActiveTabUserPanel - активный таб в лк пользователя
      changeActiveTabUserPanel (tab) {
        console.log(tab)
      },
      /*----------------------*/
    },
    components: {
      PopUp,
      FormsLogin
    },
  }
</script>
