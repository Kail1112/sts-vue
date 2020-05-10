<template>
  <div class="normal-block">
    <form class="form login-form">
      <Inputs :placeholder="['Логин']"/>
      <Inputs :type="'text'" :placeholder="['Пароль']"/>
    </form>
  </div>
</template>

<script>
    import './forms-login.scss';

    import Inputs from "../Inputs/Inputs";

    export default {
        name: "FormsLogin",
        components: {
            Inputs
        }
    }
</script>
