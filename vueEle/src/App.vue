<template>
  <div id="app">
    <input type="button" value="增加" @click="increment">
    <br>
    <input type="button" value="减少" @click="decrement">
    <br>
    <input type="button" value="偶数可以点击 增加" @click="clickodd">
    <br>
    <input type="button" value="异步" @click="clickAsync">
    <br>
    <div>
      现在数字为：1 实际值：{{ count }} ,它现在是 {{ getOdd }}
    </div>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>

// import {mapGetters, mapActions} from 'vuex'
/*
  state,mutations,actions,getters
*/
import store from './store.js'

export default {
  name: 'App',
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    },
    clickodd () {
      if (store.state.count % 2 === 0) {
        store.commit('increment')
      }
      // alert(store.state.count)
    },
    clickAsync () {
      setTimeout(function () {
        // alert('hello')
        store.commit('decrement')
      }, 1000)
    }
  },
  computed: {
    count () {
      return store.state.count
    },
    getOdd () {
      return store.state.count % 2 === 0 ? '偶数' : '奇数'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
