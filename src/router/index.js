import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index'),
    children: [{
        path: '/home/category',
        name: 'Category',
        component: () => import('@/views/Goods/Category'),
        meta: {
          title: "商品分类",
          requireAuth: true,
        }
      },
      {
        path: '/home/addgoods',
        name: 'AddGoods',
        component: () => import('@/views/Goods/Addgoods'),
        meta: {
          title: "发布新品",
          requireAuth: true,
        }
      },
      {
        path: '/home/goodslist',
        name: 'GoodsList',
        component: () => import('@/views/Goods/Goodslist'),
        meta: {
          title: "商品列表",
          requireAuth: true,
        }
      },
      {
        path: '/home/userslist',
        name: 'UsersList',
        component: () => import('@/views/User/Userlist'),
        meta: {
          title: "用户管理",
          requireAuth: true,
        }
      },
      {
        path: '/home/userinfo',
        name: 'UsersInfo',
        component: () => import('@/views/User/Userinfo'),
        meta: {
          title: "用户信息",
          requireAuth: true,
        }
      },
      {
        path: '/home/orderlist',
        name: 'OrderList',
        component: () => import('@/views/Order/Orderlist'),
        meta: {
          title: "订单管理",
          requireAuth: true,
        }
      },
      {
        path: '/home/profit',
        name: 'Profit',
        component: () => import('@/views/Profit/Profit'),
        meta: {
          title: "收益统计",
          requireAuth: true,
        }
      },
    ]
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  // console.log(token);
  // console.log(to);
  // console.log(from);

  next()

})

export default router