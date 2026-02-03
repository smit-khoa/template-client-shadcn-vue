# Agent: Figma to Vue Code

> Tự động chuyển đổi thiết kế Figma thành code Vue 3 + TypeScript + Tailwind CSS

## Metadata

- **Version:** 1.0.0
- **Trigger:** `/design:figma <figma-url>`
- **Language:** Vietnamese
- **Framework:** Vue 3 + TypeScript + Tailwind CSS

## Description

Agent này tự động hóa quy trình chuyển đổi thiết kế Figma thành production-ready Vue code với độ chính xác visual >95%.

## Workflow Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   PHASE 1   │ ──→ │   PHASE 2   │ ──→ │   PHASE 3   │
│ Figma MCP   │     │ Component   │     │ Code Gen    │
│ Analysis    │     │ Mapping     │     │ Vue+TW      │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   PHASE 5   │ ◄── │  CONDITION  │ ◄── │   PHASE 4   │
│ Auto-Fix    │     │ Pass >= 95%?│     │ E2E + Visual│
│ (if fail)   │     │             │     │ Testing     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │
      │              ┌────┴────┐
      │              ▼         ▼
      │         ┌────────┐ ┌────────┐
      └───────→ │  DONE  │ │ REVIEW │
                │   ✅   │ │   ⚠️   │
                └────────┘ └────────┘
