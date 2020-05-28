import {withNormalBlock} from '../components/Wrapper/'
import RadioInput from '../components/RadioInput/RadioInput'

export default {
  name: 'DemonstrationCheckbox',
  data () {
    return {
      checkbox: [
        { type: 'checkbox', signature: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
        { type: 'checkbox', signature: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s' },
        { type: 'checkbox', signature: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
        { type: 'checkbox', checked: true, signature: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
      ]
    }
  },
  render (h) {
    const self = this
    return h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
      h(withNormalBlock, { props: { moreClass: 'margin-top margin-bottom' } }, [
        h('h2', [ 'Checkbox ', h('code', '<RadioInput type=\'checkbox\'/>') ]),
        h('h3', 'вариант №1'),
        h('hr')
      ]),
      h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [
        h('div', { class: 'row' }, self.checkbox.map(item => {
          return h('div', { class: 'col-md-12 col-xl-8' }, [
            h(withNormalBlock, { props: { moreClass: 'margin-bottom' } }, [h(RadioInput, { props: item })])
          ])
        }))
      ])
    ])
  }
}
