import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"
import basicSsl from "@vitejs/plugin-basic-ssl"

export default defineConfig({
    plugins: [vue(), tailwindcss(), basicSsl()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    server: {
        https: {},
        port: 8309,
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "https://cuts-desktops-dishes-abstract.trycloudflare.com",
                changeOrigin: true,
                secure: false
            }
        }
    }
})
