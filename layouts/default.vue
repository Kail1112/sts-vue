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
  const destructParamsForResize = import('~/utils/destruct-params-for-resize.js')

  export default {
    name: 'main-layout',
    data () {
      return {
        subscribeElements: {hash: {}, list: []}
      }
    },
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
    },
    mounted () {
      /* Запуск эвентов */
      this.$nextTick(() => {
        if (window) {
          window.addEventListener('resize', () => {
            destructParamsForResize.then(res => {
              const result = res.default(this.subscribeElements)
              for (let a = 0; a < result.length; a++) {
                const func = result[a]
                func()
              }
            })
          })
        }
      })
      /* Запуск эвентов - end */
    }
  }
</script>
