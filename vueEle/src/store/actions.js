import * as types from './type'
export default {
  increment: context => context.commit(types.INCREMENT),
  decrement (context) {
    context.commit('decrement')
  },
  // 注意一下下面这几种写法
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
