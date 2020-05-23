<template>
  <div class="header-top">
    <div class="container">
      <div class="header-top-wrapper">
        <div class="row justify-space-between align-items-center">
          <div class="col-auto">
            <Select :id="'header-select-lang-system'"
                    :placeholder="`<b>${getTitle('lang')}:</b>`"
                    :values="getLangArray"
                    :more-class="'select-simple'"
                    :close-on-close="true"
                    :start-value="0"
                    :callback="changeLang"/>
          </div>

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
    import Select from "../../../Select/Select";

    export default {
        name: "HeaderTop",
        data () {
            return {
                lang: [
                    { id: 0, short: 'ru', value: 'russian' },
                    { id: 1, short: 'en', value: 'english' }
                ]
            }
        },
        computed: {
            /// getLangArray - получение списка языков
            getLangArray () {
                const {lang, getTitle} = this
                const curLang = this.$root.$store.getters.GET_SYSTEM_LANG
                return lang.reduce((acc, item, index) => {
                    let cloneItem = {...item}
                    const {short, value} = cloneItem
                    cloneItem['value'] = getTitle(value)
                    cloneItem['type'] = 'normal'
                    cloneItem['name'] = `header-select-lang-system-${index + 1}`
                    if (short === curLang) {
                        acc = [cloneItem, ...acc]
                    } else {
                        acc.push(cloneItem)
                    }
                    return acc
                }, [])
            },
            /*----------------------*/
        },
        methods: {
            /// getTitle - получение системного сообщения в зависимости от языка
            getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
            /*----------------------*/

            /// changeLang - изменение языка
            changeLang (param) {
                if (param.val[0] !== undefined) {
                    const {getTitle} = this
                    const el = this.lang.find(el => getTitle(el.value) === param.val[0])
                    if (el !== undefined) {
                        let link = `/${el.short}`
                        if (this.$root.$route.params.hasOwnProperty('LANG')) {
                            link = `/${el.short}/${this.$root.$route.fullPath.split('/').slice(2).join('/')}`
                        } else {
                            const splitPath = this.$root.$route.fullPath.split('/').slice(1)
                            if (this.$root.$store.getters.HAS_LANGUAGE(splitPath[0])) {
                                splitPath[0] = el.short
                                link = `/${splitPath.join('/')}`
                            }
                        }
                        this.$root.$router.push({ path: link })
                    }
                }
            },
            /*----------------------*/
        },
        components: {
            HeaderUserPanel,
            Select
        }
    }
</script>
