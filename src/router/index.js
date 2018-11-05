import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import RegData from '@/components/RegData'
import RegTrading from '@/components/RegTrading'
import TradingList from '@/components/TradingList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/regData',
      name: 'RegData',
      component: RegData
    },
    {
      path: '/regTrading',
      name: 'RegTrading',
      component: RegTrading
    },
    {
      path: '/tradingList',
      name: 'TradingList',
      component: TradingList
    }
  ]
})
