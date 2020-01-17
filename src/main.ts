import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {store} from './store/store';
import * as firebase from "firebase/app";
import * as VueGoogleMaps from 'vue2-google-maps'
// @ts-ignore
import GmapCluster from 'vue2-google-maps/src/components/cluster'


var firebaseConfig = {
  apiKey: "AIzaSyCF_asLPPGKNWCEzBKy8Jn5Mvg61vvm58w",
  authDomain: "lifego-feedd.firebaseapp.com",
  databaseURL: "https://lifego-feedd.firebaseio.com",
  projectId: "lifego-feedd",
  storageBucket: "lifego-feedd.appspot.com",
  messagingSenderId: "90682372158",
  appId: "1:90682372158:web:541e9ba5caca44da"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const DB = firebase.firestore();
Vue.config.productionTip = false;

Vue.component('GmapCluster', GmapCluster);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCFdq6K-k1q5giJihllCyPvaEid5-Pfu8Q',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  }});

new Vue({
  router,
  store,
  render: (h:any) => h(App),
}).$mount('#app');
