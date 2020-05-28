import {withNormalBlock} from '../components/Wrapper/';
import Select from '../components/Select/Select';

export default {
  name: 'DemonstrationSelect',
  data () {
    return {
      select: [
        { id: 'test-select-1', placeholder: 'Тестовое поле №1',
          values: [
            { id: 0, value: 'Тестовое значение №1', type: 'normal', name: 'test-select-1' },
            { id: 1, value: 'Тестовое значение №2', type: 'normal', name: 'test-select-2' },
            { id: 2, value: 'Тестовое значение №3', type: 'normal', name: 'test-select-3' },
            { id: 3, value: 'Тестовое значение №4', type: 'normal', name: 'test-select-4' },
            { id: 4, value: 'Тестовое значение №5', type: 'normal', name: 'test-select-5' }
          ],
          startValue: 0 },
        { id: 'test-select-2', placeholder: 'Тестовое поле №2',
          values: [
            { id: 0, value: 'Тестовое значение №6', type: 'checkbox', name: 'test-select-6' },
            { id: 1, value: 'Тестовое значение №7', type: 'checkbox', name: 'test-select-7' },
            { id: 2, value: 'Тестовое значение №8', type: 'checkbox', name: 'test-select-8' },
            { id: 3, value: 'Тестовое значение №9', type: 'checkbox', name: 'test-select-9' },
            { id: 4, value: 'Тестовое значение №10', type: 'checkbox', name: 'test-select-10' }
          ],
          startValue: 0 },
        { id: 'test-select-3', placeholder: 'Тестовое поле №3',
          values: [
            { id: 0, value: 'Тестовое значение №11', type: 'radio', name: 'test-select-11' },
            { id: 1, value: 'Тестовое значение №12', type: 'radio', name: 'test-select-11' },
            { id: 2, value: 'Тестовое значение №13', type: 'radio', name: 'test-select-11' },
            { id: 3, value: 'Тестовое значение №14', type: 'radio', name: 'test-select-11' },
            { id: 4, value: 'Тестовое значение №15', type: 'radio', name: 'test-select-11' }
          ],
          startValue: 0 },
        { id: 'test-select-4', placeholder: 'Все типы в одном месте',
          values: [
            { id: 1, value: 'Тестовое значение №17', type: 'checkbox', name: 'test-select-13' },
            { id: 2, value: 'Тестовое значение №18', type: 'checkbox', name: 'test-select-14' },
            { id: 0, value: 'Тестовое значение №16', type: 'normal', name: 'test-select-12' },
            { id: 3, value: 'Тестовое значение №19', type: 'radio', name: 'test-select-15' },
            { id: 4, value: 'Тестовое значение №20', type: 'radio', name: 'test-select-15' }
          ],
          startValue: 0 },
        { id: 'test-select-7', placeholder: 'Все типы в одном месте',
          values: [
            { id: 1, value: 'Тестовое значение №17', type: 'checkbox', name: 'test-select-13' },
            { id: 2, value: 'Тестовое значение №18', type: 'checkbox', name: 'test-select-14' },
            { id: 0, value: 'Тестовое значение №16', type: 'normal', name: 'test-select-12' },
            { id: 3, value: 'Тестовое значение №19', type: 'radio', name: 'test-select-15' },
            { id: 4, value: 'Тестовое значение №20', type: 'radio', name: 'test-select-15' }
          ] }
      ],
      selectSimply: [
        { id: 'test-select-5', placeholder: 'Тестовое поле №2', values: [
            { id: 0, value: 'Тестовое значение №1', type: 'normal', name: 'test-select-16' },
            { id: 1, value: 'Тестовое значение №2', type: 'normal', name: 'test-select-17' },
            { id: 2, value: 'Тестовое значение №3', type: 'normal', name: 'test-select-18' },
            { id: 3, value: 'Тестовое значение №4', type: 'normal', name: 'test-select-19' },
            { id: 4, value: 'Тестовое значение №5', type: 'normal', name: 'test-select-20' }
          ], moreClass: 'select-simple', startValue: 0 },
        { id: 'test-select-6', placeholder: 'Тестовое поле №2', values: [
            { id: 0, value: 'Тестовое значение №1', type: 'normal', name: 'test-select-16' },
            { id: 1, value: 'Тестовое значение №2', type: 'normal', name: 'test-select-17' },
            { id: 2, value: 'Тестовое значение №3', type: 'normal', name: 'test-select-18' },
            { id: 3, value: 'Тестовое значение №4', type: 'normal', name: 'test-select-19' },
            { id: 4, value: 'Тестовое значение №5', type: 'normal', name: 'test-select-20' }
          ], moreClass: 'select-simple' },
      ]
    }
  },
  render (h) {
    const self = this
    return h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
      h(withNormalBlock, { props: { moreClass: 'margin-top margin-bottom' } }, [
        h('h2', ['Выпадающие списки ', h('code', '<Select/>')]),
        h('h3', 'Вариант: default'),
        h('hr')
      ]),
      h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
        h('div', { class: 'row' }, self.select.map(select => {
          return h('div', { class: 'col-md-8' }, [ h(Select, { props: select }) ])
        }))
      ]),
      h(withNormalBlock, { props: { moreClass: 'margin-top margin-bottom' } }, [
        h('h3', 'Вариант: simple'),
        h('hr')
      ]),
      h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
        h('div', { class: 'row' }, self.selectSimply.map(select => {
          return h('div', { class: 'col-md-8' }, [ h(Select, { props: select }) ])
        }))
      ])
    ])
  }
}
