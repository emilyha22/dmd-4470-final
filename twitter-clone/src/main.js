import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import firebase from 'firebase/app'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyA7uWwXAYphVGBqcD198ZOBFLGJHZYOg0U',
  authDomain: 'final-4470.firebaseapp.com',
  projectId: 'final-4470',
  storageBucket: 'final-4470.appspot.com',
  messagingSenderId: '662691157155',
  appId: '1:662691157155:web:f077e02a6b87036de55b16',
  measurementId: 'G-2LK406HRZE'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
let app

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
