// 页面入口js
import Vue from 'vue'
import App from './App'
import router from './router/router'
import {fetchGet,fetchPost} from './axios/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'

Vue.prototype.$fetchGet = fetchGet
Vue.prototype.$fetchPost = fetchPost
// 注册element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
