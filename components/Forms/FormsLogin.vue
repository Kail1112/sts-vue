<template>
  <div class="normal-block">
    <form class="form login-form"
          @submit="onSubmit">
      <Inputs :placeholder="['Логин']"/>
      <Inputs :switch-password-show="true"
              :type="'text'"
              :placeholder="['Пароль']"/>
      <div class="normal-block">
        <div class="row row-small justify-space-between">
          <div class="col-auto">
            <button class="button">Войти</button>
          </div>
          <div v-if="hasRegisterBtn" class="col-auto">
            <span class="button border"
                  @click="onClickRegister">Зарегистрироваться</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import './index.scss';

  import Inputs from "../Inputs/Inputs";

  export default {
    name: "FormsLogin",
    props: {
      hasRegisterBtn: { type: Boolean, default: false },
      callbackClickRegisterBtn: { type: Function, default: () => null }
    },
    methods: {
      /// onSubmit
      onSubmit (e) {
        e.preventDefault()
        console.log(e)
      },
      /*----------------------*/

      /// onClickRegister
      onClickRegister () {
        this.$props.callbackClickRegisterBtn('register')
      },
      /*----------------------*/
    },
    components: {
      Inputs
    }
  }
</script>
