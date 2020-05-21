<template>
  <label :class="moreClass | moreClass">
    <input :type="type"
           :checked="checked"
           :name="name"
           @change="change" />
    <span class="switch-input__indicator"><span class="switch-input__dot"></span></span>
    <RadioInputSignature :signature="signature"/>
  </label>
</template>

<script>
  import './index.scss';

  import RadioInputSignature from "./components/RadioInputSignature/RadioInputSignature";

  export default {
    name: "RadioInput",
    props: {
      type: { type: String, default: 'radio' },
      checked: { type: Boolean, default: false },
      signature: { type: String, default: '' },
      name: { type: String, default: '' },
      moreClass: { type: String, default: '' },
      callback: { type: Function, default: () => null }
    },
    methods: {
      change (e) {
        this.$props.callback(e.target.checked)
      }
    },
    filters: {
      moreClass: state => state !== '' ? `switch-input ${state}` : 'switch-input',
    },
    components: {
      RadioInputSignature
    }
  }
</script>
