<template>
  <header class="header" ref="header">
    <div class="container">
      <div class="row justify-space-between align-items-center">
        <div class="col-lg-3">
          <router-link :to="{ path: '/' }" class="header-logo">
            <img src="~/assets/images/sts-logo.png" alt="" />
          </router-link>
        </div>
        <div class="col-xl-1 d-none d-xl-block"></div>
        <div class="col-lg-20">
          <HeaderRight/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import "./index.scss";

import HeaderRight from "./components/HeaderRight/HeaderRight";

export default {
  name: "Header",
  components: {
    HeaderRight,
  }
};
</script>
