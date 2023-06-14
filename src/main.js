import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import './accets/public_style.css'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/element_theme/index.css';
import store from './store'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import pinyin from 'js-pinyin'

Vue.use(ElementUI);
Vue.use(VueQuillEditor);

Vue.prototype.isPrice = /^(([0-9]+)|([0-9]+\.[0-9]{0,2}))$/;	//正数且最多两位小数
Vue.prototype.isZzs = /^[+]{0,1}(\d+)$/;						          //正整数
Vue.prototype.downLoadUrl = `${location.origin}`;	            //下载模版前缀


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
