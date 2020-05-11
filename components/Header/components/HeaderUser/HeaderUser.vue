<template>
  <div class="header-user">
    <div class="row align-items-center justify-space-between">
      <!-- Левая часть компонента -->
      <div class="col-auto"></div>
      <!-- Левая часть компонента - END -->
      <!-- Правая часть компонента -->
      <div class="col-auto">
        <div class="row row-small">

          <!-- Корзина пользователя -->
          <div class="col-auto">
            <HeaderUserCart/>
            <button class="header-btn">
              <span class="sts-icon sts-iconshopping-cart"></span>
            </button>
          </div>
          <!-- Корзина пользователя - END -->

          <!-- Сравнение -->
          <div class="col-auto">
            <button class="header-btn">
              <span class="sts-icon sts-iconchart-bar"></span>
            </button>
          </div>
          <!-- Сравнение - END -->

          <!-- Лк | Авторизация -->
          <div class="col-auto">
            <HeaderUserPanel :event-add-elements="eventAddElements"/>
          </div>
          <!-- Лк | Авторизация - END -->

        </div>
      </div>
      <!-- Правая часть компонента - END -->
    </div>
  </div>
</template>

<script>
  import HeaderUserPanel from "./components/HeaderUserPanel/HeaderUserPanel";
  import HeaderUserCart from "./components/HeaderUserCart/HeaderUserCart";

  export default {
    name: "HeaderUser",
    props: {
      eventAddElements: { type: Function, default: () => null }
    },
    methods: {
      /// changeActiveTabUserPanel - активный таб в лк пользователя
      changeActiveTabUserPanel (tab) {
        console.log(tab)
      },
      /*----------------------*/
    },
    components: {
      HeaderUserPanel,
      HeaderUserCart
    }
  }
</script>
