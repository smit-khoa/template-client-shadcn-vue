import { ref, watch } from "vue"

type Theme = "light" | "dark"

const is_dark = ref(false)
const current_theme = ref<Theme>("light")

// Check system preference
const getSystemTheme = (): Theme => {
    if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
}

// Apply theme to document
const applyTheme = (theme: Theme) => {
    if (typeof document !== "undefined") {
        const root = document.documentElement
        if (theme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
    }
}

// Set theme and persist
const setTheme = (theme: Theme) => {
    current_theme.value = theme
    is_dark.value = theme === "dark"
    applyTheme(theme)

    if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", theme)
    }
}

// Toggle between light and dark
const toggleTheme = () => {
    setTheme(is_dark.value ? "light" : "dark")
}

// Initialize theme on app load
const initTheme = () => {
    if (typeof localStorage !== "undefined") {
        const saved_theme = localStorage.getItem("theme") as Theme | null

        if (saved_theme && (saved_theme === "light" || saved_theme === "dark")) {
            setTheme(saved_theme)
        } else {
            // Use system preference if no saved theme
            setTheme(getSystemTheme())
        }
    }

    // Listen for system theme changes
    if (typeof window !== "undefined" && window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
            // Only auto-switch if user hasn't set a preference
            const saved_theme = localStorage.getItem("theme")
            if (!saved_theme) {
                setTheme(e.matches ? "dark" : "light")
            }
        })
    }
}

export function useTheme() {
    return {
        is_dark,
        current_theme,
        setTheme,
        toggleTheme,
        initTheme
    }
}
