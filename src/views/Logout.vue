<template>
  <div></div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { auth, provider } from '@/main'

export default {
  name: 'Logout',
  mounted() {
    auth.signOut().then(() => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('username')
      this.$store.dispatch('auth/logout')
    }).catch(function(error) {
      console.log(error)
      console.error('ログアウトに失敗しました')
    }).finally(() => {
      this.$router.push("/")
    });
  },
  computed: {
    ...mapGetters('auth', {
      authenticated: "authenticated",
      username: "username"
    })
  }
}
</script>