<template>
  <v-container fluid>

  <div class="display-2 ma-4 text-center">Shop Number .{{ $route.params.shopid }}</div>

  <div class="display-2 ma-4 text-center"> {{ shopName }}</div>
  
  <div class="evaluation">
  <p class="text-justify">{{text}}</p>
  </div>
  
  </v-container>

</template>

<script>
import { db } from "@/plugins/db"

export default {
  name: "Single",
  data: function() {
    return {
      reviews: {},
      title: "ラーメン屋〇〇",
      text: "美味しかった！！"
    }
  },

  computed: {
    shop : function() {
      return Object.entries(this.shop).map(([key, value]) => value.name)
    },
    review : function() {
      return Object.entries(this.review).map(([key, value]) => value.name)
    },
    shopName: function() {
      return this.shop[this.$route.params.shopid];
    }
  },

  created: function() {
    const reviewRef = db.ref('review').once('value',(snapshot) => {
      const receivedreview = snapshot.val();
      this.reviews = receivedreview;
    })
    const shopRef = db.ref('shop').once('value',(snapshot) => {
      const receivedShop = snapshot.val();
      this.shop = receivedShop;
    })
  },
}
</script>

<style lang="scss">
  .display-2{
    font-family:serif;
  }
  .evaluation{
    border: solid 3px #999;
    border-radius:2px;
    margin-top:75px;
    padding:15px;
  }


  
</style>