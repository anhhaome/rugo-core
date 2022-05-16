import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/signin" },
    { path: "/signout", redirect: "/signin" },
    {
      path: "/signin",
      component: () => import("../layouts/AuthLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/SignInView.vue"),
        },
      ],
    },
    {
      path: "/dashboard",
      component: () => import("../layouts/DashboardLayout.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("../views/dashboard/HomeView.vue"),
        },

        {
          path: ":collectionName",
          name: ":collectionName",
          component: () => import("../views/dashboard/CollectionView.vue"),
        }
      ]
    }
  ]
})

export default router
