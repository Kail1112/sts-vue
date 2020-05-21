<template>
  <div :class="error | stateClass(hasSelectedValue, dropIsOpened)">
    <div class="select-holder">
      {{/* now selected */}}
      <p class="select-text"
         @click="openDrop"
         ref="val">{{destructValue}}</p>
      {{/* now selected - END */}}

      {{/* placeholder */}}
      <p class="select-placeholder"
         @click="openDrop">{{placeholder}}</p>
      {{/* placeholder - END */}}

      {{/* arrow */}}
      <div class="sts-icon sts-iconarrow-bottom"
           @click="openDrop"></div>
      {{/* arrow - END */}}

      {{/* drop down */}}
      <SelectDrop :open="isOpen"
                  :values="values"
                  :start-value="startValue"
                  :callback="callbackForDrop"/>
      {{/* drop down - END */}}
    </div>
  </div>
</template>

<script>
  import './index.scss';

  import SelectDrop from "./components/SelectDrop/SelectDrop";

  import objForEach from "../../utils/object-for-each";

  export default {
    name: "Select",
    data () {
      return {
        value: {
          normal: '',
          checkbox: {},
          radio: ''
        },
        selected: false,
        error: false,

        dropIsOpened: false
      }
    },
    watch: {
      /// value
      value (val) {
        const result = []
        objForEach(val, (item, key) => {
          if (key === 'normal' || key === 'radio') {
            item !== '' && result.push(item)
          } else {
            objForEach(item, (el) => el !== '' ? result.push(el) : undefined)
          }
        })
        this.$props.callback({type: 'change', val: result})
      },
      /*----------------------*/
    },
    props: {
      id: { type: String, default: '', required: true },
      placeholder: { type: String, default: '' },
      values: { type: Array, default: () => [] },
      startValue: { type: Number, default: -1 },
      callback: { type: Function, default: () => null }
    },
    computed: {
      /// isOpen - открыт ли селектор
      isOpen () {
        const check = `select-id-${this.$props.id}` === this.$root.$store.getters.GET_NOW_OPEN_SELECT
        if (!check) this.dropIsOpened && (this.dropIsOpened = false)
        return check
      },
      /*----------------------*/

      /// destructValue - получение всех выбранных значений
      destructValue () {
        let result = ''
        objForEach(this.value, (item, key) => {
          if (key === 'normal' || key === 'radio') {
            if (item !== '') {
              result += result === '' ? item : `, ${item}`
            }
          } else {
            objForEach(item, (el) => result += result === '' ? el : `, ${el}`)
          }
        })
        return result
      },
      /*----------------------*/

      /// hasSelectedValue - есть ли выбранные элементы
      hasSelectedValue () {
        let result = 0
        objForEach(this.value, (item, key) => {
          if (key === 'normal' || key === 'radio')
            item !== '' && (result++)
          else
            objForEach(item, (el) => result += el !== '' ? 1 : 0)
        })
        return !!result
      },
      /*----------------------*/
    },
    methods: {
      /// getTitle - получение системного сообщения в зависимости от языка
      getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) },
      /*----------------------*/

      /// openDrop - открыть выбор вариантов
      openDrop () {
        if (this.dropIsOpened) {
          // Если нужно закрыть
          this.$root.$store.dispatch('changeSelectOpen', '')
          this.dropIsOpened = false
        } else {
          // Если нужно открыть
          this.$root.$store.dispatch('changeSelectOpen', `select-id-${this.$props.id}`)
          this.dropIsOpened = true
        }
      },
      /*----------------------*/

      /// callbackForDrop - колбек для отслеживания изменений в dropdown'e
      callbackForDrop (params) { this.value = params },
      /*----------------------*/
    },
    filters: {
      /// stateClass
      stateClass: (error, selected, dropIsOpened) => `select${error ? ' error' : (selected ? (dropIsOpened ? ' open val'  : ' val') : (dropIsOpened ? ' open' : ''))}`,
      /*----------------------*/
    },
    components: {
      SelectDrop
    }
  }
</script>
