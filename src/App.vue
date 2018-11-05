<template>
  <div id="app">
    <div><a v-bind:href="'#/regData'">regData</a></div>
    <div><a v-bind:href="'#/regTrading'">regTrade</a></div>
    <div><a v-bind:href="'#/TradingList'">TradeList</a></div>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
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
