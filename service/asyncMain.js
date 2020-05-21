import asyncSetLang from "./asyncSetLang"; /// Функция получения языка системы

/**
 * @param {Object} app
 * @return {VoidFunction}
 * */

const asyncMain = async (app) => {
  const {route, store} = app
  store.dispatch('changeLang', await asyncSetLang(route, store))
}

export default asyncMain
