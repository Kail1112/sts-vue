import {withNormalBlock} from '../components/Wrapper/';
import Inputs from '../components/Inputs/Inputs';

export default {
  name: 'DemonstrationInputsFields',
  data () {
    return {
      inputs: [
        {
          top: [
            { tag: 'h2', inner: 'Поля для ввода \<code\>\<Input/>\<\/code\>' },
            { tag: 'hr' }
          ],
          values: [
            { placeholder: ['Тестовое поле'], startValue: 'Стартовое тестовое значение', signature: ['Тестовая подпись'] },
            { placeholder: ['Пустое тестовое поле'] },
            { placeholder: ['Пароль'], type: 'password' },
          ]
        },
        {
          top: [
            { tag: 'h3', inner: 'Проверка полей \\<code\\>\\<Input type=\'email\'/>\\<\\/code\\> или \\<code\\>\\<Input patternToCheck=\'\\d{1, 2}\'/>\\<\\/code\\>' }
          ],
          values: [
            { placeholder: ['E-mail'], type: 'email' },
            { placeholder: ['Введите номер телефона'], signature: ['Правильный ответ - +998 (93) 514-02-32'], patternToCheck: '\\+(998){1}\\s\\((93){1}\\)\\s(514){1}\\-(02){1}\\-(32){1}' }
          ]
        },
        {
          top: [
            { tag: 'h3', inner: 'Маска для полей \\<code\\>\\<Input mask=\'XX/XX\'/>\\<\\/code\\>' }
          ],
          values: [
            { placeholder: ['Введите дату'], mask: 'DD.DD.DDDD' },
            { placeholder: ['Введите номер телефона'], signature: ['Правильный ответ - +998 (93) 514-02-32'], patternToCheck: '\\+(998){1}\\s\\((93){1}\\)\\s(514){1}\\-(02){1}\\-(32){1}', mask: '+DDD (DD) DDD-DD-DD' }
          ]
        },
        {
          top: [
            { tag: 'h3', inner: 'Комбинированные маски \\<code\\>\\<Input mask=\'XX/XX\'/>\\<\\/code\\>' },
            { tag: 'p', inner: 'Если мы в маске хотим указать не только один тип но к примеру DD-SDDS' }
          ],
          values: [
            { placeholder: ['Пример маски'], signature: ['число,число-символ,число,число,символ'], mask: 'DD-SDDS' }
          ]
        },
        {
          top: [
            { tag: 'h3', inner: 'Форма смены пароля \\<code\\>\\<Input mask=\'XX/XX\'/>\\<\\/code\\>' },
            { tag: 'p', inner: 'Если мы в маске хотим указать не только один тип но к примеру DD-SDDS' }
          ],
          values: [
            { mode: 'password-confirm', placeholder: ['Придумайте пароль', 'Повторите пароль'], signature: ['', 'Рекомендуем использовать минимум 8 символов'] }
          ]
        }
      ]
    }
  },
  render (h) {
    const self = this
    return h(withNormalBlock, self.inputs.map(inputs => {
      const top = h(withNormalBlock, { props: { moreClass: 'margin-top margin-bottom' } }, inputs.top.map(top => {
        return h(top.tag, top['inner'] !== undefined ? top.inner : null)
      }))
      const wrap = h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
        h('div', { class: 'row' }, inputs.values.map(label => {
          return h('div', { class: 'col-md-12' }, [ h(Inputs, { props: label }) ])
        }))
      ])
      return h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [ top, wrap ])
    }))
  }
}
