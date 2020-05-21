<template>
  <PopUp :keyPopUp="'user-cart'"
         :btn="{tagName: 'div', className: 'header-cart'}"
         :function-on-open="setOverflow">
    {{/* Кнопка */}}
    <template v-slot:btn>
      <p class="sts-icon sts-iconshopping-cart"></p>
      <p class="text">{{getTitle('cart-title')}}</p>
      <p class="text">{{getTitle('cart-all-price-title')}} <b>2 000 000</b> сум</p>
      <p class="counter"><span>99+</span></p>
    </template>
    {{/* Кнопка - END */}}

    {{/* Контент */}}
    <template v-slot:inner>
      <PopUpHolder>
        <PopUpTop :title="getTitle('cart-title')"
                  :has-close-btn="true"
                  :close-btn-function="removeOverflow"/>
        <PopUpBody :moreClass="productsFromCart.length === 0 ? 'popup-body-cart empty' : 'popup-body-cart'">
          <template v-if="productsFromCart.length === 0">
            <div class="cart-empty">
              <p class="sts-icon sts-iconshopping-cart"></p>
              <h3>Корзина пустая</h3>
            </div>
          </template>
          <ProductCard v-else v-for="(product, index) in productsFromCart"
                       :key="`popup-cart-product-${index}`"
                       :id="product.id"
                       :link="product.link"
                       :name="product.name"
                       :image="product.image"
                       :more-class="'product-cart'"
                       :cart="true"/>
        </PopUpBody>
      </PopUpHolder>
    </template>
    {{/* Контент - END */}}
  </PopUp>
</template>

<script>
    import './index.scss';

    import PopUp from "../../../../../PopUp/PopUp";
    import PopUpHolder from "../../../../../PopUp/components/PopUpHolder/PopUpHolder";
    import PopUpBody from "../../../../../PopUp/components/PopUpBody/PopUpBody";
    import PopUpTop from "../../../../../PopUp/components/PopUpTop/PopUpTop";
    import ProductCard from "../../../../../ProductCard/ProductCard";

    export default {
        name: "HeaderBottomCart",
        computed: {
            /// productsFromCart - массив продуктов из корзины
            productsFromCart () { return this.$root.$store.getters.GET_PRODUCTS_FROM_CART },
            /*----------------------*/
        },
        methods: {
            /// getTitle - получение системного сообщения в зависимости от языка
            getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
            /*----------------------*/

            /// removeOverflow
            setOverflow () { !this.$root.$store.getters.GET_NOW_OVERFLOW && this.$root.$store.dispatch('changeOverflow', true) },
            /*----------------------*/

            /// removeOverflow
            removeOverflow () { this.$root.$store.getters.GET_NOW_OVERFLOW && this.$root.$store.dispatch('changeOverflow', false) }
            /*----------------------*/
        },
        components: {
            PopUp,
            PopUpHolder,
            PopUpBody,
            PopUpTop,
            ProductCard
        }
    }
</script>
