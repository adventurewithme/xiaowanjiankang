// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false;
// Vue.prototype.pings = 'http://h5.ecosystemwan.com';//正式域名
// Vue.prototype.pings = 'http://ecosystemwan.com:8081';//迁移域名
Vue.prototype.pings = 'http://testh5.ecosystemwan.com';//测试域名
// Vue.prototype.pings = 'http://47.105.207.216';//测试
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
