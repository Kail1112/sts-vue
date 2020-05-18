<template>
  <div class="normal-block">
    <div class="normal-block">
      <h2>Карточки товаров</h2>
      <hr/>
    </div>
    <div class="normal-block margin-bottom">
      <div class="row">
        <div class="col-5">
          <ProductCard :id="10"/>
        </div>
        <div class="col-5">
          <ProductCard :id="10"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import ProductCard from "../components/ProductCard/ProductCard";

    export default {
        name: "DemonstrationCardProduct",
        components: {
            ProductCard
        }
    }
</script>

<style scoped>

</style>
