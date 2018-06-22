import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import Mock from './mock'
//import iview from 'iview'
import 'iview/dist/styles/iview.css'
import VueClipboard from 'vue-clipboard2'
import components from './components'
import { DatetimePlugin,AlertPlugin,LoadingPlugin,ToastPlugin,ConfirmPlugin  } from 'vux'
import cookie from './utils/cookie.js'

//Mock.bootstrap();
Vue.use(Vuex)
Vue.use(VueClipboard)
Vue.use(VueRouter)
//Vue.use(iview)
Vue.use(components)
//Vue.use(Vux)
Vue.use(DatetimePlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
  // 还原滚动条
  //window.scrollTo(0, 0);
  // Auth验证
  if (to.meta.auth) {
    //if (to.path == '/login') {
    //  sessionStorage.removeItem('user');
    //}
    let userid = cookie.get('HG-UserId');
    if ((userid == null || userid == undefined || userid == '' || userid == 0) && to.path != '/login') {
      next({path: '/login'})
    } else {
      next()
    }
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
    //render: h => h(Login)
}).$mount('#app')

//router.replace('/login')
