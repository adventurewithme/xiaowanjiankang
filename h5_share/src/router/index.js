import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Test from '@/components/test'
import Result from '@/components/result'
import Child from '@/components/child'
import Share from '@/components/share/share'
import Goodsdetail from '@/components/goodsdetail/goodsdetail'
import Heathshare from '@/components/heathshare/heathshare'
import Foodshare from '@/components/foodshare/foodshare'
import Fail from '@/components/fail/fail'

Vue.use(Router)
 
export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/test',
      name: 'Test',
      component: Test
    },{
      path:'/result',
      name:'Result',
      component:Result
    },{
      path: '/child',
      name: 'Child',
      component: Child
    },{
      path: '/share',
      name: 'Share',
      component: Share
    }, {
      path: '/goodsdetail',
      name: 'Goodsdetail',
      component: Goodsdetail
    }, {
      path: '/heathshare',
      name: 'Heathshare',
      component: Heathshare
    }, {
      path: '/foodshare',
      name: 'Foodshare',
      component: Foodshare
    },{
      path:'/fail',
      name:"Fail",
      component:Fail
    }, {
      path: '/hot',
      name: "Hot",
      component: resolve => require(["@/components/hot/index"], resolve)
    }
  ]
})
