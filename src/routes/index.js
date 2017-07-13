import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);



import Home from '../views/home/home.vue'
import Guodu from '../views/guodu/guodu.vue'

import FourTofour from '../views/404/404.vue'
import Detail from '../views/detail/detail.vue'
import DocPreview from '../views/docPreview/docPreview.vue'
import DocDoading from '../views/docDoading/docDoading.vue'
import Product from '../views/product/product.vue'
import Search from '../views/search/search.vue'

import UserInfo from '../views/userInfo/userInfo.vue'
import UserRebate from '../views/userRebate/userRebate.vue'
import UserAuth from '../views/userAuth/userAuth.vue'
import Introduce from '../views/introduce/introduce.vue'

import Reg from '../views/reg/reg.vue'
import FindPwd from '../views/findPwd/findPwd.vue'
import Login from '../views/login/login.vue'

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/findPwd',
      name: 'findPwd',
      component: FindPwd
    },

    {
      path: '/reg',
      name:'reg',
      component: Reg
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/product/:categoryId(\\d+)',
      name: 'product',
      component: Product
    },
    {
      path: '/search',
      name:'search',
      component: Search
    },
    {
      path: '/searchResult/:query(\.*)',
      name:'searchResult',
      component: Product
    },
    {
      path: '/detail/:productId(\\d+)',
      name: 'detail',
      component: Detail
    },
    {
      path: '/docPreview/:fileName(\.*)/:fromUrl(\.*)',
      name: 'docPreview',
      component: DocPreview
    },
    {
      path: '/docDoading/:prodId(\\d+)/:fileName(\.*)',
      name: 'docDoading',
      component: DocDoading
    },
    {
      path: '/userInfo',
      name:"userInfo",
      component: UserInfo,
    },
    {
      path: '/userAuth',
      name:"userAuth",
      component: UserAuth
    },
    {
      path: '/userRebate',
      name:"userRebate",
      component: UserRebate
    },
    {
      path: '/introduce',
      name:"introduce",
      component: Introduce
    },
    {
      path: ' /index.html',
      name:"home",
      component: Home
    },
    /*{
      path: '/:code(\.*)',
      name:"guodu",
      component: Guodu
    },*/
    {
      path: '/',
      component: Home
    },
    {
      path: '*',
      component: Home // 404
    }
  ]
});


export default router;
