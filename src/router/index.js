import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/web/index'
import List from '@/components/web/list'
import Detail from '@/components/web/detail'

import Preview from '@/components/web/pre/preview'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            component: Index
        },
        {
    		path:'/preview/:id',
    		component: Preview
    	}
    ]
})
