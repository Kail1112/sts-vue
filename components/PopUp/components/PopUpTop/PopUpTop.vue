<template>
  <div class="popup-top" ref="popup-top">
    {{/* back btn */}}
    <button v-if="hasBackBtn" class="popup-top__left" @click="goBack">
      <span class="sts-icon sts-iconarrow-left"></span>
    </button>
    {{/* back btn - END */}}

    {{/* title */}}
    <h3 v-if="title" ref="popup-title">{{title}}</h3>
    {{/* title - END */}}

    {{/* close popup */}}
    <button v-if="hasCloseBtn" class="popup-top__right" @click="closePopUp">
      <span class="sts-icon sts-iconclose"></span>
    </button>
    {{/* close popup - END */}}
  </div>
</template>

<script>
    import './index.scss';

    export default {
        name: "PopUpTop",
        props: {
            title: { type: String, default: '' },
            hasBackBtn: { type: Boolean, default: false }, /// нужно ли отображать кнопку возврата
            backBtnFunction: { type: Function, default: () => null }, /// функция которая будет вызывать по нажатию на кнопку возврата
            hasCloseBtn: { type: Boolean, default: false }, /// нужно ли отображать кнопку закрытия
            closeBtnFunction: { type: Function, default: () => null } /// функция которая так-же будет вызвана с закрытие попапа
        },
        methods: {
            /// goBack - вернуться обратно
            goBack () { this.$props.backBtnFunction() },
            /*----------------------*/

            /// closePopUp - закрытие попапов
            closePopUp () {
                this.$root.$store.dispatch('changePopUoOpen', '')
                this.$props.closeBtnFunction()
            },
            /*----------------------*/
        },
        mounted () {
            const refs = this.$refs,
                checkTitle = refs['popup-title'] ?? undefined,
                checkTop = refs['popup-top'] ?? undefined;
            (checkTitle !== undefined && checkTop !== undefined) && (checkTitle.style.maxWidth = `${checkTop.clientWidth}px`)
        }
    }
</script>