```

## Instructions

Khi agent này được kích hoạt, thực hiện đúng 5 phases sau:

---

### PHASE 1: Figma Analysis

**Objective:** Phân tích và hiểu thiết kế từ Figma

**Tools:** Figma MCP

**Steps:**

1. Parse Figma URL để lấy `fileKey` và `nodeId`:
   ```
   URL format: https://figma.com/design/:fileKey/:fileName?node-id=:nodeId
   ```

2. Sử dụng Figma MCP tools:
   ```typescript
   // Get design context
   await mcp__figma-remote-mcp__get_design_context({
     fileKey: fileKey,
     nodeId: nodeId,
     clientLanguages: "typescript",
     clientFrameworks: "vue"
   })

   // Get screenshot
   await mcp__figma-remote-mcp__get_screenshot({
     fileKey: fileKey,
     nodeId: nodeId
   })

   // Get metadata
   await mcp__figma-remote-mcp__get_metadata({
     fileKey: fileKey,
     nodeId: nodeId
   })

   // Get design tokens
   await mcp__figma-remote-mcp__get_variable_defs({
     fileKey: fileKey,
     nodeId: nodeId
   })
   ```

3. Phân tích components:
   - Identify reusable patterns
   - Detect component variants
   - Extract props/states
   - Document relationships

**Output:** Design analysis với components list, tokens, layout

---

### PHASE 2: Component Mapping

**Objective:** Map Figma components với Vue components hiện có

**Tools:** Glob, Read, Grep

**Steps:**

1. **Scan existing components (MANDATORY):**
   ```bash
   # ✅ ONLY USE: Custom components
   src/components/custom/**/*.vue

   # ❌ FORBIDDEN: UI primitives
   src/components/ui/**/*.vue  # NEVER import directly
   ```

2. **Read và analyze components:**
   - Extract props interface
   - Identify variants/sizes/states
   - Document usage patterns

3. **Create mapping với decision matrix:**
   ```
   Match >= 90% → Dùng component hiện có
   Match 70-89% → Dùng với customization
   Match 50-69% → Tạo variant mới
   Match < 50%  → Tạo component mới
   ```

4. **Common mappings:**
   | Figma | Vue Component |
   |-------|---------------|
   | Button | @/components/custom/button |
   | Input | @/components/custom/input |
   | Checkbox | @/components/custom/checkbox |
   | Toggle | @/components/custom/switch |
   | Icon | @/components/custom/icon |
   | Dropdown | @/components/custom/dropdown |

**Output:** Component mapping report

---

### PHASE 3: Code Generation

**Objective:** Generate Vue 3 + Tailwind CSS code

**Tools:** Write, Edit, Read

**Steps:**

1. **Xác định file path:**
   ```
   Page → src/pages/[PageName].vue
   Component → src/components/custom/[name]/[Name].vue
   ```

2. **Generate Vue SFC:**

   ```vue
   <template>
     <!-- ✅ INLINE Tailwind classes (MANDATORY) -->
     <div class="flex items-center gap-4 p-6 bg-white rounded-2xl">
       <Button variant="primary" size="lg">
         Click me
       </Button>
     </div>
   </template>

   <script setup lang="ts">
   // ✅ ONLY import from custom
   import { Button } from '@/components/custom/button'
   import { Input } from '@/components/custom/input'

   // snake_case for variables
   const user_name = ref('')
   const is_loading = ref(false)

   // camelCase for functions
   function handleSubmit() {
     // ...
   }
   </script>

   <style scoped>
   /* ONLY use for pure CSS if needed (gradients, animations) */
   /* ❌ FORBIDDEN: @apply - không hoạt động với Tailwind v4 */
   </style>
   ```

3. **CRITICAL RULES:**
   - ✅ ONLY import from `@/components/custom/*`
   - ❌ FORBIDDEN: `@/components/ui/*`
   - ❌ FORBIDDEN: `@apply` trong `<style scoped>`
   - ✅ Use inline Tailwind classes trong template

4. **Naming conventions:**
   - Variables: `snake_case`
   - Functions: `camelCase`
   - Components: `PascalCase`

**Output:** Generated Vue files

---

### PHASE 4: E2E + Visual Testing

**MANDATORY - CANNOT BE SKIPPED**

**Objective:** Validate code với E2E tests và visual comparison

**Tools:** Bash, Write, Read

**Steps:**

1. **Generate E2E test file:**
   ```typescript
   // e2e/tests/[component-name].spec.ts
   import { test, expect } from '@playwright/test'

   test.describe('[Component] - E2E + Visual Testing', () => {
     test.beforeEach(async ({ page }) => {
       await page.goto('/route', { waitUntil: 'networkidle' })
     })

     test('Logic tests', async ({ page }) => {
       // Test component visibility
       // Test interactions
       // Test form functionality
     })

     test('Visual regression', async ({ page }) => {
       await expect(page).toHaveScreenshot('component.png', {
         threshold: 0.05  // 95% similarity
       })
     })
   })
   ```

2. **Start dev server nếu cần:**
   ```bash
   npm run dev
   ```

3. **Run tests:**
   ```bash
   npm run test:e2e:headed -- e2e/tests/[name].spec.ts
   ```

4. **Validate results:**
   - Logic tests: **100% pass rate** (MANDATORY)
   - Visual similarity: **>= 95%** (MANDATORY)

5. **If FAIL → Proceed to Phase 5 (MANDATORY)**

**Output:** Test results với scores

---

### PHASE 5: Auto-Iteration

**MANDATORY IF TESTS FAIL**

**Objective:** Tự động fix code cho đến khi pass

**Tools:** Edit, Read, Bash

**Max Iterations:** 3

**Steps:**

1. **Nếu Logic tests FAIL:**
   - Phân tích error messages
   - Fix element selectors
   - Fix event handlers
   - Fix validation logic

2. **Nếu Visual < 95%:**
   - Xem diff image: `e2e/tests/[name].spec.ts-snapshots/*-diff.png`
   - Phân tích và fix:

   | Vấn đề | Cách sửa |
   |--------|----------|
   | Spacing sai | `p-4` → `p-6`, `gap-2` → `gap-4` |
   | Color sai | `bg-primary` → `bg-primary-300` |
   | Font sai | `text-base` → `text-lg` |
   | Layout sai | `flex-row` → `flex-col` |

3. **Re-run Phase 4**

4. **Loop until:**
   - ✅ All tests pass, OR
   - ❌ Max 3 iterations reached → Request human review

**Output:** Fixed code hoặc human review request

---

## Pass Criteria

```typescript
const PASS_CRITERIA = {
  logic_tests: 100,      // 100% pass rate
  visual_similarity: 95, // >= 95%
  max_iterations: 3      // Before human review
}
```

## Rules & Constraints

### MANDATORY

1. ✅ Always use existing components if similarity >= 70%
2. ✅ Follow naming conventions (snake_case, camelCase, PascalCase)
3. ✅ Use Composition API (`<script setup>`) only
4. ✅ Tailwind CSS inline classes only
5. ✅ TypeScript strict mode
6. ✅ Visual similarity >= 95% to pass
7. ✅ Maximum 3 iterations before review
8. ✅ **Phase 4 CANNOT be skipped**
9. ✅ **Phase 5 MUST execute if tests fail**

### FORBIDDEN

1. ❌ Do NOT create new components without checking existing
2. ❌ Do NOT use inline styles
3. ❌ Do NOT skip visual testing
4. ❌ Do NOT proceed if similarity < 95%
5. ❌ Do NOT use Options API
6. ❌ **BANNED:** Import from `@/components/ui/*`
7. ❌ **BANNED:** `@apply` trong `<style scoped>`

## Report Template

```markdown
## 🎨 Figma-to-Code Report

### 📊 Kết quả
- ✅ File generated: `{file_path}`
- ✅ Visual similarity: {similarity}%
- ✅ Components reused: {reused_count}
- ✅ New components: {new_count}
- ✅ Iterations: {iteration_count}

### 📋 Component Mapping
{mapping_details}

### 🔧 Changes Made
{changes_list}

### ⚠️ Issues (if any)
{issues_list}
```

## Example Execution

```bash
# Input
/design:figma https://figma.com/design/abc123/Login?node-id=1-2

# Output
✅ Generated: src/pages/Login.vue
✅ Similarity: 97.8%
✅ Components: Button, Input, Checkbox
✅ Iterations: 2
✅ Time: 6 minutes
```

## Related Files

- Workflow: `.claude/workflows/figma-to-code-automation.md`
- Skill: `.claude/skills/design-figma.md`
- Docs: `docs/figma-to-code-workflow.md`

---

**Last Updated:** 2026-02-03
**Version:** 1.0.0
