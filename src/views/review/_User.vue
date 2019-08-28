<template>
  <v-container fluid>
    <v-flex xs12 md10 offset-md1>
    <v-card class="my-5 pa-2 round" elevation="0">
      <v-card-title class="text-center justify-center mb-2 review-title list" style="line-height: 100%">{{ user }}さんの<br><router-link tag="strong" :to="`/review/${$route.params.shopid}`" class="secondary cursor-pointer">{{ title }}</router-link>についてのレビュー</v-card-title>
      <v-divider></v-divider>
      <div class="list my-4">
        <div class="contents content pa-4 list">評価 ： {{ text }}</div>
        <div class="contents content pa-4 list">投稿日： {{ date }}</div>
      </div>
    </v-card>
    </v-flex>
    <div v-if="user === ''">この投稿は存在しません</div>
  </v-container>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'ReviewByUser',
  data: function() {
    return {
      title: '',
      text: '',
      user: '',
      date: ''
    }
  },

  created: function() {
    const reviewRef = db.ref(`review/${this.$route.params.id}`)
    reviewRef.once('value',(snapshot) => {
      const data = snapshot.val()
      if(!!data) {
        this.text = data.content;
        this.user = data.username;
        this.date = data.date;
      } else {
        this.$router.go(-1)
      }
      
    })
    const shopRef = db.ref(`shop/${this.$route.params.shopid}`)
    shopRef.once('value', (snapshot) => {
      const data = snapshot.val()
      if(!!data) {
        this.title = data.name;
      } else {
        this.$router.go(-1)
      }
      
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
.review-title{
  font-size:20px !important;
}
</style>
