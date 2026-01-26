import { globalIgnores } from "eslint/config"
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript"
import pluginVue from "eslint-plugin-vue"
import pluginOxlint from "eslint-plugin-oxlint"
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting"

export default defineConfigWithVueTs(
    globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

    pluginVue.configs["flat/essential"],
    vueTsConfigs.recommended,
    ...pluginOxlint.configs["flat/recommended"],
    skipFormatting,

    {
        name: "app/files-to-lint",
        files: ["**/*.{ts,mts,tsx,vue}"],
        rules: {
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-empty-object-type": "warn",
            "vue/multi-word-component-names": "warn",
            "vue/no-unused-components": "warn" // Thêm dòng này
            // thêm báo lỗi nếu biến sử dụng không đúng kiểu dữ liệu
            // "@typescript-eslint/no-unused-vars": "error",
            // "@typescript-eslint/no-explicit-any": "error",
            // "@typescript-eslint/no-empty-object-type": "error",
            // "vue/multi-word-component-names": "error",
            // "vue/no-unused-components": "error",
            // "vue/no-unused-vars": "error",
            // "vue/no-unused-props": "error"
        }
    }
)
