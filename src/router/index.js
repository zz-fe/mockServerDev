import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

export default new Router({
  routes: [
    { path:'/',component:resolve => require(['../views/person'], resolve) },
    {
      path:'/personProject/:_id',
      component:resolve => require(['../views/personProject'],resolve),
        children:[
         { path: '/personProject/:_id/list',
          component: resolve => require(['../views/personProject/children/list.vue'],resolve)
         },
         { path: '/personProject/:_id/add/:_apiId',
          component: resolve => require(['../views/personProject/children/api.vue'],resolve)
         },
      ]
    },
    { path:'/work',component:resolve => require(['../views/work'], resolve) },
    { path:'/progress',component:resolve => require(['../views/progress'], resolve) },
    { path:'/doc',component:resolve => require(['../views/doc'], resolve) },
    { path:'/help', component:resolve => require(['../views/help'], resolve)},
  ]
})
