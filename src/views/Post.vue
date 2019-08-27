<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs10 offset-xs1>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="items"
              v-model="shopName"
              label="お店の名前"
            ></v-select>
          </v-col>
        </v-row>
        <div class="my-2">
          <v-btn large @click="searchNearStore()">近くのお店を検索</v-btn>
        </div>
         <v-card
            class="mx-auto my-2"
            tile
          >
            <v-list-item v-for="(shop, id) in nearShop" :key="id" ripple @click="shopName = shop[1].name">
              <v-list-item-content>
                <v-list-item-title>{{ shop[1].name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
         </v-card>
        <v-textarea
          filled
          label="Review"
          auto-grow
          v-model="reviewText"
          placeholder="お店に行った感想を入力してください。"
        />
        <div class="my-2">
          <div v-if="!authenticated" >ログインしてください</div>
          <v-btn large @click="handleSubmit()" :disabled="!ableSubmit">投稿</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { db } from '@/main'

export default {
  data: function() {
    return {
      reviewText: '',
      shop: {},
      nearShop: [],
      shopName: '',
    }
  },
  mounted: function() {
    this.$nextTick(function () {
      const shopRef = db.ref('shop').once('value', (snapshot) => {
        const receivedShop = snapshot.val()
        this.shop = receivedShop
      });
    })
  },
  methods: {
    async searchNearStore() {
      const {latitude, longitude} = await this.initGeolocationSearch();
      const res = Object.entries(this.shop).filter(([key, value]) => {
        const diff = Math.pow(latitude - value.latitude,2) + Math.pow(longitude - value.longitude,2) < 0.00005
        return diff
      })
      this.nearShop = res;

    },
    async initGeolocationSearch() {
      return new Promise((resolve, reject) => {
        if (window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(
            (response) => {
              resolve(response.coords);
            },
            () => {
              console.err('データの取得中にエラーが発生しました。');
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 10000,
            },
          );
        } else {
          reject('このブラウザでは位置情報を取得できません');
        }
      })
      .catch(() => {
        console.err('データが取得できませんでした。電波の届きやすい場所で再度お試しください。',);
      });
    },
    handleSubmit() {
      const reviewRef = db.ref('review')
      const shopName = this.shopName
      const shop = this.shop
      const content = this.reviewText
      const date = new Date()
      const ymd = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`
      const key = Object.keys(shop).find((key) => shop[key].name === shopName)
      const newRef = reviewRef.push()
      newRef.set({
        shop: key,
        content,
        date: ymd,
        username: this.username
      })
      this.$router.push(`/review/${key}/${newRef.key}`)
    },
  },
  computed: {
    items: function() {
      return Object.entries(this.shop).map(([key, value]) => value.name)
    },
    ableSubmit: function() {
      return this.shopName !== '' && this.reviewText !== '' && this.authenticated
    },
    ...mapGetters('auth', {
      authenticated: "authenticated",
      username: "username"
    })
  }
}
</script>
<style lang="scss">
.v-input__control {
  margin: 0 auto;
}

</style>
