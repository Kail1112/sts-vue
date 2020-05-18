import {ruLang, enLang} from './langs/'

export const userState = {
  lang: 'ru',
  systemMessage: {
    ru: {...ruLang},
    en: {...enLang}
  },
  cart: {},
  comparison: {}
}

export const userGetters = {
  /// RETURN_SYSTEM_MESSAGE - системные сообщения
  RETURN_SYSTEM_MESSAGE: state => (lang, message = '') => {
    if (message ?? false) {
      if (state.systemMessage.hasOwnProperty(lang)) {
        if (state.systemMessage[lang].hasOwnProperty(message)) {
          return state.systemMessage[lang][message]
        } else {
          return state.systemMessage[lang]['not-know']
        }
      } else {
        return state.systemMessage['ru']['not-know']
      }
    }
  },
  /*----------------------*/

  /// GET_SYSTEM_LANG - какой язык выбран по умолчанию
  GET_SYSTEM_LANG: state => state.lang,
  /*----------------------*/

  /// GET_DEFAULT_LANG - получение стартового языка
  GET_DEFAULT_LANG: state => Object.keys(state.systemMessage)[0],
  /*----------------------*/

  /// HAS_LANGUAGE - проверка наличия языка
  HAS_LANGUAGE: state => (lang) => state.systemMessage.hasOwnProperty(lang),
  /*----------------------*/

  /// CHECK_PRODUCT_IN_CART - проверка наличия продукта в корзине
  CHECK_PRODUCT_IN_CART: state => (id = -1) => Number.isInteger(id * 1) && state.cart.hasOwnProperty(id * 1),
  /*----------------------*/

  /// GET_COUNT_IN_CART - получение кол-ва товара в корзине
  GET_COUNT_IN_CART: state => (id = -1) => Number.isInteger(id * 1) && state.cart.hasOwnProperty(id * 1) ? state.cart[id * 1] : -1,
  /*----------------------*/

  /// CHECK_PRODUCT_IN_COMPARISON - проверка наличия продукта в сравнении
  CHECK_PRODUCT_IN_COMPARISON: state => (id = -1) => Number.isInteger(id * 1) && state.comparison.hasOwnProperty(id * 1),
  /*----------------------*/
}

export const userMutations = {
  /// changeLang - изменение текущего языка интерфейса
  changeLang (state, lang) { state.systemMessage.hasOwnProperty(lang) && (state.lang = lang) },
  /*----------------------*/

  /// changeCart - изменение корзины
  changeCart (state, param = {id=  -1, count = 1, callback = () => null} = {id: -1, count: 1, callback: () => null}) {
    const {id, count, callback} = param
    const clearId = id * 1
    const clearCount = count * 1
    if (Number.isInteger(clearId) && clearId !== -1 && Number.isInteger(clearCount) && clearCount > 0) {
      const template = {}
      template[clearId] = clearCount
      if (!state.cart.hasOwnProperty(clearId)) {
        state.cart = {...state.cart, ...template}
      } else {
        if (state.cart[id] !== clearCount) {
          delete state.cart[clearId]
          state.cart = {...state.cart, ...template}
        }
      }
      callback()
    }
  },
  /*----------------------*/

  /// removeFromCart - удаление из корзины
  removeFromCart (state, param = {id = -1, callback = () => null} = {id: -1, callback: () => null}) {
    const {id, callback} = param
    if (id !== -1) {
      const clearId = id * 1
      if (Number.isInteger(clearId) && state.cart.hasOwnProperty(clearId)) {
        let cloneState = {...state.cart}
        delete cloneState[clearId]
        state.cart = cloneState
        callback()
      }
    }
  },
  /*----------------------*/

  /// addToComparison - добавление в сравнения
  addToComparison (state, param = {id = -1, callback = () => null} = {id: -1, callback: () => null}) {
    const {id, callback} = param
    if (id !== -1) {
      const clearId = id * 1
      if (Number.isInteger(clearId) && !state.comparison.hasOwnProperty(clearId)) {
        const cloneState = {...state.comparison}
        let template = {}
        template[clearId] = true
        state.comparison = {...cloneState, ...template}
        callback()
      }
    }
  },
  /*----------------------*/

  /// removeFromComparison - удаление из сравнения
  removeFromComparison (state, param = {id = -1, callback = () => null} = {id: -1, callback: () => null}) {
    const {id, callback} = param
    if (id !== -1) {
      const clearId = id * 1
      if (Number.isInteger(clearId) && state.comparison.hasOwnProperty(clearId)) {
        let cloneState = {...state.comparison}
        delete cloneState[clearId]
        state.comparison = {...cloneState}
        callback()
      }
    }
  },
  /*----------------------*/
}

export const userActions = {
  /// changeLang - изменение текущего языка интерфейса
  changeLang (context, lang) { context.commit('changeLang', lang) },
  /*----------------------*/

  /// changeCart - изменение корзины
  changeCart (context, param) { context.commit('changeCart', param) },
  /*----------------------*/

  /// removeFromCart - удаление из корзины
  removeFromCart (context, param) { context.commit('removeFromCart', param) },
  /*----------------------*/

  /// addToComparison - добавление в сравнения
  addToComparison (context, param) { context.commit('addToComparison', param) },
  /*----------------------*/

  /// removeFromComparison - удаление из сравнения
  removeFromComparison (context, param) { context.commit('removeFromComparison', param) },
  /*----------------------*/
}
