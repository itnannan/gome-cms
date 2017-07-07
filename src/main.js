// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import Vuex from 'vuex'

import App from './App'
import router from './router'

import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ElementUI)

const store = new Vuex.Store({
	windows:{
		platform: 'windows',
        title: '',
        subTitle:'',
        summary: '',
        size: '',
        version: '',
        system: '',
        date: '',
        address: '',
        detailList: [
            {
                title:'',
                fileList:[],
                id:(new Date()).getTime()
            }
        ],
        background:[]
	},
	ios:{},
	android:{},
	mac:{}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
