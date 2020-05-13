<template>
  <div class="normal-block">
    <form class="form login-form"
          @submit="onSubmit">
      <Inputs :placeholder="[getTitle('form-input-login')]"/>
      <Inputs :switch-password-show="true"
              :type="'text'"
              :placeholder="[getTitle('form-input-password')]"/>
      <div class="normal-block">
        <div class="row row-small justify-space-between">
          <div class="col-auto">
            <button class="button no-margin">{{getTitle('from-btn-login')}}</button>
          </div>
          <div v-if="hasRegisterBtn" class="col-auto">
            <span class="button border no-margin"
                  @click="onClickRegister">{{getTitle('form-btn-register')}}</span>
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
            /// getTitle - получение системного сообщения в зависимости от языка
            getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
            /*----------------------*/

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
