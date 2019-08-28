import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import vuetify from './plugins/vuetify';
import vuefire from './plugins/vuefire';
import store from './store'
import config from "@/../config.js"

const app = firebase.initializeApp(config);
export const db = app.database()
export const auth = app.auth()
export const provider = new firebase.auth.TwitterAuthProvider();

Vue.config.productionTip = false;

new Vue({
  vuefire,
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
