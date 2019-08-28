<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title class="headline text-uppercase white--text">
        <span>めしつくば</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-2">とうこうする</v-btn>
      <v-btn class="mr-2">レビューいちらん</v-btn>
    </v-app-bar>

    <v-content class="text-center">
      <!-- Index.vue -->
      <v-parallax src="@/assets/header.jpg" style="height: 21rem">
        <v-layout align-center column justify-center>
          <span style="font-size: 7rem">めしつくば</span>
        </v-layout>
      </v-parallax>
      <v-container fluid>
        <v-btn rounded class="secondary white--text"
          >みんなのとうこうをみる</v-btn
        >
      </v-container>
      <v-container fluid>
        <v-card elevation="1" round>
          <v-card-title>つかいかた</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="default">つくば市内の飲食店のレビューサイト</v-card-text>
          <v-card-text class="default">飲食店のレビューを投稿・閲覧できるよ！</v-card-text>
          
          <v-card-title>投稿方法</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="default">①Twitterアカウントを用意してね！</v-card-text>
          <v-card-text class="default">②ページ上部のとうこうボタンをクリック！</v-card-text>
          <v-card-text class="default">③お店の名前を選択！レビューを書いたら送信！</v-card-text>

        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    //
  }),
}
</script>

<style lang="scss" scoped>
.default {
  font-family: "arial";
}
</style>
