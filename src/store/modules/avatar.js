const getters = {
  avatars: (state) => state.avatars
}

const actions = {
  fetchAvatars({ commit, state }) {
    if (Object.keys(state.avatars).length) {
      return state.avatars
    }

    const avatars = {}
    const files = require.context('../../../static/avatars', true, /\.png$/i)
    files.keys().map((key) => {
      const id = key.split('/').pop().split('.')[0].substring(7).toUpperCase()
      avatars[id] = {
        path: key.split('/').pop(),
        id
      }
    })
    return commit('setAvatars', avatars)
  }
}
const mutations = {
  setAvatars(state, avatars) {
    state.avatars = avatars
  }
}
const state = {
  avatars: {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
