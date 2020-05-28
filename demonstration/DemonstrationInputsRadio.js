import {withNormalBlock} from '../components/Wrapper/';
import RadioInput from '../components/RadioInput/RadioInput';

export default {
  name: 'DemonstrationInputsRadio',
  data () {
    return {
      radio: [
        { name: 'test-radio-1', signature: 'Radio, по дефолту всегда будет radio, даже если не передать пропс', checked: true },
        { name: 'test-radio-1', signature: 'Radio, чтобы снять флаг с предыдущего' }
      ]
    }
  },
  render (h) {
    const self = this
    return h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
      h(withNormalBlock, { props: { moreClass: 'margin-top margin-bottom' } }, [
        h('h2', [ 'Radio ', h('code', '<RadioInput type=\'radio\'/>') ]),
        h('h3', 'вариант №1'),
        h('hr')
      ]),
      h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
        h('div', { class: 'row' }, self.radio.map(item => h('div', { class: 'col-auto' }, [h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
          h(RadioInput, { props: item })
        ])])))
      ])
    ])
  }
}
