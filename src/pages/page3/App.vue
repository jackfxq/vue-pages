<template>
  <div id="app">
    <img src="../../assets/logo.png">
    <hello></hello>
    <h3>i am page3</h3>
  </div>
</template>

<script>
import './index.css'
import Hello from '../../components/Hello'

export default {
  name: 'app',
  components: {
    Hello
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
