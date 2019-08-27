<template>
  <div></div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { auth, provider } from '@/main'

export default {
  name: 'Logout',
  created() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('username')
    this.$store.dispatch('auth/logout')
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