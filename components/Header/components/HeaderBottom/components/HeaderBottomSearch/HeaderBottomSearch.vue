<template>
  <div class="header-search">
    <input type="text" class="header-search-input" :placeholder="getTitle('search-placeholder')">
  </div>
</template>

<script>
    import './index.scss';

    export default {
        name: "HeaderBottomSearch",
        methods: {
            /// getTitle - получение системного сообщения в зависимости от языка
            getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
            /*----------------------*/
        }
    }
</script>
