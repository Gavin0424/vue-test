import Vue from 'vue'
import Router from 'vue-router'
import login from '../page/login.vue'//相对路径引入
import main from '@/page/main.vue'//@为src目录
import HelloWorld from '../components/HelloWorld.vue'
import Welcome from '../components/Welcome.vue'
import Income from '@/components/Income.vue'

Vue.use(Router)



export default new Router({
	routes: [
	{
		path: '/',
		name: 'login',
		component: login
	},
	{
		path: '/main/',
		name: 'main',
		component: main,
		children: [
			{
				path: 'shouzhi/earning',//嵌套路由
				name: 'income',
				component: Income
			},
			{
				path: 'shouzhi/pay',
				name: 'pay',
				component: Welcome
			}
			]
	}
	]
})


