import Vue from "vue";
import Router from "vue-router";
import BookmarkPage from "./components/page/BookmarkPage.vue";
import NotFoundPage from "./components/page/NotFoundPage.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "bookmark-page",
      component: BookmarkPage,
    },
    {
      path: "*",
      name: "not-found-page",
      component: NotFoundPage,
    },
  ],
});
