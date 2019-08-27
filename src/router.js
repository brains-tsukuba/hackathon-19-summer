import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import About from "./views/About.vue";
import Post from "./views/Post.vue";
import ReviewByUser from "./views/review/_User.vue";
import ReviewByStore from "./views/review/_Store.vue";
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",                   /** このアプリケーションの紹介ページ */
      name: "index",
      component: Index
    },
    {
      path: "/about",              /** 使い方 */
      name: "about",
      component: About
    },
    {
      path: "/post",               /** 投稿・共有画面 */
      name: "post",
      component: Post
    },
    {
      path: "/review/:shopid/:id", /** 投稿 */
      name: "reviewbyuser",
      component: ReviewByUser
    },
    {
      path: "/review/:shopid",     /** お店ごとの投稿一覧 */
      name: "reviewbystore",
      component: ReviewByStore
    },
    {
      path: "/login",
      name: 'login',
      component: Login
    }
  ]
});
