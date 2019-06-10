<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import  firebase from 'firebase';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {

  public created():void{
    let provider = new firebase.auth.GoogleAuthProvider();
  
    firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.idToken;
    var user = result.user.uid;

    console.log("result :D ", result);
    console.log("user :D ", user);
    

    localStorage.setItem('userId', user);
    localStorage.setItem('token', token)
}).catch(function(error) {
  console.log("Error", error);

});


  }
}
</script>
