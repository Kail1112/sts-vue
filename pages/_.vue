<template>
  <div class="container">
    <NotFound/>
  </div>
</template>

<script>
    import asyncMain from "../service/asyncMain";

    import NotFound from "../components/NotFound/NotFound";

    export default {
        name: "NotFoundPage",
        async asyncData (app) {
            await asyncMain(app)
        },
        components: {
            NotFound
        }
    }
</script>
