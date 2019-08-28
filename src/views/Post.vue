<template>
  <v-container fluid>
    <v-layout class="post-vue">
      <v-flex xs10 offset-xs1 class="wrapper">
        
        <div class="shop_select"> 
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="items"
              v-model="shopName"
              label="お店の名前"
            ></v-select>
          </v-col>
        </v-row>
        <div class="my-2 button_justify">
          <v-btn large @click="searchNearStore()" class="search_button">ちかくをけんさく</v-btn>
        </div>
        </div>
         <v-card
            class="mx-auto my-2"
            tile
            v-if="visible"
          >
            <v-list-item v-for="(shop, id) in nearShop" :key="id" ripple @click="shopName = shop[1].name; visible=false">
              <v-list-item-content>
                <v-list-item-title class="list">{{ shop[1].name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
         </v-card>
        <v-textarea
          filled
          label="Review"
          auto-grow
          v-model="reviewText"
          class="textarea"
        />
        <div v-if="!authenticated" class="login">ログインしてね</div>
        <div class="button_justify">
          <v-btn large @click="handleSubmit()" :disabled="!ableSubmit">投稿</v-btn>
          <v-checkbox color="primary" v-model="tweet" label="Twitterにも投稿する"></v-checkbox>
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
      tweet: true,
      visible: true,
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
      this.visible = true;
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
    async handleSubmit() {
      const reviewRef = db.ref('review')
      const shopName = this.shopName
      const shop = this.shop
      const content = this.reviewText
      const date = new Date()
      const ymd = `${date.getFullYear()}-${("0"+(date.getMonth() + 1)).slice(-2)}-${("0"+date.getDate()).slice(-2)}`
      const key = Object.keys(shop).find((key) => shop[key].name === shopName)
      const newRef = reviewRef.push()
      newRef.set({
        shop: key,
        content,
        date: ymd,
        username: this.username
      })
      const tweet = `${shopName}のレビューを投稿しました。レビュー内容はこちら！ https://meshitsukuba.web.app/review/${key}/${newRef.key}`;
      if (this.tweet) {
        await fetch(`https://script.google.com/macros/s/AKfycbzO8YEvSj_CpVWtknt61y3BA7Mz58ut2WEcVRV3uDVzxQ0W5K-u/exec?at=${this.accessToken}&sc=${this.secretToken}&ct=${encodeURIComponent(tweet)}`)
      }
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
      username: "username",
      accessToken: "accessToken",
      secretToken: "secretToken"
    })
  }
}
</script>
<style lang="scss">

label {
  font-family: arial !important;
}
.v-input__control {
  margin: 0 auto;
}

.shop_select{
  border: solid 2px #999;
  margin-top:30px;
  border-radius: 0.5rem;
  margin-bottom:40px;
}


h2{
  margin:0 auto;
}
.d-flex{
  margin:0 auto;
}
.button_justify{
  text-align: center;
}
.v-list-item__title{
  font-family:Roboto;
}
.login{
  text-align:center;
  margin:20px 0;
}

textarea{
  margin-top:100px
}
.wrapper{
  border-radius:4px;
  background-color:#fff;
  max-width:650px;
  margin:0 auto;
  padding:40px 40px;
  margin-top:60px;
}
textarea{
  font-family:Roboto !important;
}
.v-select__selection{
  font-family:Roboto;
}

.post-vue{
  background-color:"primary";
}
</style>
