<template>
  <v-app>
    <v-app-bar app class="primary white--text">
      <v-toolbar-title class="headline text-uppercase">
        <router-link tag="a" to="/" class="black--text font-weight-black" id="title">めしつくば</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link tag="a" to="/about">about</router-link>
      <router-link tag="a" to="/review/reviewbystore">review</router-link>
      <div v-if="authenticated">{{username}} </div>
      <router-link v-if="authenticated" tag="a" to="/logout">logout</router-link>
      <router-link v-else tag="a" to="/login">login</router-link>
      <v-btn tag="a" color="secondary" to="/post" class="px-5">post</v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters('auth', {
      authenticated: "authenticated",
      username: "username",
    })
  },

  created() {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    if(!!token && !!username) {
      this.$store.dispatch('auth/login',{token,username})
    }
  }
};
</script>

<style lang="scss">
  a{
    text-decoration:none;
    color:#000 !important;
    margin:0 1rem;
  }
  #title {
    font-family: Nico Moji !important;
  }
</style>
