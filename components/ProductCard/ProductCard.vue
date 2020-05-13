<template>
  <div :class="mainMoreClass | mainMoreClass">
    <div :moreClass="moreClass">
      {{/* product top */}}
      <div class="product-item-top">

      </div>
      {{/* product top - END */}}
    </div>
  </div>
</template>

<script>
    import './index.scss';

    export default {
        name: "ProductCard",
        props: {
            mainMoreClass: { type: String, default: '' },
            moreClass: { type: String, default: '' }
        },
        filters: {
            /// mainMoreClass
            mainMoreClass: classList => `normal-block${classList !== '' ? ` ${classList}` : ''}`,
            /*----------------------*/

            /// moreClass
            moreClass: classList => `product-item${classList !== '' ? ` ${classList}` : ''}`
            /*----------------------*/
        }
    }
</script>
