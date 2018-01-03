import Register from './Register.vue';
import Home from './Home.vue';

export const routes = [
  {path: '', component: Home},
  {path: '/register', name: 'Register', component: Register},
  {path: '*', component: {template: '<h1>Page not found!</h1>'}},

];
