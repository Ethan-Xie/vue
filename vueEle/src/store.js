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
/*const store = new Vuex.Store({
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

