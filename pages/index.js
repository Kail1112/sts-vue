export default {
  name: 'index',
  asyncData (app) {
    app.redirect(`/${app.store.getters.GET_DEFAULT_LANG}/`)
  },
  render () {
    return null
  }
}
