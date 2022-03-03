import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "exploreDetail",
    component: () => import("../views/Item.vue"),
  },
  {
    path: "/mynfts",
    name: "MyNfts",
    component: () => import("../views/MyNfts.vue"),
  },
  {
    path: "/nftDetail/:id",
    name: "NftDetail",
    component: () => import("../views/NftDetail.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
