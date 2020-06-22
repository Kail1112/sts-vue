import Vue from 'vue'

import {Category} from './utils'

const main = {
  install (Vue) {
    const _Category = new Category()

    Vue.mixin({
      methods: {
        /// getTitle - получение системного сообщения в зависимости от языка
        getTitle (mes) { return this.$root.$store.getters.RETURN_SYSTEM_MESSAGE(this.$root.$store.getters.GET_SYSTEM_LANG, mes) }
      }
    })

    Vue.prototype.$_STSGetCategory = (resource_id = 2) => _Category.getCatalog(resource_id)
  }
}

Vue.use(main)
