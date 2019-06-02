import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		name: ''
	},

	mutations: {
		setName (state, payload) {
			state.name = payload
		}
	},

	actions: {
	},

	getters: {
		name (state) {
			return state.name
		}
	}
})
