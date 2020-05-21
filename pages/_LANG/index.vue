<template>
  <div class="container">
    <router-link :to="{ path: '/' }">ru</router-link>
    <DemonstrationCardProduct/>
  </div>
</template>

<script>
  import asyncMain from "../../service/asyncMain";

  import DemonstrationCardProduct from "../../demonstration/DemonstrationCardProduct";

  export default {
    name: "index",
    async asyncData (app) {
      await asyncMain(app)
    },
    components: {
      DemonstrationCardProduct
    }
  }
</script>
