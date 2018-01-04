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
Vue.use(VueResource);
Vue.use(Vuex);

const router=new VueRouter({
  routes: routes,
  mode: 'hash'
});

const store = new Vuex.Store({
  state: {
    username: '',
  } // state

});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),

  methods: {
    navigate(path) {
      this.$router.push(path);
    },
  }
})
