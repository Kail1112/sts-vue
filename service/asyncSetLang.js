/*
* Функция получения языка системы
* */

/**
 * @param {Object} route
 * @param {Object} store
 * @return {String}
 * */

const asyncSetLang = (route, store) => {
  const {params} = route
  let defaultLang = store.getters.GET_DEFAULT_LANG
  if (params.hasOwnProperty('LANG')) {
    const nowLang = store.getters.GET_SYSTEM_LANG
    const targetLang = params['LANG']
    const checkLang = store.getters.HAS_LANGUAGE(params['LANG'])
    if (checkLang && targetLang !== nowLang)
      return targetLang
  }
  const splitPath = route.fullPath.split('/')[1]
  if (store.getters.HAS_LANGUAGE(splitPath)) {
    defaultLang = splitPath
  }
  return defaultLang
}

export default asyncSetLang
