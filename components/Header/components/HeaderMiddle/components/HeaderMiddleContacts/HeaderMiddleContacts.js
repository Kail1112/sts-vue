import './index.scss';

export default {
  name: "HeaderMiddleContacts",
  props: {
    contacts: { type: Array, default: () => [] }
  },
  render (h) {
    const self = this
    return self.$props.contacts.length > 0 ? h('div', { class: 'header-middle-info' }, self.$props.contacts.map(({icon, title, inner}, index) => {
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
