import {withNormalBlock} from '../../../Wrapper'

export default {
  name: 'FooterLinksGroup',
  functional: true,
  props: {
    title: { type: String, default: '' },
    links: { type: Array, default: () => [] }
  },
  render (h, context) {
    const title = context.props.title !== '' ? h('h3', { class: 'color-white' }, context.props.title) : null
    const listLinks = context.props.links.length ? h('ul', { class: 'list-for-links' }, context.props.links.map(({path, name}, index) => {
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
