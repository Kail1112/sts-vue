<template>
    <div class="normal-block">
      <label :class="hasValueFirst | classForLabels(success, error)">
        <InputsText :placeholder="placeholder[0]"
                    :type="type"
                    :callback="onChangeFirst"/>
        <InputsSignature :signature="signature[0]"/>
      </label>
      <label :class="hasValueSecond | classForLabels(success, error)">
        <InputsText :placeholder="placeholder[1]"
                    :type="type"
                    :callback="onChangeSecond"/>
        <InputsSignature v-if="signature[1] !== undefined" :signature="signature[1]"/>
      </label>
      <RadioInput :type="'checkbox'"
                  :signature="'Показать пароль'"
                  :callback="onChangeShowPassword"/>
    </div>
</template>

<script>
    import InputsText from "../InputsText/InputsText";
    import InputsSignature from "../InputsSignature/InputsSignature";
    import RadioInput from "../../../RadioInput/RadioInput";

    export default {
        name: "InputsPasswordConfirm",
        data () {
            return {
                type: 'password',
                error: false,
                success: false,
                valueFirst: '', /// Запись в первом поле
                hasValueFirst: false, /// Есть ли запись в первом поле
                valueSecond: '', /// Запись в втором поле
                hasValueSecond: false /// Есть ли запись в втором поле
            }
        },
        props: {
            placeholder: { type: Array, default: () => ['Придумайте пароль', 'Повторите пароль']},
            signature: { type: Array, default: () => ['', '']},
            callback: { type: Function, default: () => null },
            onSuccess: { type: Function, default: () => null },
            onError: { type: Function, default: () => null }
        },
        methods: {
            /// onChange - функция изменения данных в полях
            onChange ({keyValue, keyHasChange, value}) {
                const alternativeKeyValue = keyValue === 'valueFirst' ? 'valueSecond' : 'valueFirst'
                const {callback, onSuccess, onError} = this.$props
                let typeCallback = 'undefined'
                this[keyHasChange] = value !== '';
                this[keyValue] = value
                if (value !== this[alternativeKeyValue]) {
                    this.success = false
                    this.error = true
                    typeCallback = 'error'
                    onError({type: typeCallback, value: {valueFirst: this['valueFirst'], valueSecond: this['valueSecond']}})
                } else {
                    if (value !== '' || this[alternativeKeyValue] !== '') {
                        this.success = true
                        typeCallback = 'success'
                        onSuccess({type: typeCallback, value: {valueFirst: this['valueFirst'], valueSecond: this['valueSecond']}})
                    }
                    this.error = false
                }
                callback({type: typeCallback, value: {valueFirst: this['valueFirst'], valueSecond: this['valueSecond']}})
            },
            /*----------------------*/

            /// onChangeFirst
            onChangeFirst (value) {
                this.onChange({keyValue: 'valueFirst', keyHasChange: 'hasValueFirst', value})
                return false
            },
            /*----------------------*/

            /// onChangeSecond
            onChangeSecond (value) {
                this.onChange({keyValue: 'valueSecond', keyHasChange: 'hasValueSecond', value})
                return false
            },
            /*----------------------*/

            /// onChangeShowPassword - функция смены отображения в полях
            onChangeShowPassword (checked) {
                if (checked)
                    this.type = 'text'
                else
                    this.type = 'password'
            }
            /*----------------------*/
        },
        filters: {
            /// classForLabels - установка нужных классов
            classForLabels: (value = false, success = false, error = false) => `label-input${value ? ' val' : ''}${error ? ' error' : ''}${success ? ' success' : ''}`,
            /*----------------------*/
        },
        components: {
            InputsText,
            InputsSignature,
            RadioInput
        }
    }
</script>
