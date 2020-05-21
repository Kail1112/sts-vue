<template>
  <div class="normal-block margin-bottom">
    <div class="normal-block margin-top margin-bottom">
      <h2>Карточки товаров <code><{{'ProductCard'}}/></code></h2>
      <h3>Вариант: Плитка</h3>
      <hr/>
    </div>
    <div class="normal-block margin-bottom">
      <div class="row">
        <div class="col-lg-5">
          <ProductCard :id="10"
                       :name="'Моноблок Avtech COMBO PC X6 Моноблок Avtech COMBO PC X6'"
                       :image="'https://sts.uz/image/cache/catalog/monobloki/x6-1000x1000.jpg'"
                       :price="5050000"
                       :old-price="6000000"
                       :short-info="['LCD 24 1920x1080 Full HD', 'CPU Intel Celeron® J1900 2.0 GHz 4 ядра', 'HDD 500GB Seagate, 2GB DDR3L/1600', 'USB 3.0 x2шт, USB 2.0 x2шт', 'LCD 24 1920x1080 Full HD', 'CPU Intel Celeron® J1900 2.0 GHz 4 ядра', 'HDD 500GB Seagate, 2GB DDR3L/1600', 'USB 3.0 x2шт, USB 2.0 x2шт']"/>
        </div>
        <div class="col-lg-5">
          <ProductCard :id="11"
                       :name="'Моноблок Avtech V8-H110/4400T LCD 23.8 / Windows 10'"
                       :image="'https://sts.uz/image/cache/catalog/monobloki/v8-1000x1000.jpg'"
                       :price="6550000"
                       :old-price="7000000"
                       :short-info="['LCD 23.8 IPS A+ 1920x1080 Full HD LCD 23.8 IPS A+ 1920x1080 Full HD LCD 23.8 IPS A+ 1920x1080 Full HD', ' S1151 Intel® Pentium Dual Core G4400Т 2.9 GHz', 'HDD 500GB Seagate', '4GB DDR4']"/>
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
