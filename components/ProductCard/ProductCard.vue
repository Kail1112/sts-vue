<template>
  <div :class="mainMoreClass | mainMoreClass">
    <div :class="moreClass | moreClass">
      {{/* loading */}}
      <LoadingIndicator v-if="checkForActive"/>
      {{/* loading - END */}}

      {{/* product top */}}
      <div class="product-top">
        {{/* product top actions */}}
        <div v-if="(productInCart || cart) || productInComparison" class="product-top-actions">
          {{/* управление корзиной */}}
          <label v-if="productInCart" class="product-top-action product-top-cart">
            <button class="sts-icon sts-iconshopping-cart"
                    :title="getTitle('cart-remove-product')"
                    @click="btnCartAction"></button>
            <Count :more-class="'small'"
                   :callback="changeCountFromCart"
                   :start-value="countProductFromCart"/>
          </label>
          {{/* управление корзиной - END */}}

          {{/* управление сравнением */}}
          <label v-if="productInComparison && !cart" class="product-top-action product-top-comparison">
            <button class="sts-icon sts-iconchart-bar"
                    :title="getTitle('comparison-remove-product')"
                    @click="btnComparisonAction"></button>
          </label>
          {{/* управление сравнением - END */}}
        </div>
        {{/* product top actions - END */}}

        {{/* product top image */}}
        <router-link class="product-top-image" :to="{ path: getLink }">
          <img :src="image" :alt="name">
        </router-link>
        {{/* product top image - END */}}

        {{/* product top title */}}
        <router-link :class="productInCart | moreClassForTitle(productInComparison)" :to="{ path: getLink }">
          {{name}}
        </router-link>
        {{/* product top title - END */}}
      </div>
      {{/* product top - END */}}

      {{/* product middle */}}
      <div v-if="!cart" class="product-middle">
        <div v-if="shortInfo.length" class="typography ul-variant-2">
          <ul :class="calcInfo | activeShadowForInfo">
            <li v-for="(info, index) in shortInfo.slice(0, 4)"
                :key="`product-info-${index}`"
                v-html="info"></li>
          </ul>
          <router-link v-if="calcInfo" class="links product-middle-link" :to="{ path: getLink }">
            {{getTitle('show-all')}}
          </router-link>
        </div>
      </div>
      {{/* product middle - END */}}

      {{/* product bottom */}}
      <div v-if="!cart" class="product-bottom">
        {{/* цена */}}
        <div class="product-price">
          <div class="row">
            <div class="col-24">
              <h2 class="product-price-now"><b>{{5050000 | spaceBetweenNumber}} сум</b></h2>
              <h3 class="product-price-old"><b>{{6000000 | spaceBetweenNumber}} сум</b></h3>
            </div>
          </div>
        </div>
        {{/* цена - END */}}

        {{/* кнопки управления */}}
        <div class="product-bottom-buttons">
          <div class="row row-small">
            {{/* кнопка перехода на дет. страницу */}}
            <div class="col-14">
              <router-link class="button full center no-margin medium" :to="{ path: getLink }">
                {{getTitle('more-details')}}
              </router-link>
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
        {{/* кнопки управления - END */}}
      </div>
      {{/* product bottom - END */}}

      {{/* product price for cart */}}
      <ProductCardCartPrice v-if="cart && productInCart"
                            :id="id"
                            :count="countProductFromCart"
                            :price="5050000"/>
      {{/* product price for cart - END */}}
    </div>
  </div>
</template>

