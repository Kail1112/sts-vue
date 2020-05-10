export const mainState = {
  PopUpOpen: ''
}

export const mainGetters = {
  /// GET_NOW_OPEN_POPUP - какой попап сейчас открыт
  GET_NOW_OPEN_POPUP: state => state.PopUpOpen,
  /*----------------------*/
}

export const mainMutations = {
  /// changePopUoOpen - изменение активного попапа
  changePopUoOpen (state, param) {
    state.PopUpOpen = param
  },
  /*----------------------*/
}

export const mainActions = {
  /// changePopUoOpen - изменение активного попапа
  changePopUoOpen (context, param) {
    context.commit('changePopUoOpen', param)
  },
  /*----------------------*/
}
