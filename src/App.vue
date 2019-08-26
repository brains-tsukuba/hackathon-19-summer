<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>めしつくば</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link tag="a" to="/about">about</router-link>
      <router-link tag="a" to="/review">review</router-link>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style lang="scss">
  a{
    text-decoration:none;
    color:#000;
    margin:0 10px;
  }
</style>
