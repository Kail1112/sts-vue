import {withContainer} from '../../../Wrapper';

export default {
  name: 'FooterBottom',
  functional: true,
  props: {
    root: { type: Object, required: true }
  },
  render (h, context) {
    return h(withContainer, [
      h('div', { class: 'footer-bottom' }, [
        [['p', context.props.root.getTitle('copyright')], ['p', context.props.root.getTitle('date-copyright')]].map(item => {
          return h(item[0], item[1])
        })
      ])
    ])
  }
}
