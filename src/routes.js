import Register from './Register.vue';
import Confirm from './Confirm.vue';
import Home from './Home.vue';

export const routes = [
  {path: '', component: Home},
  {path: '/register', name: 'Register', component: Register},
  {path: '/confirm', name: 'Confirm', component: Confirm},
  {path: '*', component: {template: '<h1>Page not found!</h1>'}},

];
