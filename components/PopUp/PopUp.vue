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
    <transition name="fade" v-on:before-enter="beforeEnterAnimation">
<!--      <div :class="display | setClassForHolder(opacity)"  ref="popupHolder">-->
      <div class="popup-holder" v-if="isOpened" ref="popupHolder">
        <slot name="top"/>
        <!-- popup body -->
        <div :class="noScroll | setClassForBody(classForBody)" ref="popupBody"
             :style="{maxHeight: `${maxHeight}px`}">
          <slot name="body"/>
        </div>
        <!-- popup body - END -->
        <slot name="bottom"/>
      </div>
    </transition>
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
        timeOutAnimation: '',
        timeOutSetScroll: 0,
        noScroll: false,
      }
    },
    watch: {
      ///isOpened
      isOpened (status) {
        if (status) {
          this.setHeightBody()
          this.setPosition()
        }
      },
      /*----------------------*/

      ///startCalc
      initCalc (param) {
        const {status, callback} = param
        if (status) {
          new Promise(resolve => {
            let count = 0
            const callback = (status) => {
              if (status) {
                count += 1
                if (count === 2) {
                  if (this.timeOutSetScroll !== 0) {
                    clearTimeout(this.timeOutSetScroll)
                  }
                  this.timeOutSetScroll = setTimeout(() => {
                    if (this.noScroll) this.noScroll = false
                  }, 285)
                  resolve()
                }
              }
            }
            if (!this.noScroll) this.noScroll = true
            this.setHeightBody(undefined, callback)
            this.setPosition(undefined, callback)
          }).then(() => callback(true))
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
      classForBody: { type: String, default: '' },
      eventAddElements: { type: Function, default: () => null },
      initCalc: { type: Object, default: () => ({status: false, callback: () => null}) }
    },
    methods: {
      /// beforeEnterAnimation - метод для позиционирования попапа
      beforeEnterAnimation (e) {
        this.setHeightBody(e)
        this.setPosition(e)
      },
      /*----------------------*/

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
      setHeightBody (component = undefined, callback = (status) => false) {
        const refs = this.$refs
        const componentBtn = refs?.popupBtn?.$el ?? false
        const componentMain = component === undefined ? refs?.popupBody ?? undefined : component
        const checkWindow = window ?? false
        if (checkWindow !== false) {
          calculateMaxHeight.then(async (res) => {
            this.maxHeight = await res.default(window, componentMain, [], componentBtn)
            callback(true)
          })
        }
      },
      /*----------------------*/

      /// setPositionRight - установка позиционирования по краю
      setPosition (component = undefined, callback = (status) => false) {
        if (document && window) {
          const container = document.querySelector('header.header').querySelectorAll('.container')[0] ?? undefined
          const popup = component === undefined ? this?.$refs?.popupHolder ?? undefined : component
          const componentBtn = this?.$refs?.popupBtn?.$el ?? undefined
          if (container !== undefined && popup !== undefined && componentBtn !== undefined) {
            popup.style.left = ''
            popup.style.right = ''
            calculatePositionElement.then(async res => {
              const result = await res.default(popup, componentBtn, container, window)
              popup.style.maxWidth = result.maxWidth
              popup.style.left = result.left
              popup.style.right = result.right
              callback(true)
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

      /// setClassForBody
      setClassForBody: (state, bodyClass) => `popup-body${state ? ' no-scroll' : ''}${bodyClass ? ` ${bodyClass}` : ''}`,
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
