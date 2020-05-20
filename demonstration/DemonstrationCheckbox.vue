<template>
  <div class="normal-block">
    <div class="normal-block margin-bottom">
      <h2>Checkbox <code><{{"RadioInput type='checkbox'"}}/></code></h2>
      <h3>вариант №1</h3>
      <hr/>
    </div>
    <div class="normal-block margin-bottom">
      <div class="row">
        <div class="col-md-12 col-xl-8">
          <div class="normal-block margin-bottom">
            <RadioInput :type="'checkbox'" :signature="'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'"/>
          </div>
        </div>
        <div class="col-md-12 col-xl-8">
          <div class="normal-block margin-bottom">
            <RadioInput :type="'checkbox'" :signature="'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'"/>
          </div>
        </div>
        <div class="col-md-12 col-xl-8">
          <div class="normal-block margin-bottom">
            <RadioInput :type="'checkbox'" :signature="'when an unknown printer took a galley of type and scrambled it to make a type specimen book.'"/>
          </div>
        </div>
        <div class="col-md-12 col-xl-8">
          <div class="normal-block margin-bottom">
            <RadioInput :type="'checkbox'" :checked='true' :signature="'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import RadioInput from "../components/RadioInput/RadioInput";

    export default {
        name: "DemonstrationCheckbox",
        components: {
            RadioInput
        }
    }
</script>
