<template>
  <div class="popup">
    <!-- popup btn -->
    <PopUpBtn v-if="btn.tagName !== '' && btn.className !== ''"
              ref="popupBtn"
              :btn="btn"
              :isActive="isOpened"
              :onClickBtn="onClickBtn">
      <slot name="btn"/>
    </PopUpBtn>
    <!-- popup btn - END -->
    <div :class="display | setClassForHolder(opacity)"  ref="popupHolder">
      <slot name="top"/>
      <!-- popup body -->
      <div class="popup-body" ref="popupBody"
           :style="{maxHeight: `${maxHeight}px`}">
        <slot name="body"/>
      </div>
      <!-- popup body - END -->
      <slot name="bottom"/>
    </div>
  </div>
</template>

<script>
  import './index.scss';

  import PopUpBtn from "./components/PopUpBtn/PopUpBtn";
  const calculateMaxHeight = import('~/utils/calculate-max-height.js');
  const calculatePositionElement = import('~/utils/calculate-position-element.js')

  export default {
    name: "PopUp",
    data () {
      return {
        maxHeight: 0,
        display: false,
        opacity: false,
        timeOutAnimation: null
      }
    },
    watch: {
      /// запуск анимации показа
      isOpened (status) {
        if (status) {
          /* Если попап был закрыт */
          if (this.timeOutAnimation !== null) {
            clearTimeout(this.timeOutAnimation)
            this.timeOutAnimation = null
          }
          if (!this.display) this.display = true
          this.setHeightBody()
          this.setPosition()
          this.timeOutAnimation = setTimeout(() => {
            if (!this.opacity) this.opacity = true
          }, 25)
        } else {
          /* Если попап был открыт */
          if (this.timeOutAnimation !== null) {
            clearTimeout(this.timeOutAnimation)
            this.timeOutAnimation = null
          }
          if (this.opacity) this.opacity = false
          this.timeOutAnimation = setTimeout(() => {
            if (this.display) this.display = false
          }, 250)
        }
      },
      /*----------------------*/

      /// eventAddElements
      eventAddElements () {
        const props = this.$props
        const key = props?.keyPopUp ?? undefined
        const eventAddElements = props?.eventAddElements ?? undefined
        if (key !== undefined && eventAddElements !== undefined) {
          eventAddElements({key, value: [
            {type: 'height', value: [this.setHeightBody]},
            {type: 'width', value: [this.setPosition]}
          ]})
        }
      },
      /*----------------------*/
    },
    props: {
      keyPopUp: { type: String, default: '', required: true },
      btn: { type: Object, default: () => ({tagName: '', className: ''})},
      eventAddElements: { type: Function, default: () => null }
    },
    methods: {
      /// getValueStore - получить значение из стора
      getValueStore (key = '') {
        if (key !== '') return this.$root.$store.getters[key]
        else return undefined
      },
      /*----------------------*/

      /// onClickBtn - метод клика по кнопке
      onClickBtn () {
        const {keyPopUp} = this.$props
        const nowOpen = this.getValueStore('GET_NOW_OPEN_POPUP')
        if (nowOpen !== undefined) {
          if (nowOpen === keyPopUp) this.$root.$store.dispatch('changePopUoOpen', '')
          else this.$root.$store.dispatch('changePopUoOpen', keyPopUp)
        }
      },
      /*----------------------*/

      /// setHeightBody - установка высоты для попапа
      setHeightBody () {
        const refs = this.$refs
        const componentBtn = refs?.popupBtn?.$el ?? false
        const componentMain = refs?.popupBody ?? undefined
        const checkWindow = window ?? false
        if (checkWindow !== false) {
          calculateMaxHeight.then(async (res) => {
            this.maxHeight = await res.default(window, componentMain, [], componentBtn)
          })
        }
      },
      /*----------------------*/

      /// setPositionRight - установка позиционирования по краю
      setPosition () {
        if (document && window) {
          const container = document.querySelector('header.header').querySelectorAll('.container')[0] ?? undefined
          const popup = this?.$refs?.popupHolder ?? undefined
          const componentBtn = this?.$refs?.popupBtn?.$el ?? undefined
          if (container !== undefined && popup !== undefined && componentBtn !== undefined) {
            popup.style.left = ''
            popup.style.right = ''
            calculatePositionElement.then(async res => {
              const result = await res.default(popup, componentBtn, container, window)
              // console.log(result)
              popup.style.maxWidth = result.maxWidth
              popup.style.left = result.left
              popup.style.right = result.right
            })
          }
        }
      },
      /*----------------------*/
    },
    filters: {
      /// setClassForHolder - установка нужных классов
      setClassForHolder: (display, opacity) => `popup-holder${display ? ' display' : ''}${opacity ? ' opacity' : ''}`,
      /*----------------------*/
    },
    computed: {
      /// isOpened - открыт ли сейчас попап?
      isOpened () {
        const {keyPopUp} = this.$props
        if (keyPopUp !== '') {
          const result = this.getValueStore('GET_NOW_OPEN_POPUP')
          if (result !== undefined) return result === keyPopUp
          else return false
        } else return false
      },
      /*----------------------*/
    },
    components: {
      PopUpBtn
    }
  }
</script>