<script>
    import './index.scss';

    import generateLink from '~/utils/generate-link.js';

    import Count from "../Count/Count";
    import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
    import ProductCardCartPrice from "./components/ProductCardCartPrice/ProductCardCartPrice";

    export default {
        name: "ProductCard",
        data () {
            return {
                timeOutAction: '', /// Таймаут активности над элементом
            }
        },
        props: {
            id: { type: Number, default: -1 }, // id товара
            link: { type: String, default: '' }, // ссылка на товар
            name: { type: String, default: '' }, // название товара
            image: { type: String, default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABDCAYAAAA1Wi+TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABOjSURBVHgB7V0JmB1VlT5V79V73U3CJBoQMCQBZIsCEjpNwARBZAjoDIMwynwzQSAyAoOjMDOCCpKwCR8wGISIow4B8snAqAxhE5AtSYfOxhIYtkA2iEGzp5u231J15/xd505VV+otXe9V55W+//vu917dOrfqLueec+65SxkUMxSRsZRovJNKHWKkUllqMBiOs76jWHw+7F4X0WgjkzmOEgbTMLZuzOWeOZUoN5h07xG1vp9OTzBMc1+DH0MNBiOfX9DRn83SSFNMWEZkOZb1taWGcREz9acMakw4hnEb/4QyNGWzZ5JSt1LCYBPNbyV6qlr6zpaWsWmlLt+g1FnMxSOoMeE4mcxhlM+XJYqFoRdZVkeR6DbDMCZSA/Z0P1L9fS8chlLtlEQ4zssnEBUrkT1BtNvIbHa6Y9tXkmGMUtTQWFtobd0w5AzdlUqdypUzlyXySGp82JzXl8JuPMt1w2X4dIM3cihYkCyuRIPytVnWTUqpC5meGh0sXN6dsn37tkp0dWXoLss6lyvnJ/zXomRgFdtloTZZWza7Pzf2vpRApExzYbn7PDbYnTKZu/jvlyghYNMQmrSifKmbOdCVTp/EomEWJYeZUTsrjyLaEXbPITqYf4ZT8rC+va9vXVmKTGaWkSBmBnjw/lw1dHVhaLbF9mRmvslIGANwfpcapXq9Uh0uSbLAhSlrbixMp0/gQk2jZMHJFYsvVkNYF5NjRCZzLv8cQUmD47xQ6hbbbJMoAbblTjCMkmV6jP02lmFcQf1j4URhHftON1ZDWLOEfmjUqOEsFb5HyYPKFIuh0gy+c2aMoylhgLZJG8byUvc/ks2eqAwjcX51bo+F1dLWzNB7bt/+laSZGoKVRxKFjpqXZzIHJ7FM3PBbuUFXlbpvKjXdiHHuIS5U47XRqImhIcl4Vuo0SiBgP5e6V1RqIiUQ3B4b5vX1hXptHuChIA90T6HkoVg0jBXVEtfE0J1Ew5gxxlMCwW6gRaXucZk+Q0kEl2lGv4NmZ4yxrAlcrlZKHnbYprmyWuKaGLolkxnHtTeGkoeiadsvh9141lXJh1MCwa6tkvYzmxuTKYngCZVnent/Xy15TQztKDUliTYZY5PZ2vp22I3hbW178M9BlECoMh4OxzSPp2Sic0YJrROGmpjRYFXg2PZ3KGFgu/+D9u7uTWH3nN5epdLpm1kyUMJQXFcsvhl2A1qHZz1/yWWq2lvQKGDT8AlqookmmmjiTwCRp8JeYRd0Xybz8wabS4OhsIXdPEt2z+V+dRhR1YOJeuAlnjQtZDJYPz2KBgnbMGYfk8s9TjFgiWWdzx6Qv6YGArdTgfO0NmXb89gxt7Ad13VAZH7ssqxp7PC+hxoUXLBtbDd+6/FC4d4ZgxhU1AKsA08ZxgL+m6HBQbEXYtLEQmEJxYDFljWfmWcKNS6WspF/4VGFwnKqEZG9HDwgbOjJB4WdF4bxs6mZzGVqiBYZpVMp+OQHy8zAB1uy2TUUAzqxcKzxvTYTbaInOtvaauap6G47x0nCbBoW6V+9JJMZktlM5a7QG3w6w1j1Qk/PJooBRjr9Ce7Ye1CDg+vgo+li8ded2ewBVAMiMfRrPEPIlTSWkgG4Jmcvam39OMUMZugTKAocZ+mMmMyitGnuRw2+Dc6H0SmlbqlFo0YqqO0OvpLkqN07XSj8HcWIZ0eMGGG4mwIGD8eJ0z+ctDWwJy5oa9uLIiISQx9B9CH3pFhUZFxglfZXFCNae3pggkVhHpWxrGUUFxwHi5USI3y4Aoe1FoufpYiIrIrYNfYqJQmGcRBzzV9QTOCKPIaigAXDkZW2TNUAtktX8js2U4Lg1LAWPTJDp237vylB6F9pls0O2j9cLVRUr49hLDJilKATiH6n+oc9yUEtm5MjM7Rj2wv5zVsoIeBGNe2Yth69SYRdO5+gaHiB4oZh/JwSBHOoB4UA64TN/NZfUlKg1B9TmUwsHXBjNrsH18X+NHiwdjVqnkyohHQ+/zCX/xVKCFhCr6eIqMmd01oofJ8lU9W7CXYlmOHeLLXCrlbwABk2X5QJlZ60YVS9eD0qeFp5O7fTBcwo3ZQADGbLVRA1MTTWSpiWdTJ3qfmN7sYrt1a4VqQiTqhwva3kAWFkaTQYTCoUunhafho30vvU2FBUQ1vVvDi/48MPP+ARx0ndljWdK+sM0zCgehvO98n5ep5iACYBljC/UAQYprncqOIMunphYj7/0OKWlhVk25fw5RRmnIY7mNGABZfLRV5UlsCDJxoLWCuRtqzXmTk+SoOEodTXOwqF/6Am6oakTIk2LFLp9EFszkTybxdjNIP+XDEok2OxZbWTaX6MEgZbqXXH5vOxTASZqdRhPNiKYrrtoJaW9ZWOh40CHMZoZLOY6Encfs+iZS39TE/PHygiBlvg2ZTAMyu4kFfxTywMrVwPRxRsOmbHjq0UB9Lpwzljj1ECNbCVy2GAHZmhqy7wi0T7UDRf666H43RSfIi6cL4rrhlC1ho4hiGJ5uQG1dKyimpA1YUupNMHNOKouBLgTjSLxVgmFRYPH46B4DiKgjJnaNQMpY6lBIL9z6s6ursrHmpeDtX34lQKn2dI2qmVwFuc8VgmVMx8HuZGFEmo7H5TNxYYKrrW2KVwuJMb/auTo6PqxmAXUzKPxzLNBykmKNuOxjhK/aG3tfUtigGdw4Zhd0oyvzygVM1tVTVDq2Se95Y3bfsBiguGcRRFgWm+neru3k4xIJPPw7uRxPmFt9pLfF5vMKiKobtaW0fzT+LcdYz71xQKsXg3FhCNZP9zpP1vynFWnBDTDKETdV32roVi1+r19RgkVyehbRuSKGm9vocZ7pov12iTlYKTyWCbUKR9lakKn42ICtV/JqOKpjV2IbidOvcoFO6nOqAqhmaipJ1cqVgKXj8pl4ttJVubUpCEkQbJTioVyx7Cxe7m5QMpQVDYgJDLTTtwkF+9LYWKDI3FN45SEyhB4B7/03SxeDPFCNs0o0lCpTY93te3lmIAaw1ojNh3t9cNSu1gV915LBnWUJ1QkaEXuge21HRWwhACNtg96Vzu4nodLVUKhuNEYmhlmi/NiOnIAvYSTEjQ8cZbWfCcfXQuV9fTRSsydNayxhoJcAOx7djDBuSlvfn89LiZeRnR3hRxyxXncT7FBO4s0dZlDzG4rVYw4x03KZ9/iOqMir25aJqTuec37DQqdmFw5u5qKRSuO6KGNQCDgZ1OHxp11tQ2jLgmVCChJw/JIX7R8QY32I1HFwr3xDXtX5GhedSzmt98AzUYuEJy2M2cSaWWvtPX935c3owwMFP2cCe6iQYJznNfm2WtoFxdxj8DIB8FekD1f46wscDl3soC4JXeXK6T3ZU91EQTTTTRRBNNNNFEE0000UQTTTTRRAUkccF+Ex7QfvjcMXy6lVzQLeS6aevl3jTk3SkaQpdpJSBT3+RwXBkarFG9ncMvOFglaPDBR5wvoddPXM7hXd/9L3A4T/7/iAO22VzJAWfNXUBehWCy4k7J16UccKrQxRxwMv4dHJ7x5ftrHKZywCeOryF3eSv85btzuJDcSRYsdv869R/yRD/j8JQvT3vJM4F7OfwPlQdmBm8MxOWlnDgMcXWZtGdzOC0kLcozhwbObGISaya531DfyOHbhB3iAzGc3Hr7IoePEPy8RPM43CbP9QM7jVD3mEVE++Ho3uto4I4Zf/toFIQG7dHniwcTn8nhK+R+FhtOdawevJbDBz46tBF89fiCwA+pf8Xt/wNt/2kOP+XwG+o/JJW+xwH7Ca+QZx4iZcSJsdjkfIPUzRwOD/uehSPYZnMYyeEuRIAZbQmKvN6u48BY43337JBwtzz4YaG52/dCVOgOib9T6GbKdZCJTpF4fLZ4uMThP9YO+08nwmn8fxTaayUOh2SjEbZIZSIsFxowW3Cp51xfmX5ClfEN2rludPr3qPxS0ieFDvkDc+R9aYMHzZwiNErKODpwH7vu3/al3yZ5wn80qH9W9zJy607JO7vlP36/6KObG5I//cx5Pjow12JfPYCBP5RrCJBP+WiR781yz79MAO2yRdJrQXoVDeQHCCAIMzD2bzlkqf+DuO5aHRqIf5d4LCkYoV+MxhhHbk/Hzb+UOIQ2Dl+V+Bd98f6wpzwcTIeGBgN/ktwe/L+S9hF5FqAZ//uBzF0h8Y9KwZFBNAiOhtIbDI70VRTC6RL/z3KtF7ucK9f/RW7v9WOK5BG7RtCIz1FlzJHnXeErN5hLn5D/rRLpUIZ3hQaSDfWNtTHTyW3UbvLWmqPh0Alt8pjPv3QXa0helfguKQfi/obcOgEz6pWRX5Jn9JKrOfeTd18r6V+T98IUWSZxF/ny97fk1j3yMlLofkseHyBfYPDxkhfdxtqMPU7SbqOBpu0BQruJvM76iMR9R/L0qFxDu2rBdrnErSWvvj4vzwd/7LRY7OOSAI0cPAnoTqpekj0ltFiw3Ule5WmmH8bhLYn/QiDtryT+Grn+LHmNh0Kgol8mj5nRgHol4L0SN1PKsppcSTA+8A6o3ceE9rvkMiQqqdzpoZB62DlekDz5ocs4vURafHcFjIGK9387BAyGBs+R10Dnkydt7gx57rclbgO5ppUfV3PAnrwTyWW+JUI7J0AHEwUCBSZkm+Rpm5TNX1dor155Bna3Qys68u5PBp55LHmdUzOp1mgLArRflviXpdzIwxqJg2k5Wf6jvv0dAdJfa3q0OUwfrYEvphDoF71BA9UW/utGQ0VcHgh/H3jO58hTQ7on+lfr4Zt5WqXCNLlVwg+FFvEnC+135Rr30EgvyPWrvrwOE9rVEvdv5GmAi2hnQHKh8aA5UGFoeDD+flQaY8nVXjvk+bCJYd9pVQ0Jt0+JtF8VmqXkSmDUJzrc/eRJNQBM867UDXaTa4aY5XvWSom7lMoDmw/QUcBkoyvQniTPxLshyMBkYObbJV4fl/yEXN8S8gxoie1y/xCJ+1GgfBp3SPyP5RqMqvkFmma1PCt4gI8WKqCDvX+p/C95mPvN5KloPzCw+h15DBoMPw7Qg/G0FEUPPyNw/0zybLBg0PFamj8ocRgA3i3/wYiX0ED7DqrP9qXHLzbHBreN7UZuJwCtNlXmynW5gfGJvucGAxqg3OlJs8gbe7xDrjb4PXmd/WjJ5/USd59c6/GE/lzyMPIkeqXTq84jr8NXglbljuRvDbm2MeKwkAgfW0Jn2yBxYSet4gCiPsmbFgy3kme7o+0woIZm1Ix/vtCdQV5d5uUZ0yh8y981QgchhLpDZ9s7hK5fUj0txP8SuNchhYWRDsl0eiAET1P6J18GMahpD9y/Qe5hoDTZF86R+HVCB+aDqWJLRSAP6FhgAF1ZM4X283INrwAGQqhcbcf78a/kSXioVwxWZkvcBVQaOh00xFUSULkvkWdStZVIu0BokJ/NkkcwDrSIXr98qNxHGadKvqZKOoz8IZ1GkzcIrHSClTZNqlk8/wB5zIv8gVHQSeF9OJ5cxjqQPHW/Z8gzzpZ7MCV3kziYBa/RwM6vB7AImi9+QJ6Z9Z/kmmew0bMh72knT7CA8U+iEkAPXC+EwV3DWrQ/SuWBgn9DXgiVrk0AuKb8Jsx8if9mIL0e1M2V6/0l07oyusmrBD3S1h+61JVyn1xrJp3pe/448kyasHAHlcY8oTk3EL8vebZ8e0g6SA89gD2cSuORMvmCOQS7FzazQwMHfhpwoYEJbpXrfyTPDvUD7QCmwZ5GaAC//TqVSgPl2Ch0Qe0AW1abgD8I3MO4BJ3zCHLNLC0c15A3Tlskac8RejwL/HNySD6gpV4X+uuoDCbKi6AKg1+Kuk8ecLW8MBi04X4WeYMI2F/a4wGmPExoRpGnboOjUm2PXuR7nm5UPOMUiUcFbpL86hGwtu8ukWtoDvR02LZoRHS2XwjN01IZOsySZz1N4UBa3ZiH+uJR9islHi6rMNUHLwQaBzZiqUms0+UZUOnXB/K2VtKPFVo90LvfV/YOX/6mSRw6T4/EgdnTEmD/oy6h6caRZ7+i/COpNFAHz5Mn2HRZkWaOxL/ny1MpaKEFb4kpeeqTMmptdYvQhO0JPU3y+yx5miAUukcvooGL/tFob5CnMteFBPRsHEKjJREqGz0flfAbGig5weSwk2CKtPreA88D1FORvANtbiLPDr+YPCm/v9Bp+xBuMQyW0CjaxQW1CKaHvTaOXMZCxUHaBQdJe8m9Up+GGEOemsM7X5ffdVIOhMtKpNXm14IS9yFxYLag44eZPL+W9J+Tawxo9WAPg7jlUkakx2f2/G13F3m2O6Q3zAHtZz5LaLT9+g5VBsw6PXgD84JX1pE3oKxmj+UcodebIyaQ15n1gfGn0sDBKIAJIzgm0EnRTiV3tmsm2Vcyh0T+A1AwIHTknvZR+wMqFxU0S14GKXcOeZIaPltUJCQ0pME+kvnnyGUEDa0VwCz69Mm95L0YLd9O3tTuWCnUk3I9XMqBwaJmckjMhZJnaB90WGgGqMTgN0Z6JF2ewiUM3G7vSV7QUSEZMPCFCYQBG8yQGykcYyTdkyXuw20JKfccySxXAMskvXb3PSjvQ37RsY+UMsKe/wca2Haw+6+VfIIONi3qBFJOD/zHVsifH2hbCK8uyQ9MU9QFOhI6XDWHT35M3qc7+MFyjWdu9pUZPIO2gGDKyrvgGkQ7wD8e+4eWmhh6QEBg+rjSAUCQ2tBcY6h+gAA8noZuhzk0ODpkxb2t/wcrYk49D+5jZgAAAABJRU5ErkJggg==' }, // изображение товара
            shortInfo: { type: Array, default: () => [] }, // краткое описание


            mainMoreClass: { type: String, default: '' }, // доп. класс для первого тега карточки
            moreClass: { type: String, default: '' }, // доп. класс для самой карточки

            cart: { type: Boolean, default: false }, // используется ли карточка для отображения в корзине
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

            /// calcInfo - подсчет символов или кол-ва элементов массива
            calcInfo () {
                const {shortInfo} = this.$props
                if (shortInfo.length) {
                    // Если кол-во элементов превышает лимит
                    if (shortInfo.length > 4) return true
                    // Если кол-во элементов меньше лимита но нужно проверить кол-во символов
                    const lengthSymbol = shortInfo.reduce((acc, item) => {
                        acc += item.length
                        return acc
                    }, 0)
                    return lengthSymbol > 217;
                }
                return false
            },
            /*----------------------*/

            /// checkForActive - проверка на активность над элементом
            checkForActive () { return this.$root.$store.getters.CHECK_ACTIVE_COMPONENT(`product-card-id-${this.$props.id}`) },
            /*----------------------*/
        },
        filters: {
            /// mainMoreClass
            mainMoreClass: classList => classList !== '' ? ` ${classList}` : 'normal-block',
            /*----------------------*/

            /// moreClass
            moreClass: classList => `product${classList !== '' ? ` ${classList}` : ''}`,
            /*----------------------*/

            /// activeClass - активный класс для кнопок
            activeClass: active => `button full center no-margin medium${active ? '' : ' border'}`,
            /*----------------------*/

            /// activeShadowForInfo - добавление тени для информации о товаре
            activeShadowForInfo: state => `product-middle-info${state ? ' more' : ''}`,
            /*----------------------*/

            /// moreClassForTitle - доп. классы для заголовка карточки
            moreClassForTitle: (cart, comparison) => {
                return cart ? ( comparison ? 'product-top-title all' : 'product-top-title has-cart' ) : ( comparison ? 'product-top-title has-comparison' : 'product-top-title')
            },
            /*----------------------*/
        },
        methods: {
            /// getTitle - получение системного сообщения в зависимости от языка
            getTitle (mes) {
                return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes)
            },
            /*----------------------*/

            /// actionForBtn
            actionForBtn (method = '', param = {id = -1, count = 1} = {id: -1, count: 1}) {
                const {id, count} = param // Получаем значенияs
                const {$store: store} = this.$root
                this.setLoading() // Запускаем индикацию загрузки
                const callback = () => {
                    // Если действие завершилось, в основном нужно для того чтобы скрыть индикацию загрузки
                    setTimeout(() => {
                        this.removeLoading()
                    }, 2000)
                }
                switch (method) {
                    case 'add-cart' : store.dispatch('changeCart', {id, count, callback}); break;
                    case 'remove-cart': store.dispatch('removeFromCart', {id, callback}); break;
                    case 'add-comparison' : store.dispatch('addToComparison', {id, callback}); break;
                    case 'remove-comparison': store.dispatch('removeFromComparison', {id, callback}); break;
                }
            },
            /*----------------------*/

            /// changeCountFromCart - изменение кол-ва в корзине
            changeCountFromCart (value, useTimeOut = true) {
                const funcSendRequest = (id = -1, count = -1) => {
                    const clearId = id * 1,
                        clearCount = count * 1
                    if ((Number.isInteger(clearCount) && clearCount > -1) &&
                        (Number.isInteger(clearId) && clearId > -1)) {
                        return {id: clearId, count: clearCount}
                    }
                    return {id, count}
                }

                // Проверка на использование таймаута при изменение кол-ва
                if (useTimeOut) {
                    if (this.timeOutAction !== '') {
                        clearTimeout(this.timeOutAction)
                        this.timeOutAction = ''
                    }
                    // Таймаут нужен для того чтобы запрос на изменение обрабатывался с задержкой
                    this.timeOutAction = setTimeout(() => {
                        const result = funcSendRequest(this.$props.id, value)
                        const {id, count} = result
                        if ((Number.isInteger(count) && count > -1) && (Number.isInteger(id) && id > -1))
                            this.actionForBtn('add-cart', result)
                    }, 750)
                } else {
                    if (this.timeOutAction !== '') {
                        clearTimeout(this.timeOutAction)
                        this.timeOutAction = ''
                    }
                    const result = funcSendRequest(this.$props.id, value)
                    const {id, count} = result
                    if ((Number.isInteger(count) && count > -1) && (Number.isInteger(id) && id > -1))
                        this.actionForBtn('add-cart', result)
                }
            },
            /*----------------------*/

            /// btnCartAction - действия по нажатию на кнопку корзины
            btnCartAction () {
                const clearId = this.$props.id * 1
                if (this.$root.$store.getters.CHECK_PRODUCT_IN_CART(clearId))
                    this.actionForBtn('remove-cart', {id: clearId})
                else
                    this.actionForBtn('add-cart', {id: clearId, count: 1})
            },
            /*----------------------*/

            /// btnComparisonAction - действия по нажатию на кнопку сравнения
            btnComparisonAction () {
                const clearId = this.$props.id * 1
                if (this.$root.$store.getters.CHECK_PRODUCT_IN_COMPARISON(clearId))
                    this.actionForBtn('remove-comparison', {id: clearId})
                else
                    this.actionForBtn('add-comparison', {id: clearId})
            },
            /*----------------------*/

            /// setLoading - установка индикации загрузки
            setLoading () { this.$root.$store.dispatch('setActiveComponent', {id: `product-card-id-${this.$props.id}`, active: true}) },
            /*----------------------*/

            /// removeLoading - удаление индикации загрузки
            removeLoading () { this.$root.$store.dispatch('setActiveComponent', {id: `product-card-id-${this.$props.id}`, active: false}) },
            /*----------------------*/
        },
        components: {
            Count,
            LoadingIndicator,
            ProductCardCartPrice
        }
    }
</script>
