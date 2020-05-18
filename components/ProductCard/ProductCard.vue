<template>
  <div :class="mainMoreClass | mainMoreClass">
    <div :class="moreClass | moreClass">
      {{/* loading */}}
      <LoadingIndicator v-if="loading"/>
      {{/* loading - END */}}

      {{/* product top */}}
      <div class="product-top">
        {{/* product top actions */}}
        <div v-if="productInCart || productInComparison" class="product-top-actions">
          {{/* управление корзиной */}}
          <label v-if="productInCart" class="product-top-action product-top-cart">
            <button class="sts-icon sts-iconshopping-cart"
                    :title="getTitle('cart-remove-product')"
                    @click="removeFromCart"></button>
            <Count :more-class="'small'"
                   :callback="changeCountFromCart"
                   :start-value="countProductFromCart"/>
          </label>
          {{/* управление корзиной - END */}}

          {{/* управление сравнением */}}
          <label v-if="productInComparison" class="product-top-action product-top-comparison">
            <button class="sts-icon sts-iconchart-bar"
                    :title="getTitle('comparison-remove-product')"
                    @click="removeFromComparison"></button>
          </label>
          {{/* управление сравнением - END */}}
        </div>
        {{/* product top actions - END */}}

        {{/* product top image */}}
        <router-link class="product-top-image"
                     :to="{ path: getLink }">
          <img src="~/static/images/x6-1000x1000.jpg" alt="">
        </router-link>
        {{/* product top image - END */}}

        {{/* product top title */}}
        <router-link class="product-top-title"
                     :to="{ path: getLink }">
          Моноблок Avtech COMBO PC X6 Моноблок Avtech COMBO PC X6
        </router-link>
        {{/* product top title - END */}}
      </div>
      {{/* product top - END */}}

      {{/* product middle */}}
      <div class="product-middle">
        <div class="typography ul-variant-2">
          <ul>
            <li>LCD 24" 1920x1080 Full HD</li>
            <li>CPU Intel Celeron® J1900 2.0 GHz 4 ядра</li>
            <li>HDD 500GB Seagate, 2GB DDR3L/1600</li>
            <li>USB 3.0 x2шт, USB 2.0 x2шт</li>
          </ul>
        </div>
      </div>
      {{/* product middle - END */}}

      {{/* product bottom */}}
      <div class="product-bottom">
        <div class="row row-small">
          {{/* кнопка перехода на дет. страницу */}}
          <div class="col-14">
            <a href="#" class="button full center no-margin medium">Подробнее</a>
          </div>
          {{/* кнопка перехода на дет. страницу - END */}}

          {{/* управление корзиной */}}
          <div class="col-5">
            <button :class="productInComparison | activeClass"
                    :title="productInComparison ? getTitle('comparison-remove-product') : getTitle('comparison-add-product')"
                    @click="btnComparisonAction"><span class="sts-icon sts-iconchart-bar"></span></button>
          </div>
          {{/* управление корзиной - END */}}

          {{/* управление сравнением */}}
          <div class="col-5">
            <button :class="productInCart | activeClass"
                    :title="productInCart ? getTitle('cart-remove-product') : getTitle('cart-add-product')"
                    @click="btnCartAction">
              <span class="sts-icon sts-iconshopping-cart"></span>
            </button>
          </div>
          {{/* управление сравнением - END */}}
        </div>
      </div>
      {{/* product bottom - END */}}
    </div>
  </div>
</template>

