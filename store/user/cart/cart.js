import objForEach from "../../../utils/object-for-each";

export const userCartState = {
  cart: {},
}

export const userCartGetters = {
  /// CHECK_PRODUCT_IN_CART - проверка наличия продукта в корзине
  CHECK_PRODUCT_IN_CART: state => (id = -1) => Number.isInteger(id * 1) && state.cart.hasOwnProperty(id * 1),
  /*----------------------*/

  /// GET_COUNT_IN_CART - получение кол-ва товара в корзине
  GET_COUNT_IN_CART: state => (id = -1) => Number.isInteger(id * 1) && state.cart.hasOwnProperty(id * 1) ? state.cart[id * 1].count : -1,
  /*----------------------*/

  /// GET_TOTAL_PRICE_PRODUCT_CART - получение стоимости продукта
  GET_TOTAL_PRICE_PRODUCT_CART: state => (id = -1) => id !== -1 && state.cart.hasOwnProperty(id) ? state.cart[id].count * state.cart[id].price : 0,
  /*----------------------*/

  /// GET_PRODUCTS_FROM_CART - получение списка продуктов из корзины
  GET_PRODUCTS_FROM_CART: state => {
    const arr = []
    objForEach(state.cart, (elem) => {
      const clearId = elem.id * 1
      arr.push({...elem, ...{id: clearId}})
    })
    return arr
  },
  /*----------------------*/
}

export const userCartMutations = {
  /// changeCart - изменение корзины
  changeCart (state, param = {id=  -1, count = 1, callback = () => null} = {id: -1, count: 1, callback: () => null}) {
    const {id, count, callback} = param
    const clearId = id * 1
    const clearCount = count * 1
    if (Number.isInteger(clearId) && clearId !== -1 && Number.isInteger(clearCount) && clearCount > 0) {
      const template = {}
      template[clearId] = param
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
}

export const userCartActions = {
  /// changeCart - изменение корзины
  changeCart (context, param) { context.commit('changeCart', param) },
  /*----------------------*/

  /// removeFromCart - удаление из корзины
  removeFromCart (context, param) { context.commit('removeFromCart', param) },
  /*----------------------*/
}
