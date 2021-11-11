import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'
import './router/router-permission'
import './assets/css/iconfont.css'
import './utils/storage'
import i18n from './lang/index'

// Vue.use(Element)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
