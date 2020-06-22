import './index.scss';

import FooterTop from './components/FooterTop/';
import FooterBottom from './components/FooterBottom/';

import {findRoot} from '../../utils'

export default {
  name: 'Footer',
  functional: true,
  render (h, context) {
    const root = findRoot(context)
    // render
    return h('footer', { class: 'footer' }, [
      h(FooterTop, { props: { root: root } }),
      h(FooterBottom, { props: { root: root } })
    ])
  }
}
