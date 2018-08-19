import { INCREMENT } from './type'
const state = {
  count: 20
}
const mutations = {
  /*
    箭头函数== increment(state) { state.count++ }

    increment: state => state.count++,
    decrement: state => state.count--
    */
  [INCREMENT] (state) {
    state.count++
  }
}
export default {
  state,
  mutations
}
