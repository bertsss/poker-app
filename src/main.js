import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import firebase from 'firebase/app'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)
Vue.use(VueAxios, axios)

firebase.initializeApp({
	apiKey: 'AIzaSyDBHKWm48SpfWOFE7fgv4PrjCpozR29La0',
	authDomain: 'poker-app-88b1b.firebaseapp.com',
	databaseURL: 'https://poker-app-88b1b.firebaseio.com',
	projectId: 'poker-app-88b1b',
	storageBucket: 'poker-app-88b1b.appspot.com',
	messagingSenderId: '941591037213',
	appId: '1:941591037213:web:5a20a6f25c96b2c3'
})
export const db = firebase.firestore()

Vue.config.productionTip = false

new Vue({ // eslint-disable-line no-new
	el: '#app',
	store: store,
	router,
	render: h => h(App)
})
