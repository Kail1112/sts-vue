<template>
  <span class="label-input-holder">
    <input :type="type"
           v-model="val"/>
    <InputsPlaceHolder :placeholder="placeholder"/>
  </span>
</template>

<script>
  import InputsPlaceHolder from "../InputsPlaceHolder/InputsPlaceHolder";

  export default {
      name: "InputsText",
      data () {
          return {
              val: ''
          }
      },
      watch : {
          async val (value) {
              if (value !== undefined) {
                  const {callback} = this.$props
                  const result = await callback(value)
                  if (result !== null && result !== false) this.val = result
              }
          }
      },
      props: {
          placeholder: { type: String, default: '' },
          type: { type: String, default: 'text' },
          callback: { type: Function, default: () => null },
          startValue: { type: String, default: '' }
      },
      components: {
          InputsPlaceHolder
      },
      mounted () {
          const {startValue} = this.$props
          if (startValue !== '') this.val = startValue
      }
  }
</script>
