import Vue from 'vue'
import App from './App.vue'

/*Firebase*/
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin);

/*Bootstrap*/
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/*Notifications*/
import Notifications from 'vue-notification'
Vue.use(Notifications)

/*Routes*/
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import novprod from './components/novprod.vue'
Vue.component(novprod);
import login from './components/login.vue'
Vue.component(login);
import carrito from './components/carrito.vue'
Vue.component(carrito);

const routes = [
  { path: '/', component: novprod },
  { path: '/productos', component: novprod },
  { path: '/login', component: login },
  { path: '/carrito', component: carrito }
]
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
