<template>
  <div class="container">
    <div class="normal-block margin-bottom margin-top">
      <div class="not-found">
        <NotFoundImage/>
        <div class="not-found-right">
          <h1><b>{{getTitle('page-not-found')}}</b></h1>
          <h3 v-html="getTitle('page-not-found-detail')"></h3>
          <router-link class="button border medium" :to="{ path: mainLink }">{{getTitle('go-home')}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import asyncMain from "../service/asyncMain";

    import NotFoundImage from "../components/NotFoundImage/NotFoundImage";

    export default {
        name: "NotFound",
        async asyncData (app) {
            await asyncMain(app)
        },
        computed: {
            /// mainLink - изменение языка
            mainLink () {
                if (this.$root.$route.params.hasOwnProperty('LANG')) {
                    return `/${this.$root.$route.params.LANG}`
                } else {
                    const split = this.$root.$route.fullPath.split('/')
                    return this.$root.$store.getters.HAS_LANGUAGE(split[1]) ? `/${split[1]}` : `/${this.$root.$store.getters.GET_DEFAULT_LANG}`
                }
            },
            /*----------------------*/
        },
        methods: {
            /// getTitle - получение системного сообщения в зависимости от языка
            getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
            /*----------------------*/
        },
        components: {
            NotFoundImage
        }
    }
</script>
