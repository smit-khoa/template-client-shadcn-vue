// List of icons that need inline rendering due to defs (gradients, filters, masks, etc.)
export const ICONS_WITH_DEFS = ["book", "suitcase", "megaphone-01", "megaphone", "folder", "advertisement", "upgrade", "bill", "credit-card", "shild", "tag", "notification", "staff"]

// Check if an icon needs inline rendering
export const needsInlineRendering = iconName => {
    return ICONS_WITH_DEFS.includes(iconName)
}
