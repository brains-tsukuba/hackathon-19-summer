<template>
  <v-container fluid>
    <v-flex xs12 md10 offset-md1>
    <v-card class="my-5 pa-2 round" elevation="0">
      <v-card-title class="text-center justify-center mb-2 list">{{ title }}</v-card-title>
      <v-divider></v-divider>
      <div class="list my-4" v-for="(review, id) in sortedReviews" :key="id">
    <router-link tag="a" :to="`/review/${$route.params.shopid}/${review.key}`">
          <div class="contents content pa-4 body-1 list">評価：  {{review.item}}</div>
          <div class="contents content pa-4 caption list">投稿者： {{ review.user }}さん 投稿日： {{review.date}}</div>
        </router-link>
      </div>
    </v-card>
    </v-flex>
    <div v-if="Object.keys(reviews).length === 0">
      <div>{{ title }}のレビューはありません</div>
    </div>
  </v-container>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'ReviewByStore',
  data: function() {
    return {
      title: '',
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
  created: function() {
    const reviewRef = db.ref('review')
    reviewRef
      .orderByChild('shop')
      .equalTo(this.$route.params.shopid)
      .once('value', (snapshot) => {
        const received = snapshot.val()
        this.reviews = Object.entries(received).map(([key, value]) => ({
          key,
          user: value.username,
          item: value.content,
          date: value.date,
        }))
      })
    const thisShopRef = db.ref(`shop/${this.$route.params.shopid}`)
    thisShopRef.once('value', (snapshot) => {
      const received = snapshot.val()
      this.title = received.name
    })
  },
}
</script>

<style lang="scss">
.display-2 {
  margin: 50px 0;
  font-family: serif;
}
.text-justify {
  border: solid 2px #999;
  border-radius: 2px;
  margin-top: 75px;
  padding: 15px;
}

</style>
