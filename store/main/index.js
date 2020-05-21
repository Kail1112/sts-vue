export const mainState = {
  overflowBody: false, /// Нужно ли применять свойство overflow: hidden?
  PopUpOpen: '', /// Какой открыт попап
  SelectOpen: '', /// Какой открыт select
}

export const mainGetters = {
  /// GET_NOW_OVERFLOW - какое свойство у overflowBody
  GET_NOW_OVERFLOW: state => state.overflowBody,
  /*----------------------*/

  /// GET_NOW_OPEN_POPUP - какой попап сейчас открыт
  GET_NOW_OPEN_POPUP: state => state.PopUpOpen,
  /*----------------------*/

  /// GET_NOW_OPEN_SELECT - какой select сейчас открыт
  GET_NOW_OPEN_SELECT: state => state.SelectOpen,
  /*----------------------*/
}

export const mainMutations = {
  /// changeOverflow - изменение свойства overflow
  changeOverflow (state, param) { state.overflowBody !== param && (state.overflowBody = param) },
  /*----------------------*/

  /// changePopUoOpen - изменение активного попапа
  changePopUoOpen (state, param) { state.PopUpOpen = param },
  /*----------------------*/

  /// changeSelectOpen - изменение активного select'a
  changeSelectOpen (state, param) { state.SelectOpen = param },
  /*----------------------*/
}

export const mainActions = {
  /// changeOverflow - изменение свойства overflow
  changeOverflow (context, param) { context.commit('changeOverflow', param) },
  /*----------------------*/

  /// changePopUoOpen - изменение активного попапа
  changePopUoOpen (context, param) { context.commit('changePopUoOpen', param) },
  /*----------------------*/

  /// changeSelectOpen - изменение активного select'a
  changeSelectOpen (context, param) { context.commit('changeSelectOpen', param) },
  /*----------------------*/
}