<script>
    import './index.scss';

    import generateLink from '~/utils/generate-link.js';

    import Count from "../Count/Count";
    import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

    export default {
        name: "ProductCard",
        data () {
            return {
                timeOutAction: '', /// Таймаут активности над элементом
                loading: false, /// Происходят ли действия с этим товаром
            }
        },
        props: {
            id: { type: Number, default: -1 },
            mainMoreClass: { type: String, default: '' },
            moreClass: { type: String, default: '' },
            link: { type: String, default: '' }
        },
        computed: {
            /// getLink - получение ссылки на товар
            getLink () {
                const {$store: store} = this.$root
                return generateLink(this.$props.link, store.getters.GET_SYSTEM_LANG, store.getters.GET_DEFAULT_LANG)
            },
            /*----------------------*/

            /// productInCart - находится ли продукт в корзине
            productInCart () { return this.$root.$store.getters.CHECK_PRODUCT_IN_CART(this.$props.id) },
            /*----------------------*/

            /// countProductFromCart - кол-во товаров в корзине
            countProductFromCart () { return this.$root.$store.getters.GET_COUNT_IN_CART(this.$props.id) },
            /*----------------------*/

            /// productInComparison - находится ли товар в сравнениях
            productInComparison () { return this.$root.$store.getters.CHECK_PRODUCT_IN_COMPARISON(this.$props.id) },
            /*----------------------*/
        },
        filters: {
            /// mainMoreClass
            mainMoreClass: classList => `normal-block${classList !== '' ? ` ${classList}` : ''}`,
            /*----------------------*/

            /// moreClass
            moreClass: classList => `product${classList !== '' ? ` ${classList}` : ''}`,
            /*----------------------*/

            /// activeClass - активный класс для кнопок
            activeClass: active => `button full center no-margin medium${active ? '' : ' border'}`,
            /*----------------------*/
        },
        methods: {
            /// getTitle - получение системного сообщения в зависимости от языка
            getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
            /*----------------------*/

            /// changeCountFromCart - изменение кол-ва в корзине
            changeCountFromCart (value) {
                if (this.timeOutAction !== '') {
                    clearTimeout(this.timeOutAction)
                    this.timeOutAction = ''
                }
                this.timeOutAction = setTimeout(() => {
                    this.setLoading()
                    this.addToCart(null, value)
                }, 750)
            },
            /*----------------------*/

            /// btnCartAction - действия по нажатию на кнопку корзины
            btnCartAction () {
                if (this.$root.$store.getters.CHECK_PRODUCT_IN_CART(this.$props.id))
                    this.removeFromCart()
                else
                    this.addToCart()
            },
            /*----------------------*/

            /// addToCart - добавление в корзину
            addToCart (e, count = 1) {
                const {id} = this.$props
                const callback = () => {
                    setTimeout(() => {
                        this.removeLoading()
                    }, 2000)
                }
                this.setLoading()
                this.$root.$store.dispatch('changeCart', {id, count, callback})
            },
            /*----------------------*/

            /// removeFromCart - удаление из корзины
            removeFromCart () {
                const {id} = this.$props
                const callback = () => {
                    setTimeout(() => {
                        this.removeLoading()
                    }, 2000)
                }
                this.setLoading()
                this.$root.$store.dispatch('removeFromCart', {id, callback})
            },
            /*----------------------*/

            /// btnComparisonAction - действия по нажатию на кнопку сравнения
            btnComparisonAction () {
                if (this.$root.$store.getters.CHECK_PRODUCT_IN_COMPARISON(this.$props.id))
                    this.removeFromComparison()
                else
                    this.addToComparison()
            },
            /*----------------------*/

            /// addToComparison - добавление в сравнение
            addToComparison () {
                const {id} = this.$props
                const callback = () => {
                    setTimeout(() => {
                        this.removeLoading()
                    }, 2000)
                }
                this.setLoading()
                this.$root.$store.dispatch('addToComparison', {id, callback})
            },
            /*----------------------*/

            /// removeFromComparison - удаление из сравнения
            removeFromComparison () {
                const {id} = this.$props
                const callback = () => {
                    setTimeout(() => {
                        this.removeLoading()
                    }, 2000)
                }
                this.setLoading()
                this.$root.$store.dispatch('removeFromComparison', {id, callback})
            },
            /*----------------------*/

            /// setLoading - установка индикации загрузки
            setLoading () { !this.loading && (this.loading = true) },
            /*----------------------*/

            /// removeLoading - удаление индикации загрузки
            removeLoading () { this.loading && (this.loading = false) },
            /*----------------------*/
        },
        components: {
            Count,
            LoadingIndicator
        }
    }
</script>
