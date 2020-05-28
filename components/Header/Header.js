import "./index.scss";

import HeaderTop from "./components/HeaderTop/HeaderTop";
import HeaderMiddle from "./components/HeaderMiddle/HeaderMiddle";
import HeaderBottom from "./components/HeaderBottom/HeaderBottom";

export default {
  name: 'Header',
  components: {
    HeaderTop,
    HeaderMiddle,
    HeaderBottom
  },
  render (h) {
    const childes = [h(HeaderTop), h(HeaderMiddle), h(HeaderBottom)]
    return h('header', { class: 'header' }, childes)
  }
}
