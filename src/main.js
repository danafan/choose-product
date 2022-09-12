import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import './accets/public_style.css'
// import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/element_theme/index.css';
import store from './store'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(ElementUI);
Vue.use(VueQuillEditor);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
