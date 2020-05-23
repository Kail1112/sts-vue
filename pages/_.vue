<template>
  <div class="normal-block margin-bottom margin-top">
    <div class="not-found">
      <h2>404</h2>
      <h3>Страница не найдена</h3>
    </div>
  </div>
</template>

<script>
    import asyncMain from "../service/asyncMain";

    export default {
        name: "NotFound",
        async asyncData (app) {
            await asyncMain(app)
        },
    }
</script>
