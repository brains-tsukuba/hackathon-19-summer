import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Post from "./views/Post.vue";
import Single from "./views/review/Single.vue";
import ReviewByStore from "./views/review/ReviewByStore.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/post",
      name: "post",
      component: Post
    },
    {
      path: "/review/:shopid/:id",
      name: "reviewsingle",
      component: Single
    },
    {
      path: "/review/:shopid",
      name: "reviewbystore",
      component: ReviewByStore
    }
  ]
});
