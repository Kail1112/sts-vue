import {ruLang, enLang} from './langs/';
import {userCartState, userCartGetters, userCartMutations, userCartActions} from './cart';

export const userState = {
  lang: 'ru',
  systemMessage: {
    ru: {...ruLang},
    en: {...enLang}
  },
  activeComponents: {}, // Есть ли активность в компонентах
  ...userCartState, /// корзина
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

  /// ---------------------------
  ...userCartGetters, /// корзина
  /*----------------------*/

  /// CHECK_PRODUCT_IN_COMPARISON - проверка наличия продукта в сравнении
  CHECK_PRODUCT_IN_COMPARISON: state => (id = -1) => Number.isInteger(id * 1) && state.comparison.hasOwnProperty(id * 1),
  /*----------------------*/

  /// CHECK_ACTIVE_COMPONENT - проверка активности компонента
  CHECK_ACTIVE_COMPONENT: state => (id = '') => id !== '' ? (state.activeComponents.hasOwnProperty(id) && state.activeComponents[id]) : false,
  /*----------------------*/
}

export const userMutations = {
  /// changeLang - изменение текущего языка интерфейса
  changeLang (state, lang) { state.systemMessage.hasOwnProperty(lang) && (state.lang = lang) },
  /*----------------------*/

  /// ---------------------------
  ...userCartMutations, /// корзина
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

  /// setActiveComponent - Установка активности для компонента
  setActiveComponent (state, param = { id = '', active = false } = {id: '', active: false}) {
    const {id, active} = param
    let cloneState = {...state.activeComponents}
    cloneState.hasOwnProperty(id) && (delete cloneState[id])
    active && (cloneState[id] = active)
    state.activeComponents = cloneState
  },
  /*----------------------*/
}

export const userActions = {
  /// changeLang - изменение текущего языка интерфейса
  changeLang (context, lang) { context.commit('changeLang', lang) },
  /*----------------------*/

  /// ---------------------------
  ...userCartActions, /// корзина
  /*----------------------*/

  /// addToComparison - добавление в сравнения
  addToComparison (context, param) { context.commit('addToComparison', param) },
  /*----------------------*/

  /// removeFromComparison - удаление из сравнения
  removeFromComparison (context, param) { context.commit('removeFromComparison', param) },
  /*----------------------*/

  /// setActiveComponent - Установка активности для компонента
  setActiveComponent (context, param) { context.commit('setActiveComponent', param) },
  /*----------------------*/
}
