// Utility to extract SVG content from sprite
export const extractSvgContent = async (iconName, customColor = null) => {
    try {
        // Wait for sprite to be available (with timeout)
        const maxAttempts = 10
        let attempts = 0
        let spriteContainer = null

        while (attempts < maxAttempts && !spriteContainer) {
            spriteContainer = document.getElementById("svg-sprite-symbols")
            if (!spriteContainer) {
                await new Promise(resolve => setTimeout(resolve, 100))
                attempts++
            }
        }

        if (!spriteContainer) {
            console.warn(`SVG sprite container not found after ${maxAttempts} attempts`)
            return null
        }

        // Find the symbol in the SVG inside the container
        const svg = spriteContainer.querySelector("svg")
        if (!svg) {
            console.warn("No SVG found in sprite container")
            return null
        }

        const symbol = svg.querySelector(`#${iconName}`)
        if (!symbol) {
            console.warn(`Symbol #${iconName} not found in sprite`)
            return null
        }

        // Clone the symbol to avoid modifying the original
        const clonedSymbol = symbol.cloneNode(true)

        // Get viewBox
        const viewBox = clonedSymbol.getAttribute("viewBox") || "0 0 24 24"

        // Get inner content (paths, defs, etc.)
        let content = clonedSymbol.innerHTML

        // If customColor is provided, replace ALL colors and remove opacity
        if (customColor && customColor !== "currentColor") {
            // Create a temporary DOM to parse and modify
            const tempDiv = document.createElement("div")
            tempDiv.innerHTML = content

            // Generate unique IDs for gradients to avoid conflicts
            const uniqueId = `${iconName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

            // Update gradient IDs to be unique
            const gradients = tempDiv.querySelectorAll("linearGradient, radialGradient")
            gradients.forEach(gradient => {
                const oldId = gradient.getAttribute("id")
                if (oldId) {
                    const newId = `${oldId}-${uniqueId}`
                    gradient.setAttribute("id", newId)

                    // Update references to this gradient
                    const references = tempDiv.querySelectorAll(`[fill="url(#${oldId})"], [stroke="url(#${oldId})"]`)
                    references.forEach(ref => {
                        const attr = ref.getAttribute("fill") ? "fill" : "stroke"
                        ref.setAttribute(attr, `url(#${newId})`)
                    })
                }
            })

            // Update ALL stop elements in gradients
            const stops = tempDiv.querySelectorAll("stop")
            stops.forEach(stop => {
                // Set color to custom color
                stop.setAttribute("stop-color", customColor)
                // Remove opacity attributes
                stop.removeAttribute("stop-opacity")
            })

            // Update ALL fill attributes
            const elementsWithFill = tempDiv.querySelectorAll("[fill]")
            elementsWithFill.forEach(element => {
                const currentFill = element.getAttribute("fill")
                // Replace any fill that's not "none" with custom color
                if (currentFill && currentFill !== "none") {
                    element.setAttribute("fill", customColor)
                }
            })

            // Remove fill-opacity attributes
            const elementsWithFillOpacity = tempDiv.querySelectorAll("[fill-opacity]")
            elementsWithFillOpacity.forEach(element => {
                element.removeAttribute("fill-opacity")
            })

            content = tempDiv.innerHTML
        }

        return {
            viewBox,
            content
        }
    } catch (error) {
        console.error(`Error extracting SVG content for ${iconName}:`, error)
        return null
    }
}
