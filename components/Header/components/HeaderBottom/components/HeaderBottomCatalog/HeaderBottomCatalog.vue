<template>
  <div class="header-catalog">
    <button class="header-catalog-btn">
      <span class="sts-icon sts-iconmenu"></span>
      <span class="text">{{getTitle('catalog-title')}}</span>
      <span class="text">{{getTitle('catalog-header-btn')}}</span>
    </button>
  </div>
</template>

<script>
  import './index.scss';

  export default {
    name: "HeaderBottomCatalog",
    methods: {
      /// getTitle - получение системного сообщения в зависимости от языка
      getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
      /*----------------------*/
    }
  }
</script>
