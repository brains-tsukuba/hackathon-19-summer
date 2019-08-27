<template>
  <div>login component</div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { auth, provider } from '@/main'

export default {
  name: 'Login',
  created() {
    auth.signInWithPopup(provider).then((result) => {
      console.log(this.$store)
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = result.credential.accessToken;
      var secret = result.credential.secret;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
  });
  },
  computed: {
    ...mapGetters('auth', {
      apiKey: "apiKey",
      username: "username"
    })
  }
}
</script>