<template>
  <div></div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { auth, provider } from '@/main'

export default {
  name: 'Login',
  created() {
    if(!this.authenticated) {
      auth.signInWithPopup(provider).then((result) => {
      const token = result.credential.accessToken;
      const username = result.additionalUserInfo.username;
      this.$store.dispatch('auth/login',{token,username})
      localStorage.setItem('access_token',result.credential.accessToken)
      localStorage.setItem('username',result.additionalUserInfo.username)
      }).catch(function(error) {
        console.error(error)
      });
    }
    this.$router.go(-1)
    
  },
  computed: {
    ...mapGetters('auth', {
      authenticated: "authenticated",
      username: "username"
    })
  }
}
</script>