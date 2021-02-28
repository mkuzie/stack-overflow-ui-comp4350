import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import dayjs from 'dayjs'
import axios from 'axios'
import _ from "lodash"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.prototype.$dayjs = dayjs
Vue.prototype.$axios = axios
Vue.prototype.$_ = _

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
