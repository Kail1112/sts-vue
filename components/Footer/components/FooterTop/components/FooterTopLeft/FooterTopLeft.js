import FooterLinksGroup from "../../../FooterLinksGroup/FooterLinksGroup";

export default {
  name: 'FooterTopLeft',
  data () {
    return {
      links: [
        {
          title: 'Информация:',
          links: [
            {path: '#', name: 'Наш адрес'},
            {path: '#', name: 'О нас'},
            {path: '#', name: 'Оплата'},
            {path: '#', name: 'Рассрочка'},
            {path: '#', name: 'Публичная оферта'}
          ]
        },
        {
          title: 'Дополнительно:',
          links: [
            {path: '#', name: 'Производители'},
            {path: '#', name: 'Связаться с нами'},
            {path: '#', name: 'Карта сайта'}
          ]
        },
        {
          title: 'Помощь:',
          links: [
            {path: '#', name: 'Узнать свой ИНН'},
            {path: '#', name: 'Узнать о UNIRED'}
          ]
        }
      ]
    }
  },
  render (h) {
    const self = this
    return h('div', { class: 'col-lg-12' }, [
      h('div', { class: 'row justify-space-between' }, self.links.map(item => {
        return h('div', { class: 'col-auto' }, [
          h(FooterLinksGroup, {
            props: {
              title: item.title,
              links: item.links
            }
          })
        ])
      }))
    ])
  }
}
