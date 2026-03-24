import { createWebHistory, createRouter } from "vue-router"

const routes = [
    // Landing page - Home with login form
    { path: "/", component: () => import("@/pages/Home.vue"), meta: { needLogin: false, block: true } },

    // Auth pages
    { path: "/register", component: () => import("@/pages/auth/Register.vue"), meta: { needLogin: false, block: false } },

    // app
    {
        path: "/app",
        component: () => import("@/layout/index.vue"),
        redirect: "/app/chat",
        children: [
            { path: "connect", component: () => import("@/pages/app/Connect.vue") },
            { path: "chat", component: () => import("@/pages/app/Chat.vue") },
            { path: "contacts", component: () => import("@/pages/app/Contacts.vue") },
            { path: "history", component: () => import("@/pages/app/History.vue") },
            { path: "staff", component: () => import("@/pages/app/Staff.vue") },
            { path: "settings", component: () => import("@/pages/app/Settings.vue") }
        ]
    },

    { path: "/:pathMatch(.*)*", redirect: "/" }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
