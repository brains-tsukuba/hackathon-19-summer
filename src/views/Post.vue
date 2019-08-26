
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
          name="input-7-1"
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
import { db } from "@/plugins/db"

export default {      
  data: function() {
    return {
      reviewText: "",
      shop: [],
      shopName: ""
    }
  },

  computed: {
    items : function() {
      return this.shop.map(v => {
        return v.name;
      });
    }
  },

  firebase: {
    shop: db.ref('shop'),
  },

  created: function() {
    const shopRef = db.ref('shop')
    // setup adding childs and save the callback to remove it later
    this.shopRef.on(
      'child_added',
      (snapshot, previousKey) => {
        this.shop.splice(
          // this function is omitted for simplicity reasons
          // it would find the position the new element should
          // be inserted at
          findIndexByKey(this.shop, previousKey) + 1,
          0,
          // get the actual value
          snapshot.val()
        )
      },
      // we are omitting this function for simplicity reasons
      onErrorHandler
    )

    // do the same for items being removed
    this.shopRef.on(
      'child_removed',
      snapshot => {
        // remove the child from the array
        this.shop.splice(findIndexByKey(this.shop, snapshot.key), 1)
      },
      onErrorHandler
    )

    // do the same for items being modified
    this.shopRef.on(
      'child_changed',
      snapshot => {
        // replace the child with the new value
        this.shop.splice(
          findIndexByKey(this.shop, snapshot.key),
          1,
          snapshot.val()
        )
      },
      onErrorHandler
    )

    // and last but not least handle elements being moved
    // this is useful when ordering items
    this.shopRef.on(
      'child_moved',
      (snapshot, previousKey) => {
        // retrieve the item being moved
        const record = this.shop.splice(
          findIndexByKey(this.shop, snapshot.key),
          1
        )[0]
        // add it to the place it should be
        this.shop.splice(
          findIndexByKey(this.shop, previousKey) + 1,
          0,
          // we could also use snapshot.val()
          record
        )
      },
      onErrorHandler
    )
  },
  methods: {
    handleSubmit: function() {
      const reviewRef = db.ref('review');
      const shopName = this.shopName;
      const items = this.items;
      const content = this.reviewText;
      const date = new Date();
      const ymd = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      const key = Object.keys(items).find(key => items[key] === shopName );
      if(key) {
        reviewRef.push().set({
          shop: key,
          content,
          date: ymd
        })
      }
      
    }
  }
}
</script>
<style lang="scss">
.v-input__control {
  margin:0 auto;
}
</style>
