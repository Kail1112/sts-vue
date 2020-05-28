import {withContainer} from '../../../Wrapper/';

import FooterTopLeft from './components/FooterTopLeft/FooterTopLeft';
import FooterTopRight from './components/FooterTopRight/FooterTopRight';

export default {
  name: 'FooterTop',
  components: {
    FooterTopLeft,
    FooterTopRight
  },
  render (h) {
    return h('div', { class: 'footer-top' }, [
      h('div', { class: 'footer-top' }, [
        h(withContainer, [
          h('div', { class: 'row row-margin justify-space-between' }, [
            h(FooterTopLeft),
            h(FooterTopRight)
          ])
        ])
      ])
    ])
  }
}
