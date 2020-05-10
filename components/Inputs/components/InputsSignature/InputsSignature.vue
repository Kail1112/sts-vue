<template>
  <span v-if="signature !== ''" class="label-signature" v-html="signature"></span>
</template>

<script>
  export default {
    name: "InputsSignature",
    props: {
      signature: {
        type: String,
        default: ''
      }
    }
  }
</script>
