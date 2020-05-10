<template>
  <div class="normal-block">
    <HeaderSystem/>
    <HeaderUser :event-add-elements="eventAddElements"/>
  </div>
</template>

<script>
  import HeaderSystem from "../HeaderSystem/HeaderSystem";
  import HeaderUser from "../HeaderUser/HeaderUser";

  export default {
    name: "HeaderRight",
    props: {
      eventAddElements: { type: Function, default: () => null }
    },
    components: {
      HeaderSystem,
      HeaderUser
    }
  }
</script>
