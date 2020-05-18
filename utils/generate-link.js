/*
* Функция генерации ссылок
* */

/**
 * @param {String} route
 * @param {String} lang
 * @param {String} defaultLang
 * */

const generateLink = (route, lang = '', defaultLang = 'ru') => {
  if (lang !== '') {
    if (lang !== defaultLang) {
      return `/${lang}/${route}`
    } else return `${route}`
  }
  return route
}

export default generateLink
