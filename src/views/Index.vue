<template>
  <v-container fluid class="pa-0">
    <v-parallax src="https://i.imgur.com/u2iotgt.jpg" style="height: 28rem">
      <div class="text-center nico black--text" style="font-size: 64px">めしつくば</div>
      <div class="text-center nico white--text" style="font-size: 48px">つくばのめしのサイト</div>
    </v-parallax>
    <v-container fluid class="text-center mb-5">
      <v-btn large elevation="0" rounded class="secondary white--text" to="/review" style="box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.25) !important; min-height: 4rem; min-width: 20vw">
        みんなのとうこうをみる
      </v-btn>
    </v-container>
    <v-layout wrap>
      <v-flex my-5 xs10 offset-xs1 class="headline">
        <v-card elevation="1" class="pb-4 text-center round">
          <v-card-title class="font-weight-bold justify-center">せつめい</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="Roboto mt-2">つくば市内の飲食店のレビューサイト</v-card-text>
          <v-card-text class="Roboto mb-2">飲食店のレビューを投稿・閲覧できるよ！</v-card-text>
        </v-card>
      </v-flex>
      <v-flex my-5 xs10 offset-xs1 class="headline">
        <v-card elevation="1" class="pb-4 text-center round how_to_use">
          <v-card-title class="font-weight-bold justify-center">つかいかた</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="Roboto mt-2">①Twitterアカウントを用意してね！</v-card-text>
          <v-card-text class="Roboto">②ページ上部のとうこうボタンをクリック！</v-card-text>
          <v-card-text class="Roboto mb-2">③お店の名前を選択！レビューを書いたら送信！</v-card-text>
          <v-card-text><a href="http://brains-tsukuba.com">製作 - Brains Tsukuba</a></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
</script>

<style lang="scss">
.round {
  border-radius: 1rem;
}

.headline v-card-title{
  font-family: Nico Moji !important;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
  color: #000000;
  letter-spacing:2px;
}

.Roboto {
  font-family: Roboto !important;
}
.nico {
  font-family: Nico Moji !important;
}

.background-white{
  background:white;
  margin-top:30px;
  border-radius: 1rem;
}
.how_to_use{
  margin-bottom:30px;
}

</style>
