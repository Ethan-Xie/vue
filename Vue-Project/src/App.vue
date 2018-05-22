<template>
  <div id="app" class="container">
    <img src="./assets/logo.png">
    <ul>
      <li>{{msg}}</li>
    </ul>
    <router-view/>

    <button class="btn btn-success">普通按钮</button>
    <div class="row">
      <div class="col-md-6" style="background-color:red;">1</div>
      <div class="col-md-6" style="background-color:blue;">2</div>
    </div>

    <br>
    <el-row>
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </el-row>
    <Helloh></Helloh>

  </div>
</template>

<script>
import Helloh from './components/Date.vue'

export default {
  name: 'App',
  data () {
    return {
      msg: '我是数据'
    }
  },
  components: {
    Helloh
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
  .router-link-active{
            color:orange;
            font-size: 20px;
        }
</style>
