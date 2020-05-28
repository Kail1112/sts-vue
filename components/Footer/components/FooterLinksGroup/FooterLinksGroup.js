import {withNormalBlock} from '../../../Wrapper'

export default {
  name: 'FooterLinksGroup',
  props: {
    title: { type: String, default: '' },
    links: { type: Array, default: () => [] }
  },
  render (h) {
    const self = this
    const title = self.$props.title !== '' ? h('h3', { class: 'color-white' }, self.$props.title) : null
    const listLinks = self.$props.links.length ? h('ul', { class: 'list-for-links' }, self.$props.links.map(({path, name}, index) => {
      return h('li', { props: { key: index } }, [
        h('router-link', {
          class: 'links color-white',
          props: {
            to: {
              path
            }
          }
        }, [
          h('small', name)
        ])
      ])
    })) : null
    return h(withNormalBlock, [
      title,
      listLinks
    ])
  }
}
