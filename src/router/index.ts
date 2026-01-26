import { createWebHistory, createRouter } from "vue-router"

const routes = [
    // Landing page - Home with login form
    { path: "/", component: () => import("@/pages/Home.vue"), meta: { needLogin: false, block: true } },

    // app
    {
        path: "/app",
        component: () => import("@/layout/index.vue"),
        children: []
    },

    { path: "/:pathMatch(.*)*", redirect: "/" }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
