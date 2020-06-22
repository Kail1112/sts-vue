import './index.scss';

export default {
  name: "HeaderMiddleContacts",
  functional: true,
  props: {
    contacts: { type: Array, default: () => [] }
  },
  render (h, context) {
    return context.props.contacts.length > 0 ? h('div', { class: 'header-middle-info' }, context.props.contacts.map(({icon, title, inner}, index) => {
      // Шрифтовая или растровая иконка
      const image = icon.type === 'ico' ? h('p', { class: `sts-icon ${icon.path}` }) : null
      return h('div', { props: { key: `header-middle-cotact-${index}` }, class: 'header-middle-info__item' }, [
        h('div', { class: 'header-info-item' }, [
          image,
          h('p', { class: 'header-info-item__title', domProps: { innerHTML: title } }),
          h('p', { class: 'header-info-item__text', domProps: { innerHTML: inner } })
        ])
      ])
    })) : null
  }
}
