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
            <PopUp :keyPopUp="'user-panel'"
                   :btn="{tagName: 'div', className: 'header-btn__user'}">
              <!-- Кнопка -->
              <template v-slot:btn>
                <p class="text">
                  <small>
                    <button>Авторизация</button> | <button>Регистрация</button>
                  </small>
                </p>
                <p class="sts-icon sts-iconuser"></p>
                <p class="sts-icon sts-iconarrow-bottom"></p>
              </template>
              <!-- Кнопка - END -->

              <!-- Контент -->
              <template v-slot:body>
                <FormsLogin/>
              </template>
              <!-- Контент - END -->
            </PopUp>
          </div>
          <!-- Лк | Авторизация - END -->
        </div>
      </div>
      <!-- Правая часть компонента - END -->
    </div>
  </div>
</template>

<script>
    import PopUp from "../../../PopUp/PopUp";
    import FormsLogin from "../../../Forms/FormsLogin";

    export default {
        name: "HeaderUser",
        components: {
            PopUp,
            FormsLogin
        }
    }
</script>
