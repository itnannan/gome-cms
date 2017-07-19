import Vue from 'vue'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import {
	getList
} from './server/getDate'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = true

Vue.use(Vuex)
Vue.use(ElementUI)

const state = {
	banner:{
	},
	details:[
	]
}

const actions = {
	/*async upDetails({commit,state}){
		const res = await getList(state.banner.platform)
		commit('upDetails',res)
	}*/
}

const getters = {}

const mutations ={
	upBanner(state,banner){
		state.banner = banner
	},
	upDetails(state,details){
		state.details = state.details.concat(details)
	},
	addLocalDetail(state,details){
		state.details.push(details)
	},
	emptyDetail(state){
		state.details.splice(0,state.details.length)
	}
}

const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})

