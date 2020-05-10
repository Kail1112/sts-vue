<template>
  <!--  Если нужно отобразить одиночный инпут-->
  <label v-if="mode === 'single'" :class="input | classForLabel(error, success)">
    <InputsText :placeholder="placeholder[0]"
                :type="type"
                :startValue="startValue"
                :callback="checkOnChange"/>
    <InputsSignature :signature="signature[0]"/>
  </label>
  <!--  Если нужно отобразить одиночный инпут - END-->

  <!--  Если нужно отобразить инпуты генерации пароля-->
  <InputsPasswordConfirm v-else-if="mode === 'password-confirm'"/>
  <!--  Если нужно отобразить инпуты генерации пароля - END-->
</template>

<script>
  import './index.scss';

  import maskInput from "../../utils/mask-input";

  import InputsSignature from "./components/InputsSignature/InputsSignature";
  import InputsText from "./components/InputsText/InputsText";
  import InputsPasswordConfirm from "./components/InputsPasswordConfirm/InputsPasswordConfirm";

  export default {
      name: "Inputs",
      data () {
          return {
              input: false, /// был ли введен символ
              error: false, /// была ли ошибка
              success: false /// успешно ли
          }
      },
      props: {
          mode: { type: String, default: 'single' }, /// способ отображения
          placeholder: { type: Array,  default: () => [''] }, ///
          signature: { type: Array, default: () => [''] }, /// подпись под полем для ввода
          type: { type: String, default: 'text' }, /// тип полей для ввода
          startValue: { type: String, default: '' }, /// стартовое значение
          callback: { type: Function, default: () => null }, /// колбек изменения данных
          onSuccess: { type: Function, default: () => null }, /// колбек успешный
          onError: { type: Function, default: () => null }, /// колбек с ошибкой
          patternToCheck: { type: String, default: '' }, /// регулярка проверки правильности заполнения
          mask: { type: String, default: '' } /// маска заполнения
      },
      methods : {
          /// changeInput
          changeInput (status) { this.input = status },
          /*----------------------*/

          /// changeError
          changeError (status) { this.error = status },
          /*----------------------*/

          /// changeSuccess
          changeSuccess (status) { this.success = status },
          /*----------------------*/

          /// regularFunction
          regularFunction (reg, string) {
            return new RegExp(reg, 'gi').test(string)
          },
          /*----------------------*/

          /// setError - установка флага ошибки
          setError (val) {
              if (!this.error) this.changeError(true)
              if (this.success) this.changeSuccess(false)
              this.$props.onError({type: 'error', value: val})
              return 'error'
          },
          /*----------------------*/

          /// setSuccess - установка флага удачного набора
          setSuccess (val) {
              if (this.error) this.changeError(false)
              if (!this.success) this.changeSuccess(true)
              this.$props.onSuccess({type: 'success', value: val})
              return 'success'
          },
          /*----------------------*/

          /// checkOnChange - проверка данных
          checkOnChange (val) {
              let typeCallback = 'undefined'
              let value = val
              this.changeInput(val !== '')
              const {type, mask, patternToCheck, callback} = this.$props
              const {input, error, success, changeInput, changeSuccess, changeError, setSuccess, setError, regularFunction} = this

              /// проверка данных на соответствие
              if (value !== '') {
                  if (mask !== '') {
                      const filters = {
                          S: (symbol) => /[a-zA-Z]/g.test(symbol),
                          D: (symbol) => Number.isInteger(symbol * 1)
                      }
                      const result = maskInput(value, filters, mask)
                      if (result !== '') { if (!input) changeInput(true) }
                      else { if (input) changeInput(false) }
                      value = result
                  }
                  if (type === 'email') {
                      const regEmail = regularFunction('(\\d|\\w)*\\@(\\d|\\w){2,}\\.(\\d|\\w){2,}', value)
                      if (regEmail) typeCallback = setSuccess(value)
                      else typeCallback = setError(value)
                  } else {
                      if (patternToCheck !== '') {
                          const testRegular = regularFunction(patternToCheck, value)
                          if (testRegular) typeCallback = setSuccess(value)
                          else typeCallback = setError(value)
                      }
                  }
              } else {
                  if (error) changeError(false)
                  if (success) changeSuccess(false)
              }
              /*---------------------------------------*/

              /// Генерация колбека
              callback({type: typeCallback, value})
              return value
          },
          /*----------------------*/
      },
      filters: {
          /// classForLabel
          classForLabel: (input = false, error = false, success = false) => {
            return `label-input${input ? ' val' : ''}${error ? ' error' : ''}${success ? ' success' : ''}`
          }
          /*----------------------*/
      },
      components: {
          InputsSignature,
          InputsText,
          InputsPasswordConfirm
      }
  }
</script>
