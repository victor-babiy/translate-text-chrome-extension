import Vue from 'vue';
import App from './App.vue';

// TODO: refactor and generate random id
const div = document.createElement('div');
div.id = 'app-random';
document.body.appendChild(div);



new Vue({
  render: h => h(App),
  data() {
    return {
      selectedText: '',
    };
  },
}).$mount('#app-random');