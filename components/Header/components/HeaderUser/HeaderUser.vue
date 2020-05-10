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
            <div class="header-btn__user">
              <p class="text">
                <small>
                  <button>Авторизация</button> | <button>Регистрация</button>
                </small>
              </p>
              <p class="sts-icon sts-iconuser"></p>
              <p class="sts-icon sts-iconarrow-bottom"></p>
            </div>
          </div>
          <!-- Лк | Авторизация - END -->
        </div>
      </div>
      <!-- Правая часть компонента - END -->
    </div>
  </div>
</template>

<script>
    export default {
        name: "HeaderUser"
    }
</script>
