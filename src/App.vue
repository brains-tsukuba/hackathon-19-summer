<template>
  <v-app>
    <v-app-bar app color="primary" style="box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.25) !important">
    <v-toolbar-title class="headline white--text">
      <router-link tag="span" to="/" class="cursor-pointer">めしつくば</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon class="d-flex d-md-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-btn class="mr-2 d-none d-md-flex" to="/post">とうこうする</v-btn>
    <v-btn class="mr-2 d-none d-md-flex" to="/review">レビューいちらん</v-btn>
    <v-btn class="mr-2 d-none d-md-flex" v-if="authenticated">なまえ: {{ username }}さん</v-btn>
    <v-btn class="mr-2 d-none d-md-flex" v-if="authenticated" tag="a" to="/logout">ろぐあうと</v-btn>
    <v-btn class="mr-2 d-none d-md-flex" v-else tag="a" to="/login">ろぐいん</v-btn>
    </v-app-bar>

    <v-container>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item to="/post">とうこうする</v-list-item>
          <v-list-item to="/review">レビューいちらん</v-list-item>
          <v-list-item v-if="authenticated">なまえ: {{ username }}さん</v-list-item>
          <v-list-item v-if="authenticated" to="/logout">ろぐあうと</v-list-item>
          <v-list-item v-else to="/login">ろぐいん</v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </v-container>

    <v-content class="pa-0">
      <router-view></router-view>
    </v-content>

    <div class="footer">
      <v-card>
        <v-footer absolute color="primary" class="font-weight-medium">
          <v-col cols="12" class="copyright">
            <p class="footer-left">COPYRIGHTーBrains<p>
            <p class="footer-right">ALL RIGHTS RESERVED.</p>
          </v-col>
        </v-footer>
      </v-card>
    </div>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data: function() {
    return {
      drawer: null
    }
  },
  computed: {
    ...mapGetters('auth', {
      authenticated: "authenticated",
      username: "username",
    })
  },

  created() {
    const token = localStorage.getItem('access_token');
    const secret = localStorage.getItem('secret_token');
    const username = localStorage.getItem('username');
    if(!!token && !!secret && !!username) {
      this.$store.dispatch('auth/login',{token,secret,username})
    }
  }
};
</script>

<style lang="scss">
.v-content__wrap {
 background-color:#E4FFEC;
}
  a{
    text-decoration:none;
    color:#000 !important;
  }
  #title {
    font-family: Nico Moji !important;
  }
  .wrapper{
    position: relative;
  }
  .footer{
    position: relative;
    bottom:0;
    width:100%;
    line-height:1px;
    font-size:18px;
  }
  .footer-left{
    float:left;
    color:#fff;
  }
  .footer-right{
    float:right;
    color:#fff;
  }
  .copyright{
    padding:5px;
    margin-bottom:0;
  }
  .cursor-pointer{
    cursor:pointer;
  }

</style>
