<template>
  <div :class="error | stateClass(hasSelectedValue, dropIsOpened, moreClass)">
    <div class="select-holder">
      {{/* now selected */}}
      <p class="select-text"
         @click="openDrop"
         ref="val">{{destructValue}}</p>
      {{/* now selected - END */}}

      {{/* placeholder */}}
      <p class="select-placeholder"
         @click="openDrop" v-html="placeholder"></p>
      {{/* placeholder - END */}}

      {{/* arrow */}}
      <div class="sts-icon sts-iconarrow-bottom"
           @click="openDrop"></div>
      {{/* arrow - END */}}

      {{/* drop down */}}
      <SelectDrop :open="isOpen"
                  :values="values"
                  :start-value="startValue"
                  :close-on-click="closeOnClick"
                  :callback="callbackForDrop"/>
      {{/* drop down - END */}}
    </div>
  </div>
</template>

<script>
    import './index.scss';

    import SelectDrop from "./components/SelectDrop/SelectDrop";

    import objForEach from "../../utils/object-for-each";
    import destructStateSelect from "../../utils/destruct-state-select";

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
                workCallback: false,

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
                if (this.workCallback || this.$props.initOnStart) {
                    this.$props.callback({type: 'change', val: result})
                } else {
                    !this.workCallback && (this.workCallback = true)
                }
            },
            /*----------------------*/
        },
        props: {
            id: { type: String, default: '', required: true },
            placeholder: { type: String, default: '' },
            values: { type: Array, default: () => [] },
            startValue: { type: Number, default: -1 },
            moreClass: { type: String, default: '' },
            closeOnClick: { type: Boolean, default: true },
            initOnStart: { type: Boolean, default: false },
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
                return destructStateSelect(this.value)
            },
            /*----------------------*/

            /// hasSelectedValue - есть ли выбранные элементы
            hasSelectedValue () {
                return destructStateSelect(this.value) !== ''
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
            stateClass: (error, selected, dropIsOpened, moreClass) => `${moreClass !== '' ? `${moreClass} ` : ''}select${error ? ' error' : (selected ? (dropIsOpened ? ' open val'  : ' val') : (dropIsOpened ? ' open' : ''))}`,
            /*----------------------*/
        },
        components: {
            SelectDrop
        }
    }
</script>
