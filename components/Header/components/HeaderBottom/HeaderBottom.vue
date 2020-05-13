<template>
  <div class="header-bottom">
    <div class="container">
      <div class="row justify-space-between align-items-center">
        <div class="col-xxl-5"></div>
        <div class="col-xxl-14"></div>
        <div class="col-xxl-5">
          <HeaderBottomCart/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import './index.scss';

    import HeaderBottomCart from "./components/HeaderBottomCart/HeaderBottomCart";

    export default {
        name: "HeaderBottom",
        components: {
            HeaderBottomCart
        }
    }
</script>
