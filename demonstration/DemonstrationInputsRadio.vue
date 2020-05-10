<template>
  <div class="normal-block">
    <div class="normal-block margin-top margin-bottom">
      <h2>Radio <code><{{"RadioInput type='radio'"}}/></code></h2>
      <h3>вариант №1</h3>
      <hr/>
    </div>
    <div class="normal-block margin-bottom">
      <div class="row">
        <div class="col-auto">
          <div class="normal-block margin-bottom">
            <RadioInput :checked='true' :signature="'Radio, по дефолту всегда будет radio, даже если не передать пропс'" :name="'test-radio-1'"/>
          </div>
        </div>
        <div class="col-auto">
          <div class="normal-block margin-bottom">
            <RadioInput :signature="'Radio, чтобы снять флаг с предыдущего'" :name="'test-radio-1'"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import RadioInput from "../components/RadioInput/RadioInput";

    export default {
        name: "DemonstrationInputsRadio",
        components: {
            RadioInput
        }
    }
</script>
