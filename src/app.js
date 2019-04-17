import Vue from 'vue';
import store from './store';
import App from './App.vue';

// TODO: refactor init and generate random id
const div = document.createElement('div');
div.id = 'app-random';
document.body.appendChild(div);

new Vue({
  render: h => h(App),
  store,
}).$mount('#app-random');
