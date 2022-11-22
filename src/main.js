import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/css/global.css'
// import axios from 'axios'
import {Button,Input,Row,Col,Drawer,Table,TableColumn,Menu,MenuItem,Tabs,TabPane,Select,Option,Message} from "element-ui";
Vue.use(Button)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Drawer)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Select)
Vue.use(Option)
Vue.prototype.$message=Message

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
