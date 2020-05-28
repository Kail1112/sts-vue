import './index.scss';

import {withContainer} from '../../../Wrapper/'
import HeaderBottomCatalog from "./components/HeaderBottomCatalog/HeaderBottomCatalog";
import HeaderBottomSearch from "./components/HeaderBottomSearch/HeaderBottomSearch";
import HeaderBottomCart from "./components/HeaderBottomCart/HeaderBottomCart";

export default {
  name: 'HeaderBottom',
  render (h) {
    // Каталог
    const catalogElement = h('div', { class: 'col-xxl-5 col-xl-6' }, [h(HeaderBottomCatalog)])
    // Поиск
    const searchElement = h('div', { class: 'col-xxl-14 col-xl-12' }, [h(HeaderBottomSearch)])
    // Корзина
    const cartElement = h('div', { class: 'col-xxl-5 col-xl-6' }, [h(HeaderBottomCart)])
    // render
    return h('div', { class: 'header-bottom' }, [
      h(withContainer, [
        h('div', { class: 'header-bottom-wrapper' }, [
          h('div', { class: 'row justify-space-between align-items-center' }, [catalogElement, searchElement, cartElement])
        ])
      ])
    ])
  }
}
