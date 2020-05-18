<template>
  <div class="container">
    <DemonstrationCardProduct/>
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
  import DemonstrationCardProduct from "../demonstration/DemonstrationCardProduct";

  export default {
      name: 'index',
      components: {
          DemonstrationInputsRadio,
          DemonstrationCheckbox,
          DemonstrationInputsFields,
          DemonstrationTypography,
          DemonstrationBtns,
          DemonstrationCardProduct
      }
  }
</script>
