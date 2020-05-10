<template>
  <footer class="footer">
    <!-- footer top -->
    <div class="footer-top">
      <div class="container">
        <div class="row row-margin justify-space-between">
          <!-- Левая часть -->
          <div class="col-lg-12">
            <div class="row justify-space-between">
              <div class="col-auto">
                <FooterLinksGroup :title="'Информация:'"
                                  :links="[
                                    {path: '#', name: 'Наш адрес'},
                                    {path: '#', name: 'О нас'},
                                    {path: '#', name: 'Оплата'},
                                    {path: '#', name: 'Рассрочка'},
                                    {path: '#', name: 'Публичная оферта'}
                                  ]"/>
              </div>
              <div class="col-auto">
                <FooterLinksGroup :title="'Дополнительно:'"
                                  :links="[
                                    {path: '#', name: 'Производители'},
                                    {path: '#', name: 'Связаться с нами'},
                                    {path: '#', name: 'Карта сайта'}
                                  ]"/>
              </div>
              <div class="col-auto">
                <FooterLinksGroup :title="'Помощь:'"
                                  :links="[
                                    {path: '#', name: 'Узнать свой ИНН'},
                                    {path: '#', name: 'Узнать о UNIRED'}
                                  ]"/>
              </div>
            </div>
          </div>
          <!-- Левая часть - END -->
          <!-- Правая часть -->
          <div class="col-lg-12">
            <div class="row">
              <div class="col">
                <h3 class="color-white text-align-right">Способы оплаты:</h3>
                <div class="row justify-end">
                  <div class="col-auto">
                    <img src="~/assets/images/payments/click.png" alt="">
                  </div>
                  <div class="col-auto">
                    <img src="~/assets/images/payments/payme1.png" alt="">
                  </div>
                  <div class="col-auto">
                    <img src="~/assets/images/payments/unired.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Правая часть - END -->
        </div>
      </div>
    </div>
    <!-- footer top - END -->
    <!-- footer bottom -->
    <div class="container">
      <div class="footer-bottom">
        <p>Все права защищены. Указанная стоимость товаров и условия их приобретения действительны по состоянию на текущую дату.</p>
        <p>Smart Technology Service © 2020</p>
      </div>
    </div>
    <!-- footer bottom - END -->
  </footer>
</template>

<script>
    import './index.scss';

    import FooterLinksGroup from "./components/FooterLinksGroup/FooterLinksGroup";

    export default {
        name: "Footer",
        components: {
            FooterLinksGroup
        }
    }
</script>

<style scoped>

</style>
