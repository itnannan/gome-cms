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
            component: Index
        },
        {
            path:'/edit',   //   router.push({path:'/edit',query:{platform:'windows',version:'V1.2.1'}})
            component: Index
        },
        {
    		path:'/preview/platform/:platform',
    		component: Platform
    	},
        {
            path:'/preview/list/:platform',
            component: List
        },
        {
            path:'/preview/detail',
            component: Detail
        }
    ],
    scrollBehavior (to, from) {
        return {x:0,y:0}
    }
})
