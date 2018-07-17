<template>
  <div id="app">
    <input type="button" value="增加" @click="increment">
    <br>
    <div>
      现在数字为：1
    </div>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
// import store from './store.js'

// Vue.use(vueTap)
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
// import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'App',
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    }
  },
  computed: {
    count () {
      return store.state.count
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
