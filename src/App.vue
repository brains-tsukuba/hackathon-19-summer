<template>
  <v-app>
    <v-app-bar app class="primary white--text">
      <v-toolbar-title class="headline text-uppercase">
        <router-link tag="a" depressed to="/" class="white--text font-weight-black" id="title">めしつくば</router-link>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn class="primary white--text" depressed tag="a" to="about">about</v-btn>
        <v-btn class="primary white--text" depressed tag="a" to="review">review</v-btn>
        <v-btn class="primary white--text" depressed v-if="authenticated">{{username}} </v-btn>
        <v-btn class="primary white--text" depressed v-if="authenticated" tag="a" to="/logout">logout</v-btn>
        <v-btn class="primary white--text" depressed v-else tag="a" to="/login">login</v-btn>
        <v-btn class="primary" depressed tag="a" color="secondary" to="/post">post</v-btn>
      </v-toolbar-items>
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
  }
  #title {
    font-family: Nico Moji !important;
  }
</style>
