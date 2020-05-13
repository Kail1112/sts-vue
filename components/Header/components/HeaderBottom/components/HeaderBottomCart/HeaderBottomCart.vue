<template>
  <PopUp :keyPopUp="'user-cart'"
         :btn="{tagName: 'div', className: 'header-cart'}"
         :function-on-open="setOverflow">
    {{/* Кнопка */}}
    <template v-slot:btn>
      <p class="sts-icon sts-iconshopping-cart"></p>
      <p class="text"> Корзина </p>
      <p class="text"> Общая сумма: <b>2 000 000</b> сум </p>
      <p class="counter"><span>99+</span></p>
    </template>
    {{/* Кнопка - END */}}

    {{/* Контент */}}
    <template v-slot:inner>
      <PopUpHolder>
        <PopUpTop :title="'Корзина'"
                  :has-close-btn="true"
                  :close-btn-function="removeOverflow"/>
        <PopUpBody :moreClass="'popup-body-cart'">
          <p>Test</p>
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

    export default {
        name: "HeaderBottomCart",
        methods: {
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
            PopUpTop
        }
    }
</script>
