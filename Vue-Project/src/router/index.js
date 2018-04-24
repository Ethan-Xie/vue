import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'

// 必须的
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
        path: '/home/:id',
        name: 'Home',
        component: Home
      },
      {
        path: 'reg',
        name: 'Reg',
        component: Home
      }]
    },
    {
      path: '/new',
      name: 'Home',
      component: Home
    }
  ]
})
