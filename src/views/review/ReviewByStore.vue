<template>
  <v-container fluid>

  <div class="display-2 text-center">Shop Number .{{ $route.params.id }}</div>

  <div class="display-2 text-center"> {{title}}</div>
  
  <p class="text-justify" v-for="(review, id) in reviews" :key="id">
  投稿者： {{review.user}}さん<br>
  評価： {{review.item}}
  </p>


  
  
  </v-container>

</template>

<script>
import { db } from "@/plugins/db"

export default {
  name: "ReviewByStore",
  data: function() {
    return {
      title: "",
      reviews:[]
    }
  },
  // computed: {
  //   shopName: function() {
  //     return this.shop[this.$route.params.shopid];
  //   }
  // },
  created: function() {
    const reviewRef = db.ref('review')
    reviewRef.orderByChild("shop").equalTo(this.$route.params.shopid).once('value',(snapshot) => {
      const received = snapshot.val();
      this.reviews = Object.entries(received).map(([key, value]) => ({
        user: 'anonymus',
        item: value.content,
        date: value.date
      }))
    });
    const thisShopRef = db.ref(`shop/${this.$route.params.shopid}`);
    thisShopRef.once('value',snapshot => {
      const received = snapshot.val();
      this.title = received.name
    })
  },
}
</script>

<style lang="scss">
  .display-2{
    margin:50px 0;
    font-family:serif;
  }
  .text-justify{
    border: solid 2px #999;
    border-radius:2px;
    margin-top:75px;
    padding:15px;
  }

  


  
</style>