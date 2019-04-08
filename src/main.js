import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式与字体图标
import 'gitalk/dist/gitalk.css'
import './assets/style/layout.less'
import './assets/icons'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
