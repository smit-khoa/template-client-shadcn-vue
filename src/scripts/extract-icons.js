/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const spritePath = path.join(__dirname, "../src/assets/icons/sprites.svg");
const typesPath = path.join(__dirname, "../src/assets/icons/types.ts");

function extractIconNames() {
  try {
    if (!fs.existsSync(spritePath)) {
      console.error("sprites.svg not found at:", spritePath);
      return;
    }

    const svgContent = fs.readFileSync(spritePath, "utf8");

    // Extract symbol ids, excluding clipPath ids
    const symbolRegex = /<symbol\s+id="([^"]+)"/g;
    const iconNames = [];
    let match;

    while ((match = symbolRegex.exec(svgContent)) !== null) {
      const iconName = match[1];
      // Skip clipPath ids or other technical ids
      if (!iconName.startsWith("clip") && !iconName.includes("_")) {
        iconNames.push(iconName);
      }
    }

    iconNames.sort();

    console.log(
      `Extracted ${iconNames.length} icons from sprites.svg:`,
      iconNames
    );

    // Generate TypeScript types
    const typesContent = `// Auto-generated file. Do not edit manually.
      export const availableIcons = [
      ${iconNames.map((name) => `  "${name}",`).join("\n")}
      ] as const;

      export type IconName = (typeof availableIcons)[number];

      export interface IconProps {
        name: IconName;
        size?: number | string;
        color?: string;
        className?: string;
      }
    `;

    fs.writeFileSync(typesPath, typesContent);
    console.log(`Generated types.ts with ${iconNames.length} icons`);
  } catch (error) {
    console.error("Error extracting icons:", error.message);
  }
}

extractIconNames();
