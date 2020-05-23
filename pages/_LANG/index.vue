<template>
  <div class="container">
    <router-link :to="{ path: '/en' }">en</router-link>
    <DemonstrationCardProduct/>
    <DemonstrationCardProduct2/>
    <DemonstrationInputsRadio/>
    <DemonstrationCheckbox/>
    <DemonstrationInputsFields/>
    <DemonstrationTypography/>
    <DemonstrationBtns/>
  </div>
</template>

<script>
    import asyncMain from "../../service/asyncMain";

    import DemonstrationInputsRadio from "../../demonstration/DemonstrationInputsRadio";
    import DemonstrationCheckbox from "../../demonstration/DemonstrationCheckbox";
    import DemonstrationInputsFields from "../../demonstration/DemonstrationInputsFields";
    import DemonstrationTypography from "../../demonstration/DemonstrationTypography";
    import DemonstrationBtns from "../../demonstration/DemonstrationBtns";
    import DemonstrationCardProduct from "../../demonstration/DemonstrationCardProduct";
    import DemonstrationCardProduct2 from "../../demonstration/DemonstrationCardProduct2";

    export default {
        name: 'index',
        async asyncData (app) {
            await asyncMain(app)
        },
        components: {
            DemonstrationInputsRadio,
            DemonstrationCheckbox,
            DemonstrationInputsFields,
            DemonstrationTypography,
            DemonstrationBtns,
            DemonstrationCardProduct,
            DemonstrationCardProduct2
        }
    }
</script>
