<template>
  <div class="normal-block">
    <HeaderSystem/>
    <HeaderUser/>
  </div>
</template>

<script>
    import HeaderSystem from "../HeaderSystem/HeaderSystem";
    import HeaderUser from "../HeaderUser/HeaderUser";

    export default {
        name: "HeaderRight",
        components: {
            HeaderSystem,
            HeaderUser
        }
    }
</script>
