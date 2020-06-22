import {withContainer} from '../../../Wrapper/';

import FooterTopLeft from './components/FooterTopLeft/FooterTopLeft';
import FooterTopRight from './components/FooterTopRight/FooterTopRight';

export default {
  name: 'FooterTop',
  functional: true,
  props: {
    root: { type: Object, required: true }
  },
  render (h, context) {
    return h('div', { class: 'footer-top' }, [
      h('div', { class: 'footer-top' }, [
        h(withContainer, [
          h('div', { class: 'row row-margin justify-space-between' }, [
            h(FooterTopLeft),
            h(FooterTopRight, { props: { root: context.props.root } })
          ])
        ])
      ])
    ])
  }
}
