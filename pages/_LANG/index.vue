<template>
  <div class="container">

  </div>
</template>

<script>
    import asyncMain from "../../service/asyncMain";

    export default {
        name: 'index',
        async asyncData (app) {
            await asyncMain(app)
        },
    }
</script>
