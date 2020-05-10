<template>
  <div class="container">
    <DemonstrationInputsRadio/>
    <DemonstrationCheckbox/>
    <DemonstrationInputsFields/>
    <DemonstrationTypography/>
    <DemonstrationBtns/>
  </div>
</template>

<script>
  import DemonstrationInputsRadio from "../demonstration/DemonstrationInputsRadio";
  import DemonstrationCheckbox from "../demonstration/DemonstrationCheckbox";
  import DemonstrationInputsFields from "../demonstration/DemonstrationInputsFields";
  import DemonstrationTypography from "../demonstration/DemonstrationTypography";
  import DemonstrationBtns from "../demonstration/DemonstrationBtns";

  export default {
      name: 'index',
      components: {
          DemonstrationInputsRadio,
          DemonstrationCheckbox,
          DemonstrationInputsFields,
          DemonstrationTypography,
          DemonstrationBtns
      }
  }
</script>
