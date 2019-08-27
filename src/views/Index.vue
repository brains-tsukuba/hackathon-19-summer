<template>
  <div>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <v-layout align-center column justify-center>
        <h1 class="title">めしつくば</h1>
      </v-layout>
    </v-parallax>
    <v-layout wrap>
      <v-flex my-5 xs10 offset-xs1>
        <div class="headline font-weight-bold justify-center">
          <h2 class="font-weight-bold">ABOUT</h2>
        </div>
        <v-card>
          <v-card-text>
            <v-card-text
              class="subheading font-weight-bold justify-center">
            つくば市内の飲食店のレビューサイト<br>
            飲食店のレビューを投稿・閲覧できるよ！<br>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex my-5 xs10 offset-xs1>
        <h2 class="headline font-weight-bold justify-center">〜投稿方法〜</h2>
        <v-card>
          <v-card-text>
            <v-card-text
              class="subheading font-weight-bold justify-center"
            >
            <p>
            ①Twitterアカウントを用意してね！<br>
            ②ページ上部のPOSTボタンをクリック！<br>
            ③お店の名前を選択！レビューを書いたら送信！</p>

            </v-card-text>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
</script>

<style lang="scss">
.title{
  width: 93px;
  height: 24px;
  left: 142px;
  top: 299px;
  font-family: Nico Moji;
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
}

.headline{
  width: 165px;
  height: 40px;
  left: 106px;
  top: 294px;
  background: rgba(255, 255, 255, 0.25);
}

.headline h2{
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
  font-weight: bold;
  font-size: 20px;
  line-height: 60px;
  background: rgba(255, 255, 255);
}

.subheading p{
  font-family: Roboto;
  font-style: normal;
  
  display: flex;
  
  text-align: center;
  color: #000000;
}
</style>
