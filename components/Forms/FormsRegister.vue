<template>
  <form class="form login-form" @submit="onSubmit">
    <div class="normal-block margin-bottom">
      <Inputs :placeholder="[getTitle('form-input-login')]"/>
      <Inputs :placeholder="[getTitle('form-input-email')]"
              :type="'email'"/>
      <Inputs :placeholder="[getTitle('form-input-phone-number')]"
              :mask="'+DDD (DD) DDD-DD-DD'"/>
      <Inputs :mode="'password-confirm'" :placeholder="[getTitle('form-input-generate-password'), getTitle('form-input-generate-password-repeat')]"/>
    </div>
    <button class="button full no-margin">{{getTitle('form-btn-register')}}</button>
  </form>
</template>

<script>
    import './index.scss';

    import Inputs from "../Inputs/Inputs";

    export default {
        name: "FormsRegister",
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
        },
        components: {
            Inputs
        }
    }
</script>

<style scoped>

</style>
