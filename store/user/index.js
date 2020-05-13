import {ruLang, enLang} from './langs/'

export const userState = {
  lang: 'ru',
  systemMessage: {
    ru: {...ruLang},
    en: {...enLang}
  }
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

  /// HAS_LANGUAGE - проверка наличия языка
  HAS_LANGUAGE: state => (lang) => {
    return state.systemMessage.hasOwnProperty(lang) && state.systemMessage[lang] !== null
  },
  /*----------------------*/
}

export const userMutations = {
  /// changeOverflow - изменение свойства overflow
  // changeOverflow (state, param) { state.overflowBody !== param && (state.overflowBody = param) },
  /*----------------------*/
}

export const userActions = {
  /// changePopUoOpen - изменение активного попапа
  // changePopUoOpen (context, param) { context.commit('changePopUoOpen', param) },
  /*----------------------*/
}
