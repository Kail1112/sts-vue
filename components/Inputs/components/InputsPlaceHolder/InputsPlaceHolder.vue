<template>
  <span v-if="placeholder !== ''" class="label-placeholder" v-html="placeholder"></span>
</template>

<script>
  export default {
    name: "InputsPlaceHolder",
    props: {
      placeholder: { type: String, default: '' }
    }
  }
</script>
