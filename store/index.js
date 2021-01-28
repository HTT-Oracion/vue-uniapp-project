import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		historyLists: uni.getStorageSync("__history") || []
	},
	mutations:{
    SET_HISTORY_LISTS(state,history) {
			state.historyLists = history
		},
		CLEAR_HISTORY_LISTS(state) {
			state.historyLists = []
		}
	},
	actions:{
		set_history({commit,state},history){
			let list = state.historyLists
			list.unshift(history)
			uni.setStorageSync("__history",list)
			commit('SET_HISTORY_LISTS',list)
		},
		clear_history({commit}) {
			uni.removeStorageSync("__history")
			commit('CLEAR_HISTORY_LISTS')
		}
	}
})