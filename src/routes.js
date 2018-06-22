// import Login from './pages/Login.vue'
// import NotFound from './pages/404.vue'
// import Home from './pages/Home.vue'
// import Main from './pages/Main.vue'
// import Table from './pages/nav1/Table.vue'
// import Form from './pages/nav1/Form.vue'
// import user from './pages/nav1/user.vue'
// import Page4 from './pages/nav2/Page4.vue'
// import Page5 from './pages/nav2/Page5.vue'
// import Page6 from './pages/nav3/Page6.vue'
// import echarts from './pages/charts/echarts.vue'

import { debug } from './api/config.js'
import { routerNames } from './api/const.js'

let routes = [{
        name:'login',
        path: '/login',
        component: function(resolve) {
            require(['./pages/Login.vue'], resolve);
        },

    },
    {
        path: '/404',
        component: function(resolve) {
            require(['./pages/404.vue'], resolve);
        },

    },
    {
      name:'main',
      path: '/main',
      meta:{auth:true},
      component: function(resolve) {
        require(['./pages/Main.vue'], resolve);
      },
    },
  {
    name:'my',
    path: '/my',
    meta:{auth:true},
    component: function(resolve) {
      require(['./pages/my.vue'], resolve);
    },
  },
  {
    name:"order",
    path: '/order',
    meta:{auth:true},
    component: function(resolve) {
      require(['./pages/order.vue'], resolve);
    },
  },
  {
    name:'orderHistory',
    path: '/order/history',
    meta:{auth:true},
    component: function(resolve) {
      require(['./pages/order/history.vue'], resolve);
    },
  },
  {
    name:'myBill',
    path: '/my/bill',
    meta:{auth:true},
    component: function(resolve) {
      require(['./pages/my/bill.vue'], resolve);
    },
  },
  {
    name:'myBillDetail',
    path: '/my/bill/detail',
    meta:{auth:true},
    component: function(resolve) {
      require(['./pages/my/billInfo.vue'], resolve);
    },
  },
  {
    name:'mySuspend',
    path: '/my/suspend',
    meta:{auth:true},
    component: function(resolve) {
      require(['./pages/my/suspend.vue'], resolve);
    },
  },
  {
    name:'orderDetail',
    path: '/order/detail',
    meta:{auth:true},
    component: function(resolve) {
      require(['./pages/order/detail.vue'], resolve);
    },
  },
  {
    name:'orderConfirm',
    path: '/order/confirm',
    meta:{auth:true},
    component: function(resolve) {
      require(['./pages/order/confirm.vue'], resolve);
    },
  },
  {
    name:'myResume',
    path: '/my/resume',
    meta:{auth:true},
    component: function(resolve) {
      require(['./pages/my/resume.vue'], resolve);
    },
  },
  {
    name:'modifyPwd',
    path: '/my/modifyPwd',
    meta:{auth:true},
    component: function(resolve) {
      require(['./pages/my/modifyPwd.vue'], resolve);
    },
  },
    {
        path: '/',
        meta:{auth:true},
        component: function(resolve) {
            require(['./pages/main.vue'], resolve);
        },
        name: 'AppLayout',
        children: [

        ]
    },
    {
        path: '*',
        hidden: true,
        auth: false,
        redirect: { path: '/404' }
    }
];

export default routes;
