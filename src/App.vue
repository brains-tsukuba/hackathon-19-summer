<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link tag="a" to="/" class="black--text font-weight-black">めしつくば</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link tag="a" to="/about">about</router-link>
      <router-link tag="a" to="/review/reviewbystore">review</router-link>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App'
};
</script>

<style lang="scss">
  a{
    text-decoration:none;
    color:#000;
    margin:0 10px;
  }
</style>
