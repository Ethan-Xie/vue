import Vue from 'vue'
import Vuex from 'vuex'

// 导入各个组件
import actions from './actions.js'
import mutations from './mutations.js'

// Vue.use(vueTap)
Vue.use(Vuex)
const store = new Vuex.Store({
  // 添加的商品的元素：
  addCartEl: {},
  // 处理数据变化
  mutations,
  actions
})
export default store
