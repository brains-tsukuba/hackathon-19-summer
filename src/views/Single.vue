<template>
  <v-container fluid>

  <div class="display-2 ma-4 text-center">Shop Number .{{ $route.params.id }}</div>

  <div class="display-2 ma-4 text-center"> {{title}}</div>
  
  <div class="evaluation">
  <p class="text-justify">{{text}}</p>
  </div>
  
  </v-container>

</template>

<script>
export default {
  name: "Single",
  data: function() {
    return {
      title: "ラーメン屋〇〇",
      text: "美味しかった！！"
    }
  },
}
</script>

<style lang="scss">
  .display-2{
    font-family:serif;
  }
  .evaluation{
    border: solid 3px #999;
    border-radius:2px;
    margin-top:75px;
    padding:15px;
  }


  
</style>