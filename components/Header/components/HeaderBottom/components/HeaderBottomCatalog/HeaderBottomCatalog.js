import './index.scss';

import {findRoot} from '../../../../../../utils'

export default {
  name: "HeaderBottomCatalog",
  functional: true,
  render (h, context) {
    const root = findRoot(context)
    const getTitle = (mes) => root.$store.getters.RETURN_SYSTEM_MESSAGE(root.$store.getters.GET_SYSTEM_LANG, mes)
    // render
    return h('div', { class: 'header-category' }, [
      h('button', { class: 'header-category-btn' }, [
        h('span', { class: 'sts-icon sts-iconmenu' }),
        h('span', { class: 'text' }, getTitle('catalog-title')),
        h('span', { class: 'text' }, getTitle('catalog-header-btn'))
      ])
    ])
  }
}
