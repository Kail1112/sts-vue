import './index.scss';

export default {
  name: "LoadingIndicatorLarge",
  functional: true,
  render (h) {
    const generateDivs = []
    for (let i = 0; i < 10; i++) {
      generateDivs.push(h('div'))
    }
    return h('div', { class: 'loadingio-spinner-spinner-bve9osq4rbv' }, [
      h('div', { class: 'ldio-075s89frnkzf' }, generateDivs)
    ])
  }
}
