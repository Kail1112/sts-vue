<template>
  <div class="header-bottom">
    <div class="container">
      <div class="header-bottom-wrapper">
        <div class="row justify-space-between align-items-center">
          {{/* catalog */}}
          <div class="col-xxl-5 col-xl-6">
            <HeaderBottomCatalog/>
          </div>
          {{/* catalog - END */}}

          <div class="col-xxl-14 col-xl-12">
            <HeaderBottomSearch/>
          </div>

          {{/* cart */}}
          <div class="col-xxl-5 col-xl-6">
            <HeaderBottomCart/>
          </div>
          {{/* cart - END */}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import './index.scss';

    import HeaderBottomCatalog from "./components/HeaderBottomCatalog/HeaderBottomCatalog";
    import HeaderBottomSearch from "./components/HeaderBottomSearch/HeaderBottomSearch";
    import HeaderBottomCart from "./components/HeaderBottomCart/HeaderBottomCart";

    export default {
        name: "HeaderBottom",
        components: {
            HeaderBottomCatalog,
            HeaderBottomSearch,
            HeaderBottomCart
        }
    }
</script>
