<template>
  <span v-if="signature !== ''" class="switch-input__signature" v-html="signature"></span>
</template>

<script>
  export default {
    name: "RadioInputSignature",
    props: {
      signature: { type: String, default: '' }
    }
  }
</script>
