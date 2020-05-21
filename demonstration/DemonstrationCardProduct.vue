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
    <div class="normal-block margin-top margin-bottom">
      <h2>Выпадающие списки <code><{{'Select'}}/></code></h2>
      <h3>Вариант: default</h3>
      <hr/>
    </div>
    <div class="normal-block margin-bottom">
      <div class="row">
        <div class="col-md-8">
          <Select :id="'test-select-1'"
                  :placeholder="'Тестовое поле №1'"
                  :values="[
                    { id: 0, value: 'Тестовое значение №1', type: 'normal', name: 'test-select-1' },
                    { id: 1, value: 'Тестовое значение №2', type: 'normal', name: 'test-select-2' },
                    { id: 2, value: 'Тестовое значение №3', type: 'normal', name: 'test-select-3' },
                    { id: 3, value: 'Тестовое значение №4', type: 'normal', name: 'test-select-4' },
                    { id: 4, value: 'Тестовое значение №5', type: 'normal', name: 'test-select-5' }
                  ]" :callback="test"
                  :start-value="0"/>
        </div>
        <div class="col-md-8">
          <Select :id="'test-select-2'"
                  :placeholder="'Тестовое поле №2'"
                  :values="[
                    { id: 0, value: 'Тестовое значение №6', type: 'checkbox', name: 'test-select-6' },
                    { id: 1, value: 'Тестовое значение №7', type: 'checkbox', name: 'test-select-7' },
                    { id: 2, value: 'Тестовое значение №8', type: 'checkbox', name: 'test-select-8' },
                    { id: 3, value: 'Тестовое значение №9', type: 'checkbox', name: 'test-select-9' },
                    { id: 4, value: 'Тестовое значение №10', type: 'checkbox', name: 'test-select-10' }
                  ]" :callback="test"
                  :start-value="0"/>
        </div>
        <div class="col-md-8">
          <Select :id="'test-select-3'"
                  :placeholder="'Тестовое поле №3'"
                  :values="[
                    { id: 0, value: 'Тестовое значение №11', type: 'radio', name: 'test-select-11' },
                    { id: 1, value: 'Тестовое значение №12', type: 'radio', name: 'test-select-11' },
                    { id: 2, value: 'Тестовое значение №13', type: 'radio', name: 'test-select-11' },
                    { id: 3, value: 'Тестовое значение №14', type: 'radio', name: 'test-select-11' },
                    { id: 4, value: 'Тестовое значение №15', type: 'radio', name: 'test-select-11' }
                  ]" :callback="test"
                  :start-value="0"/>
        </div>
        <div class="col-md-8">
          <Select :id="'test-select-4'"
                  :placeholder="'Все типы в одном месте'"
                  :values="[
                    { id: 1, value: 'Тестовое значение №17', type: 'checkbox', name: 'test-select-13' },
                    { id: 2, value: 'Тестовое значение №18', type: 'checkbox', name: 'test-select-14' },
                    { id: 0, value: 'Тестовое значение №16', type: 'normal', name: 'test-select-12' },
                    { id: 3, value: 'Тестовое значение №19', type: 'radio', name: 'test-select-15' },
                    { id: 4, value: 'Тестовое значение №20', type: 'radio', name: 'test-select-15' }
                  ]" :callback="test"
                  :start-value="0"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductCard from "../components/ProductCard/ProductCard";
  import Select from "../components/Select/Select";

  export default {
    name: "DemonstrationCardProduct",
    methods: {
      test (args) {
        console.log(args)
      }
    },
    components: {
      ProductCard,
      Select
    }
  }
</script>

<style scoped>

</style>
