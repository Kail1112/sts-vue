<template>
  <main class="main"
        @click="clickOnDocument">
    <Header/>
    <div class="content-page">
      <nuxt/>
    </div>
    <Footer/>
  </main>
</template>

<script>
  import '../assets/index.scss'

  import Header from "../components/Header/Header";
  import Footer from "../components/Footer/Footer";

  import findClosetNode from '../utils/find-closet-node';

  export default {
      name: 'main-layout',
      components: {
          Header,
          Footer
      },
      methods: {
          /// closeAllPopUp - закрытие всех попапов
          closeAllPopUp () {
              this.$store.dispatch('changePopUoOpen', '')
          },
          /*----------------------*/

          /// clickOnDocument - чтобы закрывать все остальные блоки
          clickOnDocument (e) {
              const target = e.target

              /* Закрытие попапов */
              const checkIsPopUp = !target.classList.contains('popup-btn') && findClosetNode(target, 'class', 'popup')[0] === document.documentElement
              if (checkIsPopUp) this.closeAllPopUp()
              /* Закрытие попапов - end */
          },
          /*----------------------*/
      }
  }
</script>
