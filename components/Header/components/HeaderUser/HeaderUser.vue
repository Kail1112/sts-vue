<template>
  <div class="header-user">
    <div class="row align-items-center justify-space-between">
      {{/* Левая часть компонента */}}
      <div class="col-auto"></div>
      {{/* Левая часть компонента - END */}}

      {{/* Правая часть компонента */}}
      <div class="col-auto">
        <div class="row row-small">
          {{/* Корзина пользователя */}}
          <div class="col-auto">
            <HeaderUserCart/>
            <button class="header-btn">
              <span class="sts-icon sts-iconshopping-cart"></span>
            </button>
          </div>
          {{/* Корзина пользователя - END */}}

          {{/* Сравнение */}}
          <div class="col-auto">
            <button class="header-btn">
              <span class="sts-icon sts-iconchart-bar"></span>
            </button>
          </div>
          {{/* Сравнение - END */}}

          {{/* Лк | Авторизация */}}
          <div class="col-auto">
            <HeaderUserPanel/>
          </div>
          {{/* Лк | Авторизация - END */}}
        </div>
      </div>
      {{/* Правая часть компонента - END */}}
    </div>
  </div>
</template>

<script>
  import HeaderUserPanel from "./components/HeaderUserPanel/HeaderUserPanel";
  import HeaderUserCart from "./components/HeaderUserCart/HeaderUserCart";

  export default {
    name: "HeaderUser",
    components: {
      HeaderUserPanel,
      HeaderUserCart
    }
  }
</script>
