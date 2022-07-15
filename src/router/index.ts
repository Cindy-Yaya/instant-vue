import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "AboutPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutPage.vue"),
  },
  {
    path: "/chat",
    name: "ChatPage",
    component: () => import("../views/ChatPage.vue"),
  },
  {
    path: "/following",
    name: "FollowingPage",
    component: () => import("../views/FollowingPage.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/profile/:id",
    name: "ProfilePage",
    component: () => import("../views/ProfilePage.vue"),
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: () => import("../views/RegisterPage.vue"),
  },
  {
    path: "/weather",
    name: "WeatherPage",
    component: () => import("../views/WeatherPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
