<template>
  <div class="normal-block">
    <div v-if="btn.tagName === 'div'"
         @click="onClickBtn"
         :class="isActive | isActiveBtn(btn.className)">
      <slot/>
    </div>
    <button v-if="btn.tagName === 'button'"
            @click="onClickBtn"
            :class="isActive | isActiveBtn(btn.className)">
      <slot/>
    </button>
  </div>
</template>

<script>
    export default {
        name: "PopUpBtn",
        props: {
            btn: { type: Object, default: () => ({tagName: '', className: ''})},
            isActive: { type: Boolean, default: false },
            onClickBtn: { type: Function, default: () => null }
        },
        filters: {
            /// isActiveBtn
            isActiveBtn: (active, mainClass) => {
                return `${mainClass}${active ? ' active': ''}`
            },
            /*----------------------*/
        }
    }
</script>
