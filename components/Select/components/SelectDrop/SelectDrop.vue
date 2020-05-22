<template>
  <div v-if="open && values.length > 0" class="select-drop">
    <ul>
      <li v-for="({value: valueItem, type, name}, index) in values"
          :key="`drop-item-${index}-${name}`">
        {{/* привычное отображение тега select */}}
        <span v-if="type === 'normal'"
              :class="index === values.length - 1 | classForNormalOption(value.normal === valueItem)"
              @click="selectOption(type, valueItem, name)">
                      {{valueItem}}
                    </span>
        {{/* привычное отображение тега select - END */}}

        {{/* отображение в виде checkbox */}}
        <RadioInput v-if="type === 'checkbox'"
                    :type="'checkbox'"
                    :checked="value.checkbox[name] !== undefined"
                    :signature="valueItem"
                    :name="name"
                    :more-class="index === values.length - 1 | classForOtherTypeOption('input-checkbox')"
                    :callback="() => selectOption(type, valueItem, name)"/>
        {{/* отображение в виде checkbox - END */}}

        {{/* отображение в виде radio */}}
        <RadioInput v-if="type === 'radio'"
                    :type="'radio'"
                    :checked="value.radio === valueItem"
                    :signature="valueItem"
                    :name="name"
                    :more-class="index === values.length - 1 | classForOtherTypeOption('input-radio')"
                    :callback="() => selectOption(type, valueItem, name)"/>
        {{/* отображение в виде radio - END */}}
      </li>
    </ul>
  </div>
</template>

<script>
  import './index.scss';

  import RadioInput from "../../../RadioInput/RadioInput";

  export default {
    name: "SelectDrop",
    data () {
      return {
        value: {
          normal: '',
          checkbox: {},
          radio: ''
        },
      }
    },
    props: {
      open: { type: Boolean, default: false }, // открыт ли dropdown
      values: { type: Array, default: () => [] }, // значения
      startValue: { type: Number, default: -1 },
      closeOnClose: { type: Boolean, default: false },
      callback: { type: Function, default: () => null }
    },
    methods: {
      /// selectOption - метод изменения выбранных данных
      selectOption (type = '', value = '', name = '') {
        let cloneValue = {...this.value}
        if (type !== '' && value !== '' && name !== '') {
          switch (type) {
            case "normal": {
              if (cloneValue['normal'] === value)
                cloneValue['normal'] = ''
              else
                cloneValue['normal'] = value
            } break;
            case "radio": {
              if (cloneValue['radio'] === value)
                cloneValue['radio'] = ''
              else
                cloneValue['radio'] = value
            } break;
            default: {
              let cloneCheckboxValue = {...cloneValue['checkbox']}
              if (cloneCheckboxValue[name] === undefined) {
                cloneCheckboxValue[name] = value
              } else {
                delete cloneCheckboxValue[name]
              }
              cloneValue['checkbox'] = cloneCheckboxValue
            } break;
          }
          this.value = cloneValue
          this.$props.callback(cloneValue)
          if (this.$props.closeOnClose) {
            this.$root.$store.dispatch('changeSelectOpen', '')
          }
        }
      },
      /*----------------------*/
    },
    filters: {
      /// classForNormalOption - установка списка классов для обычного отображения
      classForNormalOption: (lastIndex = false, active = false) => `select-normal${lastIndex ? ' last' : ''}${active ? ' active' : ''}`,
      /*----------------------*/

      /// classForOtherTypeOption - установка списка классов для остальных типов отображения
      classForOtherTypeOption: (last = false, classList = '') => `${classList}${last ? ' last' : ''}`,
      /*----------------------*/
    },
    components: {
      RadioInput
    },
    mounted () {
      const {startValue, values, callback} = this.$props
      if (startValue !== -1) {
        if (values[startValue] !== undefined) {
          const startType = values[startValue].type
          switch (startType) {
            case "normal": this.value['normal'] = values[startValue].value; break;
            case "radio": this.value['radio'] = values[startValue].value; break;
            default: {
              let template = {}
              template[values[startValue].name] = values[startValue].value
              this.value['checkbox'] = {...template}
            } break;
          }
          callback(this.value)
        }
      }
    }
  }
</script>
