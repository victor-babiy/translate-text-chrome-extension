import Vue from 'vue';
import store from './store';
import App from './App.vue';

const div = document.createElement('div');
const randomId = Math.random().toString(36).substr(2, 9);
div.id = randomId;
document.body.appendChild(div);

new Vue({
  render: h => h(App),
  store,
}).$mount(`#${randomId}`);

