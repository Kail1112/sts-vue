import './index.scss';

export default {
  name: "Count",
  data () {
    return {
      val: this.$props.startValue,
      forcibly: false, // Нужно ли применить изменение без задержки
    }
  },
  props: {
    tag: { type: String, default: 'span' },
    moreClass: { type: String, default: '' },
    startValue: { type: Number, default: 0 },
    callback: { type: Function, default: () => null }
  },
  watch: {
    /// val
    val (value) {
      if (Number.isInteger(value * 1)) {
        const {forcibly} = this
        this.$props.callback(value * 1, !forcibly)
        this.forcibly && (this.forcibly = false)
      }
    },
    /*----------------------*/

    /// startValue
    startValue (value) {
      if (Number.isInteger(value * 1) && this.val !== value * 1) {
        !this.forcibly && (this.forcibly = true)
        this.val = value * 1
      }
    }
    /*----------------------*/
  },
  methods: {
    /// plus
    plus () { this.val++ },
    /*----------------------*/

    /// minus
    minus () { this.val > 1 && (this.val--) },
    /*----------------------*/
  },
  render (h) {
    const self = this
    return h(self.$props.tag, {
      class: ['count', self.$props.moreClass],
      on: { input: (e) => (Number.isInteger(e.target.value * 1) && !Number.isNaN(e.target.value * 1)) && (self.val = e.target.value * 1) }
    }, [
      h('button', { class: 'count-btn count-btn-minus', on: { click: self.minus } }, '-'),
      h('input', {
        class: 'count-input',
        attrs: { type: 'text' },
        domProps: { value: self.val },
        on: { input: () => self.$emit('input') }
      }),
      h('button', { class: 'count-btn count-btn-plus', on: { click: self.plus } }, '+')
    ])
  }
}
