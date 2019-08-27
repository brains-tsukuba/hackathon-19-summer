<template>
  <div>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <v-layout align-center column justify-center>
        <h1 class="title">めしつくば</h1>
        <v-btn class="mt-4" depressed large color="secondary" to="post">getting start</v-btn>
      </v-layout>
    </v-parallax>
    <v-layout wrap>
      <v-flex my-5 xs10 offset-xs1>
        <div class="headline font-weight-bold mb-3">
          <h2>ABOUT</h2>
        </div>
        <v-card>
          <v-card-text>
            <v-card-text
              class="subheading font-weight-bold"
            >
            つくば市内の飲食店のレビューサイト<br>
            飲食店のレビューを投稿・閲覧できるよ！<br>
            
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex my-5 xs10 offset-xs1>
        <h2 class="headline font-weight-bold mb-3">〜投稿方法〜</h2>
        <v-card>
          <v-card-text>
            <v-card-text
              class="subheading font-weight-bold"
            >
            <div>①Twitterアカウントを用意してね！</div>
            <div>②ページ上部のPOSTボタンをクリック！</div>
            <div>③お店の名前を選択！レビューを書いたら送信！</div>

            </v-card-text>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <router-link tag="a" to="/about">About</router-link>
    <router-link tag="a" to="/post">Post</router-link>
     <router-link tag="a" to="/login">Login</router-link>
    <router-link tag="a" to="/review/0CDVFn0j8rmMht62pBFL"
      >ReviewByStore</router-link
    >
    <router-link tag="a" to="/review/0CDVFn0j8rmMht62pBFL/1"
      >ReviewByUser</router-link
    >
  </div>
</template>

<script>
</script>
<style lang="scss">

.title{
  position: absolute;
  width: 93px;
  height: 24px;
  left: 142px;
  top: 299px;
  font-family: Nico Moji;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
}

.headline{
  position: absolute;
  width: 165px;
  height: 40px;
  left: 106px;
  top: 294px;
  background: rgba(255, 255, 255, 0.25);
}

.headline h2{
  position: absolute;
  width: 93px;
  height: 24px;
  left: 142px;
  top: 299px;
  font-family: Nico Moji;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
}

.subheading{
  position: absolute;
  width: 344px;
  height: 219px;
  left: 16px;
  top: 360px;
  background: rgba(255, 255, 255, 0.25);
}

.subheading div{
  position: absolute;
  width: 344px;
  height: 219px;
  left: 16px;
  top: 361px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
}
</style>
