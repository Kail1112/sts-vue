import asyncMain from '../../service/asyncMain';
import {withContainer} from '../../components/Wrapper/';

export default {
  name: 'index',
  async asyncData (app) {
    await asyncMain(app)
  },
  render (h) {
    return h(withContainer, [
      h('div', { class: 'typography' }, [
        h('h2', 'Список страниц'),
        h('ul', [
          h('li', [
            h('router-link', { props: { to: { path: 'ui' } }, class: 'links' }, 'UI')
          ])
        ])
      ])
    ])
  }
}
