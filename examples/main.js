// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Hui from '../src/index'
import { filters, directives } from '../src/utils/index'
Vue.use(filters)
Vue.use(directives)
Vue.config.productionTip = false
Vue.use(Hui)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
