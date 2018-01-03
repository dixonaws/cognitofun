import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import 'aws-sdk';
import 'amazon-cognito-identity-js';
import 'jquery';
import 'fontawesome';
import {routes} from "./routes";

Vue.use(VueRouter);
Vue.use(VueResource)

const router=new VueRouter({
  routes: routes,
  mode: 'hash'
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
