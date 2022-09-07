import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import './accets/public_style.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
