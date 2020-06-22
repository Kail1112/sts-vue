import "./index.scss";

import HeaderTop from "./components/HeaderTop/HeaderTop";
import HeaderMiddle from "./components/HeaderMiddle/HeaderMiddle";
import HeaderBottom from "./components/HeaderBottom/HeaderBottom";

import {findRoot} from '../../utils'

export default {
  name: 'Header',
  functional: true,
  render (h, context) {
    // Поиск рутового доступа
    const root = findRoot(context)
    // Дочерние элементы
    const childes = [h(HeaderTop), h(HeaderMiddle, { props: { root } }), h(HeaderBottom)]
    // render
    return h('header', { class: 'header' }, childes)
  }
}
