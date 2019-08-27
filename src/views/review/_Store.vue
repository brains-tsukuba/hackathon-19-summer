<template>
  <v-container fluid>
    <div class="display-2 text-center">{{ title }}</div>
    <ul>
    <li class="text-justify" v-for="(review, id) in reviews" :key="id">
    <router-link tag="a" :to="`/review/${$route.params.shopid}/${review.key}`">
      投稿者： {{ review.user }}さん<br />
      評価： {{ review.item }}
      日時: {{review.date}}
    </router-link>
    </li>
    </ul>
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
