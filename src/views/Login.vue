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
      console.log(result)
      const token = result.credential.accessToken;
      const secret = result.credential.secret;
      
      const username = this.genName(result.additionalUserInfo.username);

      this.$store.dispatch('auth/login',{token,secret,username})
      localStorage.setItem('access_token',token)
      localStorage.setItem('secret_token',secret)
      localStorage.setItem('username',username)
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
  },
  methods: {
    genName(userName) {
      let sumOfcharCode = 0;
      const res = [];
      for (let i = 0; i < userName.length; i++) {
        sumOfcharCode = (sumOfcharCode + userName.charCodeAt(i)) / 2;
        if (i % 2 === 0) {
          res.push(String.fromCharCode(sumOfcharCode));
          sumOfcharCode = 0;
        }
      }
      return res.join("");
    }
  }
}
</script>