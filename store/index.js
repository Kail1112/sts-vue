import includesState from "~/store/state";
import includesGetters from "~/store/getters";
import includesMutations from "~/store/mutations";
import includesActions from "~/store/actions";

export const state = () => ({
  ...includesState
})

export const getters = {
  ...includesGetters
}

export const mutations = {
  ...includesMutations
}

export const actions = {
  ...includesActions
}
