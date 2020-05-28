import './index.scss';

import LoadingIndicatorLarge from './components/large/LoadingIndicatorLarge'

export default {
  name: "LoadingIndicator",
  functional: true,
  props: {
    size: { type: String, default: 'large' }
  },
  render (h) {
    let elementLoading = [h(LoadingIndicatorLarge)]
    return h('div', { class: 'loading' }, elementLoading)
  }
}
