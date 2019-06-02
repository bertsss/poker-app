import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home.vue'
import Room from '@/pages/Room.vue'
import Rooms from '@/pages/Rooms.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/room/:id', name: 'room', component: Room, props: true },
	{ path: '/rooms', name: 'rooms', component: Rooms }
]

export default new VueRouter({
	routes
})