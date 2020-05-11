<template>
  <form class="form login-form" @submit="onSubmit">
    <div class="normal-block margin-bottom">
      <Inputs :placeholder="['Логин']"/>
      <Inputs :placeholder="['E-mail']"
              :type="'email'"/>
      <Inputs :placeholder="['Введите номер телефона']"
              :mask="'+DDD (DD) DDD-DD-DD'"/>
      <Inputs :mode="'password-confirm'" :placeholder="['Придумайте пароль', 'Повторите пароль']"/>
    </div>
    <button class="button full no-margin">Зарегистрироваться</button>
  </form>
</template>

<script>
  import './index.scss';

  import Inputs from "../Inputs/Inputs";

  export default {
    name: "FormsRegister",
    methods: {
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
