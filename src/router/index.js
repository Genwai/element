import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueResource from 'vue-resource'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'

// 第三方插件，引入，全局注册，无需在组件内单独引入
Vue.use(Router)
Vue.use(VueResource)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            // name: 'index',
            component: goods,
            redirect: '/goods',
        }, {
            path: '/goods',
            name: 'goods',
            component: goods
        },
        {
            path: '/ratings',
            name: 'ratings',
            component: ratings
        },
        {
            path: '/seller',
            name: 'seller',
            component: seller
        },
    ]
})