<template>
  <div class="animation-block">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: "WrapperAnimation",
    mounted() {
      console.log(this.$slots)
    }
  }
</script>
