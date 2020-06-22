import './index.scss';

export default {
  name: "HeaderMiddleLinks",
  functional: true,
  props: {
    links: { type: Array, default: () => [] }
  },
  render (h, context) {
    return context.props.links.length > 0 ? h('div', { class: 'header-middle-links' }, [
      h('ul', context.props.links.map(({type, name, path}, index) => {
        // Является ли ссылка на другую страницу
        const link = type === 'self' ? h('router-link', { props: { to: { path } }, class: 'header-middle-link', domProps: { innerHTML: name } }) : h('a', { attrs: { href: path }, class: 'header-middle-link', domProps: { innerHTML: name } })
        return h('li', { props: { key: `middle-links-${index}` } }, [link])
      }))
    ]) : null
  }
}
