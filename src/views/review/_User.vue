<template>
  <v-container fluid>
    <div class="display-2 ma-4 text-center">{{ title }}について</div>

    <div class="elevation-2">
      <p class="text-justify">{{ text }}</p>
      
    </div>
    <div>
      <p class="text-justify">by {{ user }} , at {{date}}</p>
    </div>
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
</style>
