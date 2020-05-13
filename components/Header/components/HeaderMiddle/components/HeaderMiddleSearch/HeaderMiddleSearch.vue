<template>
  <div class="header-search">
    <button class="header-search__btn">
      <span class="sts-icon sts-iconsearch"></span>
      <span class="text">{{getTitle('search-title')}}</span>
      <span class="text">{{getTitle('search-sub-title')}}</span>
    </button>
  </div>
</template>

<script>
    import './index.scss';

    export default {
        name: "HeaderMiddleSearch",
        methods: {
            /// getTitle - получение системного сообщения в зависимости от языка
            getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
            /*----------------------*/
        }
    }
</script>
