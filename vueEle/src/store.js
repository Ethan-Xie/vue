import Vue from 'vue'
import Vuex from 'vuex'
// import store from './store.js'

// Vue.use(vueTap)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  // 添加的商品的元素：
  addCartEl: {},
  // 处理数据变化
  mutations: {
    /*
    箭头函数== increment(state) { state.count++ }
    */
    increment: state => state.count++,
    decrement: state => state.count--
  },
  actions: {
    // context.commit('increment')
    increment: context => context.commit('increment')
  }
})
export default store
/*
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  }
})

// 需要导出Store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
const store = new Vuex.Store({
  state: {
    count: 0
  },
  // 添加的商品元素
  addCartEl: {},
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
*/
