<template>
  <div class="normal-block">
    <div class="normal-block margin-top margin-bottom">
      <h2>Поля для ввода <code><{{'Input'}}/></code></h2>
      <hr/>
    </div>
    <div class="normal-block margin-bottom">
      <div class="row">
        <div class="col-md-12 col-xl-8">
          <Inputs :placeholder="['Тестовое поле']"
                  :startValue="'Стартовое тестовое значение'"
                  :signature="['Тестовая подпись']"/>
        </div>
        <div class="col-md-12 col-xl-8">
          <Inputs :placeholder="['Пустое тестовое поле']"/>
        </div>
        <div class="col-md-12 col-xl-8">
          <Inputs :placeholder="['Пароль']" :type="'password'"/>
        </div>
      </div>
    </div>

    <div class="normal-block margin-top margin-bottom">
      <h3>Проверка полей <code><{{"Input type='email'/>"}}></code> или <code><{{"Input patternToCheck='\\d{1,2}'/>"}}></code></h3>
    </div>
    <div class="normal-block margin-bottom">
      <div class="row">
        <div class="col-md-12 col-xl-12">
          <Inputs :placeholder="['E-mail']"
                  :type="'email'"/>
        </div>
        <div class="col-md-12 col-xl-12">
          <Inputs :placeholder="['Введите номер телефона']"
                  :signature="['Правильный ответ - +998 (93) 514-02-32']"
                  :patternToCheck="'\\+(998){1}\\s\\((93){1}\\)\\s(514){1}\\-(02){1}\\-(32){1}'"/>
        </div>
      </div>
    </div>
    <div class="normal-block margin-top margin-bottom">
      <h3>Маска для полей <code><{{"Input mask='XX/XX'/"}}></code></h3>
    </div>
    <div class="normal-block margin-bottom">
      <div class="row">
        <div class="col-md-12 col-xl-12">
          <Inputs :placeholder="['Введите дату']"
                  :mask="'DD.DD.DDDD'"/>
        </div>
        <div class="col-md-12 col-xl-12">
          <Inputs :placeholder="['Введите номер телефона']"
                  :signature="['Правильный ответ - +998 (93) 514-02-32']"
                  :patternToCheck="'\\+(998){1}\\s\\((93){1}\\)\\s(514){1}\\-(02){1}\\-(32){1}'"
                  :mask="'+DDD (DD) DDD-DD-DD'"/>
        </div>
      </div>
    </div>
    <div class="normal-block margin-top margin-bottom">
      <h3>Комбинированные маски <code><{{"Input mask='XX/XX'/"}}></code></h3>
      <p>Если мы в маске хотим указать не только один тип но к примеру DD-SDDS</p>
    </div>
    <div class="normal-block margin-bottom">
      <div class="row">
        <div class="col-md-12 col-xl-24">
          <Inputs :placeholder="['Пример маски']"
                  :signature="['число,число-символ,число,число,символ']"
                  :mask="'DD-SDDS'"/>
        </div>
      </div>
    </div>
    <div class="normal-block margin-top margin-bottom">
      <h3>Форма смены пароля <code><{{"Input mode='password-confirm'/>"}}></code></h3>
    </div>
    <div class="normal-block margin-bottom">
      <Inputs :mode="'password-confirm'"
              :placeholder="['Придумайте пароль', 'Повторите пароль']"
              :signature="['', 'Рекомендуем использовать минимум 8 символов']"/>
    </div>
  </div>
</template>

<script>
    import Inputs from "../components/Inputs/Inputs";
    import InputsPasswordConfirm from "../components/Inputs/components/InputsPasswordConfirm/InputsPasswordConfirm";

    export default {
        name: "DemonstrationInputsFields",
        components: {
            Inputs,
            InputsPasswordConfirm
        }
    }
</script>
