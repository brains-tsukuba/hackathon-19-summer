<template>
  <v-container fluid>
    <v-flex xs12 md10 offset-md1>
    <div class="background">
      <v-card class="my-5 pa-2 round" elevation="0">
        <v-card-title class="text-center justify-center mb-2">レビュー</v-card-title>
        <v-divider></v-divider>
        <div class="list my-4" v-for="(review, id) in sortedReviews" :key="id">
          <router-link tag="a" :to="`/review/${review.shopid}/${review.id}`">
            <div class="content Roboto mx-auto pa-4 body-1">評価　： {{ review.content }} in {{review.shopname}}</div>
            <div class="content Roboto mx-auto pa-4 caption">投稿者： {{ review.username }}さん　投稿日： {{review.date}}</div>
          </router-link>
        </div>
      </v-card>
    </div>
    </v-flex>
  </v-container>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'All',
  data: function() {
    return {
      reviews: [],
    }
  },
  computed: {
    sortedReviews: function() {
      const arr = this.reviews;
      const newArr = arr.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      })
      return newArr;
    }
  },
  mounted: function() {
    const reviewRef = db.ref('review').orderByChild('date').limitToLast(100)
    reviewRef.once('value',(snapshot) => {
      const data = snapshot.val()
      for(const key in data) {
        const value = data[key]
        const thisShopRef = db.ref(`shop/${value.shop}`)
        thisShopRef.once('value',(snap) => {
          const shopname = snap.val().name;
          this.reviews.push({
            shopid: value.shop,
            id: key,
            username: value.username,
            content: value.content,
            date: value.date,
            shopname
          })
        })
        
      }
    })
  },
}
</script>

<style lang="scss">
.list{
  padding: 15px;
  font-family: Roboto !important;
}
.text-center{
  font-family: Nico Moji;
  font-size:50px;
  margin-top:35px;
  letter-spacing:2px;
}
li{
  list-style:none;
}
a{
  display:block;
  margin:0 auto;
  max-width:600px;
  border: solid 2px #999;
  border-radius: 4px;
  text-decoration:none;
}
/*.content{
  width:70%;
}
.all-vue{
  margin-bottom:50px;
}
@media(min-width: 480px) {
  .all-vue {
    margin: auto;
  }
  .background{
    width:100vw;
  }
}*/
</style>
