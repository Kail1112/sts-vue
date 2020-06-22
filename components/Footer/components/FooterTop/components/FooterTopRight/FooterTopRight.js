import {constants} from '../../../../../../utils'

const paymentMethods = Object.values(constants.images)

export default {
  name: 'FooterTopRight',
  functional: true,
  props: {
    root: { type: Object, required: true }
  },
  render (h, context) {
    return h('div', { class: 'col-lg-12' }, [
      h('div', { class: 'row' }, [
        h('div', { class: 'col' }, [
          h('h3', { class: 'color-white text-align-right' }, context.props.root.getTitle('payment-methods')),
          h('div', { class: 'row justify-end' }, paymentMethods.map(payment => {
            return h('div', { class: 'col-auto' }, [
              h('img', {
                attrs: {
                  src: payment,
                  alt: ''
                }
              })
            ])
          }))
        ])
      ])
    ])
  }
}
