import Vue from 'vue'
import Router from 'vue-router'
//录入 表单
import Index from '@/components/web/index'

//列表预览
import List from '@/components/web/list'

//详情预览
import Detail from '@/components/web/detail'

//下载预览
import Platform from '@/components/web/pre/platform'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            component: Index,
            children:[
                {
                    path:'/:id',
                    component: Index
                }
            ]
        },
        {
    		path:'/preview/platform/:id',
    		component: Platform
    	},
        {
            path:'/preview/list',
            component: List
        },
        {
            path:'/preview/detail/:id',
            component: Detail
        }
    ]
})
