import Vue from "vue"
import App from "./App.vue"
import 'babel-polyfill'
import router from "./router"
import store from "./store"
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import 'vuetify/dist/vuetify.min.css';

import VueDraggable from 'vue-draggable'

Vue.prototype.$eventBus = new Vue();

Vue.use(VueDraggable)

Vue.use(Vuetify, {
  theme: {
    primary: '#0066ff'
  }
})
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
