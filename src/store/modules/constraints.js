import * as types from '@/store/mutation-types'
import api from '@/services/api/constraints'
import { handleError } from '@/utils/utils.js'

const getters = {
  allConstraints: (state) => state.allConstraints,
  totalAllConstraints: (state) => state.totalAllConstraints
}

const actions = {
  getAllConstraints({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getAllConstraints()
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data)
            commit(types.ALL_CONSTRAINTS, response.data)
            commit(types.TOTAL_ALL_CONSTRAINTS, response.data.totalDocs)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.ALL_CONSTRAINTS](state, constraints) {
    state.allConstraints = constraints
  },
  [types.TOTAL_ALL_CONSTRAINTS](state, value) {
    state.totalAllConstraints = value
  }
}

const state = {
  allConstraints: [],
  totalAllConstraints: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
