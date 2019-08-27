<template>
  <v-container fluid>
    <div class="display-2 text-center">レビュー一覧</div>
    <ul>
      <li class="text-justify" v-for="(review, id) in reviews" :key="id">
        <router-link tag="a" :to="`/review/${review.shopid}/${review.id}`">
          投稿者： {{ review.username }}さん<br />
          店名:  {{review.shopname}}
          評価： {{ review.content }}
          日時: {{review.date}}
        </router-link>
      </li>
    </ul>
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
  mounted: function() {
    const reviewRef = db.ref('review')
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
