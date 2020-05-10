<template>
  <header class="header" ref="header">
    <div class="container">
      <div class="row justify-space-between align-items-center">
        <div class="col-lg-3">
          <router-link :to="{ path: '/' }" class="header-logo">
            <img src="~/assets/images/sts-logo.png" alt="">
          </router-link>
        </div>
        <div class="col-xl-1 d-none d-xl-block"></div>
        <div class="col-lg-20">
          <HeaderRight :event-add-elements="resizeObserver ? setSubscribeElements : () => null"/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import './index.scss';

  import HeaderRight from "./components/HeaderRight/HeaderRight";

  const getDefaultLayout = import('~/utils/get-default-layout.js');
  const transformParamsForResize = import('~/utils/transform-params-for-resize.js')
  const destructParamsForResize = import('~/utils/destruct-params-for-resize.js')

  export default {
    name: "Header",
    data () {
      return {
        resizeObserver: false,
        resizeObserverKey: {},
        subscribeElements: {hash: {}, list: []}
      }
    },
    methods: {
      /// getRootSubscriber
      async getRootSubscriber (method = '', hasObserver = false, params = {key: '', value: []}) {
        return await getDefaultLayout.then(async res => {
          const parent = res.default(this.$root, 'class', 'main')
          return await transformParamsForResize.then(transform => {
            const finishObject = transform.default(method, params, hasObserver)
            parent.subscribeElements = finishObject.list.reduce((acc, key) => {
              const elem = finishObject.hash[key]
              if (acc.hash[key] === undefined) {
                acc.list.push(key)
                acc.hash[key] = []
              }
              acc.hash[key].push(...elem)
              return acc
            }, {...parent.subscribeElements})
            return finishObject
          })
        })
      },
      /*----------------------*/

      /// setSubscribeElements - добавление элементов на прослушку
      setSubscribeElements (params) {
        const {resizeObserver, getRootSubscriber} = this
        if (resizeObserver) {
          transformParamsForResize.then(transform => {
            this.subscribeElements = transform.default('width', params, !resizeObserver)
          })
        }
        getRootSubscriber(!resizeObserver ? '' : 'height', !resizeObserver, params) /// подписываемся на эвент ресайз
      },
      /*----------------------*/
    },
    components: {
      HeaderRight
    },
    mounted () {
      this.$nextTick(() => {
        /* Запускаем прослушку если есть специальный метод */
        const checkResizeObserver = ResizeObserver ?? undefined
        if (checkResizeObserver !== undefined) {
          const startObserve = (header, elements) => {
            /* Инициализация эвента */
            const observer = new ResizeObserver(() => {
              destructParamsForResize.then(res => {
                const result = res.default(this.subscribeElements)
                result.forEach(func => func())
              })
            })
            observer.observe(header)
            return observer
          }
          /* Инициализация эвента - end */
          if (!this.resizeObserver) {
            this.resizeObserver = true
            startObserve(this.$refs.header, this.subscribeElements)
          } else {
            this.resizeObserver = false
            this.resizeObserverKey.unobserve(this.$refs.header)
            this.resizeObserverKey = startObserve(this.$refs.header, this.subscribeElements)
          }
        } else {
          if (this.resizeObserver) this.resizeObserver = false
        }
        /* Запускаем прослушку если есть специальный метод - END */
      })
    }
  }
</script>
