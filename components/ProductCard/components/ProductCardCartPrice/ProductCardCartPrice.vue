<template>
    <div class="product-bottom">
      <div class="product-price">
        <h2 class="product-price-now"><b>{{totalPrice | spaceBetweenNumber}} сум</b></h2>
      </div>
    </div>
</template>

<script>
    import './index.scss';

    export default {
        name: "ProductCardCartPrice",
        props: {
            id: { type: Number, default: -1 }
        },
        computed: {
            /// totalPrice - цена
            totalPrice () {
                return Number.isInteger(this.$props.id * 1) && (this.$props.id * 1) > -1 ? this.$root.$store.getters.GET_TOTAL_PRICE_PRODUCT_CART(this.$props.id * 1) : 0
            },
            /*----------------------*/
        }
    }
</script>
