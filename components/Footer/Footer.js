import './index.scss';

import FooterTop from './components/FooterTop/FooterTop';
import FooterBottom from './components/FooterBottom/FooterBottom';

export default {
  name: 'Footer',
  render (h) {
    return h('footer', { class: 'footer' }, [
      h(FooterTop),
      h(FooterBottom)
    ])
  }
}
