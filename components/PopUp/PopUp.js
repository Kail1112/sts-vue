import "./index.scss";

import PopUpBtn from "./components/PopUpBtn/PopUpBtn";

export default {
  name: 'PopUp',
  props: {
    keyPopUp: { type: String, default: "", required: true },
    btn: { type: Object, default: () => ({ tagName: "", className: "" }) },
    functionOnOpen: { type: Function, default: () => null }
  },
  methods: {
    /// removeOverflow
    removeOverflow () {
      this.$root.$store.getters.GET_NOW_OVERFLOW && this.$root.$store.dispatch('changeOverflow', false)
    },
    /*----------------------*/

    /// getValueStore - получить значение из стора
    getValueStore(key = "") {
      if (key !== "") return this.$root.$store.getters[key];
      else return undefined;
    },
    /*----------------------*/

    /// onClickBtn - метод клика по кнопке
    onClickBtn() {
      const { keyPopUp } = this.$props;
      const nowOpen = this.getValueStore("GET_NOW_OPEN_POPUP");
      if (nowOpen !== undefined) {
        if (nowOpen === keyPopUp) {
          this.removeOverflow()
          this.$root.$store.dispatch("changePopUoOpen", "");
        } else {
          this.$props.functionOnOpen()
          this.$root.$store.dispatch("changePopUoOpen", keyPopUp);
        }
      }
    },
    /*----------------------*/
  },
  computed: {
    /// isOpened - открыт ли сейчас попап?
    isOpened() {
      const { keyPopUp } = this.$props;
      if (keyPopUp !== "") {
        const result = this.getValueStore("GET_NOW_OPEN_POPUP");
        if (result !== undefined) return result === keyPopUp;
        else return false;
      } else return false;
    },
    /*----------------------*/
  },
  components: {
    PopUpBtn,
  },
  render (h) {
    return h('div', { class: 'popup' }, [

    ])
  }
}
