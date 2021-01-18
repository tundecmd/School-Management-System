import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

Vue.config.productionTip = false;

// Setting the default
Vue.prototype.$http = axios;
// load the token from the localStorage
const token = localStorage.getItem("token");
// if there is any token, then we will simply append default axios authorization headers
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
