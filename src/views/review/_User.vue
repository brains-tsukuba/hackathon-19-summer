<template>
  <v-container fluid>
    <div class="display-2 ma-4 text-center">
      Shop Number .{{ $route.params.shopid }}
    </div>

    <div class="display-2 ma-4 text-center">{{ title }}</div>

    <div class="elevation-2">
      <p class="text-justify">{{ text }}</p>
    </div>
  </v-container>
</template>

<script>
import { db } from '@/plugins/db'

export default {
  name: 'ReviewByUser',
  data: function() {
    return {
      fireShop: {},
      fireReviews: {},
      title: 'ラーメン屋〇〇',
      text: '美味しかった！！',
    }
  },

  computed: {
    shops: function() {
      return Object.entries(this.fireShop).map(([key, value]) => value.name)
    },
    reviews: function() {
      return Object.entries(this.fireReview).map(([key, value]) => value.name)
    },
    shopName: function() {
      return this.shop[this.$route.params.shopid]
    },
  },

  created: function() {
    const reviewRef = db.ref('review').once('value', (snapshot) => {
      const receivedreview = snapshot.val()
      this.fireReviews = receivedreview
    })
    const shopRef = db.ref('shop').once('value', (snapshot) => {
      const receivedShop = snapshot.val()
      this.fireShop = receivedShop
    })
  },
}
</script>

<style lang="scss">
.display-2 {
  font-family: serif;
}
.evaluation {
  border: solid 3px #999;
  border-radius: 2px;
  margin-top: 75px;
  padding: 15px;
}
</style>
