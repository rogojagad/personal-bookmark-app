import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants";
import Vue from "vue";
import VueRouter from "vue-router";
import BookmarkPage from "./components/page/BookmarkPage.vue";
import LoginPage from "./components/page/LoginPage.vue";
import NotFoundPage from "./components/page/NotFoundPage.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "bookmark-page",
      component: BookmarkPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login-page",
      component: LoginPage,
      beforeEnter: function(to, from, next) {
        const isAuthenticated = Boolean(
          localStorage.getItem(ACCESS_TOKEN_KEY) &&
            localStorage.getItem(REFRESH_TOKEN_KEY)
        );

        if (isAuthenticated) {
          next("/");
        }

        next();
      },
    },
    {
      path: "*",
      name: "not-found-page",
      component: NotFoundPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(
    localStorage.getItem(ACCESS_TOKEN_KEY) &&
      localStorage.getItem(REFRESH_TOKEN_KEY)
  );

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
