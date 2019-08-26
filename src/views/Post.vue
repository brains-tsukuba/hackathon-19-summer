<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs-10 offset-xs-1>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="items"
              v-model="shopName"
              label="お店の名前"
            ></v-select>
          </v-col>
        </v-row>

        <v-textarea
          filled
          label="Review"
          auto-grow
          v-model="reviewText"
          placeholder="お店に行った感想を入力してください。"
        />
        <v-col class="text-center" cols="12" sm="4">
          <div class="my-2">
            <v-btn large @click="handleSubmit()">送信</v-btn>
          </div>
        </v-col>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { db } from '@/plugins/db'

export default {
  data: function() {
    return {
      reviewText: '',
      shop: {},
      shopName: '',
    }
  },

  computed: {
    items: function() {
      return Object.entries(this.shop).map(([key, value]) => value.name)
    },
  },

  created: function() {
    const shopRef = db.ref('shop').once('value', (snapshot) => {
      const receivedShop = snapshot.val()
      this.shop = receivedShop
    })
  },
  methods: {
    handleSubmit: function() {
      const reviewRef = db.ref('review')
      const shopName = this.shopName
      const shop = this.shop
      const content = this.reviewText
      const date = new Date()
      const ymd = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`
      const key = Object.keys(shop).find((key) => shop[key].name === shopName)
      if (key) {
        const newRef = reviewRef.push()
        newRef.set({
          shop: key,
          content,
          date: ymd,
        })
        this.$router.push(`/review/${key}/${newRef.key}`)
      }
    },
  },
}
</script>
<style lang="scss">
.v-input__control {
  margin: 0 auto;
}
</style>
