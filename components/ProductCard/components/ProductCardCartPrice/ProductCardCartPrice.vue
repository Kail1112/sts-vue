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
            id: { type: Number, default: -1 },
            count: { type: Number, default: 0 },
            price: { type: Number, default: 0 }
        },
        computed: {
            /// totalPrice - цена
            totalPrice () { return this.$props.count * this.$props.price },
            /*----------------------*/
        }
    }
</script>
