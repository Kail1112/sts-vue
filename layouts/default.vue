<template>
  <main :class="isOverflow | filterForMainBlock"
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

  const findClosetNode = import('~/utils/find-closet-node.js')
  const destructParamsForResize = import('~/utils/destruct-params-for-resize.js')

  import createWorker from "../utils/workers/create-worker";

  export default {
    name: 'main-layout',
    data () {
      return {
        subscribeElements: {}
      }
    },
    computed: {
      /// isOverflow - какое сейчас состояние у overflowBody
      isOverflow () {
        return this.$store.getters.GET_NOW_OVERFLOW
      },
      /*----------------------*/
    },
    methods: {
      /// closeAllPopUp - закрытие всех попапов
      closeAllPopUp () {
        this.$store.dispatch('changePopUoOpen', '')
        this.$root.$store.getters.GET_NOW_OVERFLOW && this.$root.$store.dispatch('changeOverflow', false)
      },
      /*----------------------*/

      /// closeAllSelect - закрытие всех select'ов
      closeAllSelect () { this.$root.$store.dispatch('changeSelectOpen', '') },
      /*----------------------*/

      /// clickOnDocument - чтобы закрывать все остальные блоки
      clickOnDocument (e) {
        findClosetNode.then(({default: findClosetNode}) => {
          /* Закрытие попапов */
          (!e.target.classList.contains('popup-btn') && findClosetNode(e.target, 'class', 'popup')[0] === document.documentElement) && this.closeAllPopUp()
          /* Закрытие попапов - end */

          /* Закрытие select'ов */
          findClosetNode(e.target, 'class', 'select')[0] === document.documentElement && this.closeAllSelect()
          /* Закрытие select'ов - END */
        })
      },
      /*----------------------*/

      /// getScrollbarWidth - получение ширины скролла
      getScrollbarWidth () {
        if (document && window) {
          let scrollDiv = document.createElement('div');
          scrollDiv.className = 'modal-scrollbar-measure';
          document.body.appendChild(scrollDiv);
          const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
          document.body.removeChild(scrollDiv);
          return scrollbarWidth;
        }
      },
      /*----------------------*/

      /// setPaddingForMain - установка padding-right свойства если есть свойств overflow
      setPaddingForMain (overflowBody) {
        if (document && window) {
          const doc = document.documentElement,
            rectDocument = document.body.getBoundingClientRect(),
            isDocumentOverflowing = rectDocument.left + rectDocument.right < window.innerWidth,
            scrollbarWidth = this.getScrollbarWidth()
          if (isDocumentOverflowing || isDocumentOverflowing !== 0) {
            parseFloat(doc.style.paddingRight) !== scrollbarWidth && (doc.style.paddingRight = `${scrollbarWidth}px`)
          }
          if (overflowBody) {
            !doc.classList.contains('overflow') && (doc.classList.add('overflow'))
          } else {
            doc.classList.contains('overflow') && (doc.classList.remove('overflow'))
            parseFloat(doc.style.paddingRight) !== 0 && (doc.style.paddingRight = '')
          }
        }
      },
      /*----------------------*/
    },
    filters: {
      /// filterForMainBlock
      filterForMainBlock: state => `main${state ? ' overflow' : ''}`,
      /*----------------------*/
    },
    components: {
      Header,
      Footer
    },
    mounted () {
      /* Запуск эвентов */
      this.$nextTick(() => {
        if (window) {
          window.addEventListener('resize', () => {
            destructParamsForResize.then(async ({default: destructParamsForResize}) => {
              const functions =  await destructParamsForResize(this.subscribeElements)
              functions.forEach(item => {
                /// Тут нужно вызывать функции которые нужно обработать с эвентом
              })
              this.setPaddingForMain(this.$store.getters.GET_NOW_OVERFLOW)
            })
          })
        }
        this.$store.watch((state) => state.overflowBody, this.setPaddingForMain)
      })
      /* Запуск эвентов - end */

      /* Worker для чека изменений в корзине */
      if (window) {
        const func = (self, start) => {
          console.log(self, start)
          if (start) {
            // Если нужно запустить воркер
            self.postMessage(1)
          } else {
            // Если нужно закрыть worker
          }
        }
        const worker = createWorker(func, window) // Инициализация воркера
        if (worker !== undefined) {
          worker.postMessage(true) // Запуск воркера
          worker.onmessage = res => { // Слушаем изменения
            console.log(res)
          }
        }
      }
      /* Worker для чека изменений в корзине - END */
    }
  }
</script>
