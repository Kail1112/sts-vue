<template>
  <div class="header-top">
    <div class="container">
      <div class="header-top-wrapper">
        <div class="row justify-space-between align-items-center">
          <div class="col-auto"></div>

          <div class="col-auto">
            <div class="row row-small">
              {{/* Лк | Авторизация */}}
              <div class="col-auto">
                <HeaderUserPanel/>
              </div>
              {{/* Лк | Авторизация - END */}}

              {{/* Сравнение */}}
              <div class="col-auto">
                <button class="header-btn">
                  <span class="sts-icon sts-iconchart-bar"></span>
                </button>
              </div>
              {{/* Сравнение - END */}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import './index.scss';

    import HeaderUserPanel from "./components/HeaderUserPanel/HeaderUserPanel";

    export default {
        name: "HeaderTop",
        components: {
            HeaderUserPanel
        }
    }
</script>
