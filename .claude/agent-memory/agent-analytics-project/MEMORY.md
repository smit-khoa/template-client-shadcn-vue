# Project Memory - template-client-shadcn-vue (SMIT Chat)

## Cập nhật lần cuối: 2026-03-24 (verified source code)

## Tech Stack
- Vue 3 + TypeScript, TailwindCSS v4 (config trong CSS không có tailwind.config.js)
- Shadcn-Vue (reka-ui), Pinia, Vue Router 4, Axios, Zod v4
- Font: Inter (woff2 local), Base font-size: 14px

## Custom Components - Import Paths
- Button: `@/components/custom/button`
- Input, Search, TagInput: `@/components/custom/input`, `@/components/custom/search`, `@/components/custom/tag-input`
- Checkbox, CheckboxBlock: `@/components/custom/checkbox`
- Switch: `@/components/custom/switch`
- Icon: `@/components/custom/icon`
- Dropdown, DropdownItem, DropdownTitle: `@/components/custom/dropdown`
- Table, LayoutTable, CustomColumn, Pagination: `@/components/custom/table`
- AppTable: `@/components/custom/app-table`
- Drawer: `@/components/custom/drawer`
- Popup: `@/components/custom/popup`
- Confirm: `@/components/custom/confirm`
- DatePicker, CalendarGrid: `@/components/custom/datepicker`
- FilterPanel, FilterTags: `@/components/custom/filter`
- Tabs: `@/components/custom/tabs`
- Toast, toast: `@/components/custom/toast`
- Tooltip: `@/components/custom/tooltip`
- LoadDefault, LoadPage: `@/components/custom/loading`
- ThemeToggle: `@/components/custom/theme-toggle`
- Accordion: `@/components/custom/accordion`
- Box: `@/components/custom/box`
- Paging: `@/components/custom/paging`

## Key Patterns
- Naming: snake_case vars, camelCase functions, PascalCase components
- Component style: Vue 3 `<script setup lang="ts">`
- Tailwind v4: config trong `src/style.css` với `@theme inline {}`
- CSS variables: `src/style.css` (merged - không còn `src/assets/css/style.css`)
- API: `src/controllers/global.js` - `api({url, method, data, toast, authorization})`
- Icons: SVG sprites `src/assets/icons/sprites.svg`

## Critical Notes
- Button primary: dùng `:style` binding vì gradient bị override bởi Tailwind
- Zod v4: dùng `.error.issues` không phải `.error.errors`
- Icon component: dùng `className` prop (không phải `class`) cho custom classes trong Options API
- Tabs: glass-morphism style, màu text là `#fff` (chú ý contrast)

## Docs Location
- Full component usage: `docs/custom-components-usage.md`
- Design system quick ref: `docs/DESIGN-SYSTEM-QUICK-REFERENCE.md`
