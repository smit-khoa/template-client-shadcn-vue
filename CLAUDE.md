# CLAUDE.md

This file provides guidance to Claude Code when working with this Vue 3 + TypeScript project.

## 🌐 Language & Communication

**IMPORTANT:** Always respond and communicate in Vietnamese.
**IMPORTANT:** All subagents (tester, code-reviewer, planner, etc.) MUST write reports in Vietnamese.
**IMPORTANT:** When spawning subagents via Task tool, include instruction: "Write all reports and outputs in Vietnamese."

## 📝 Coding Conventions

Strictly follow these naming conventions:

| Type      | Convention             | Example                                                |
| --------- | ---------------------- | ------------------------------------------------------ |
| Variables | `snake_case`           | `user_name`, `total_count`, `is_active`                |
| Functions | `camelCase`            | `getUserById()`, `calculateTotal()`, `validateInput()` |
| Classes   | `PascalCase`           | `UserService`, `OrderController`                       |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_RETRIES`, `API_BASE_URL`                          |

## 🎯 Role & Responsibilities

Your role is to analyze user requirements, delegate tasks to appropriate sub-agents, and ensure cohesive delivery of features that meet specifications and architectural standards.

## 📚 Documentation System

**CRITICAL:** When using `/docs:init` or `/docs:update`:
- Create/update documentation ONLY in `./docs/` folder
- Do NOT create markdown files in other locations
- Follow structure defined in `./docs/README.md`

Documentation structure:
```
docs/
├── README.md                    # Documentation index
├── project-overview-pdr.md      # Project overview & requirements
├── code-standards.md            # Coding standards & conventions
├── codebase-summary.md          # Codebase architecture summary
├── design-system.md             # Design system & UI guidelines
├── component-library.md         # Component usage guide
├── figma-to-code-workflow.md   # Figma automation workflow
└── deployment-guide.md          # Deployment & build guide
```

## 🎨 Figma-to-Code Automation Workflow

**MANDATORY:** When receiving Figma design links, ALWAYS follow this automated workflow:

### Step 1: Analyze Figma Design
1. Use Figma MCP tools to fetch design context
2. Extract components, styles, layouts, variables
3. Identify reusable UI patterns

### Step 2: Component Mapping
1. Read existing components in `src/components/`
2. Map Figma components to existing Vue components
3. Identify which components can be reused
4. Determine new components needed (only if no match exists)

### Step 3: Code Implementation
1. Generate Vue 3 SFC (Single File Component) code
2. Use Composition API (`<script setup>` syntax)
3. Apply Tailwind CSS classes
4. Use existing components FIRST (mandatory if similar)
5. Create new components ONLY if no existing match
6. Follow naming conventions strictly

### Step 4: E2E + Visual Testing (MANDATORY - CANNOT SKIP)
**🚨 CRITICAL: This step is NON-NEGOTIABLE and CANNOT be skipped under ANY circumstances**

1. Generate E2E test file in `e2e/tests/[component-name].spec.ts`
2. Start development server if not running
3. Run Playwright E2E tests (logic + visual)
4. Capture screenshots and compare with Figma design
5. Validate BOTH criteria:
   - Logic tests: 100% pass rate (all tests must pass)
   - Visual similarity: >= 95% (pixel-perfect match required)

**Testing tools:**
- `FigmaTestHelper` - Complete testing framework
- `testVisualRegression()` - Visual comparison utilities
- Playwright E2E - Full browser automation

**If tests fail:** MUST proceed to Step 5 (cannot skip)

### Step 5: Auto-Iteration Until Pass (MANDATORY IF TESTS FAIL)
**🚨 CRITICAL: Auto-iteration MUST execute if tests fail in Step 4**

1. **Logic tests failed:**
   - Analyze logic errors from test output
   - Generate fixes for component interactions
   - Apply fixes to code
   - Re-run tests (back to Step 4)

2. **Visual tests failed (< 95% similarity):**
   - Analyze visual diff images
   - Generate fixes for spacing, colors, typography
   - Apply Tailwind CSS adjustments
   - Re-run tests (back to Step 4)

3. **Iteration loop:**
   - Maximum 3 iterations allowed
   - MUST attempt fixes each iteration
   - CANNOT skip iterations
   - If max iterations reached → Request human review

**Loop structure:**
```typescript
while (iteration < 3) {
  if (logic_passed && visual >= 95%) break
  apply_fixes()
  rerun_tests()
}
```

**Activation:** Use skill `/design:figma <figma-url>` to trigger this workflow.

## 🔧 Workflows

**Primary workflows:** `./.claude/workflows/`
- `figma-to-code-automation.md` - Automated Figma to Vue code generation
- `development-rules.md` - Development standards and best practices
- `component-analysis.md` - Component library understanding
- `visual-testing.md` - Visual regression testing protocol

**IMPORTANT:** Always read relevant workflow before executing tasks.

## 🛠️ ClaudeKit Integration

Available skills:
- `/design:figma <url>` - Automated Figma to code conversion
- `/docs:init` - Initialize documentation structure
- `/docs:update` - Update existing documentation
- `/test:visual` - Run visual regression tests

## 🏗️ Project Context

**Tech Stack:**
- Vue 3.5+ with Composition API
- TypeScript (strict mode)
- Tailwind CSS v4 + Shadcn/Vue
- Pinia (state management)
- Vue Router 4
- Vitest + Playwright (testing)

**Component System:**
- **ALWAYS USE:** `src/components/custom/` (26 folders - PRIORITY FIRST)
  - Button, Input, Checkbox, Icon, Switch, Tabs, Dropdown, Toast, etc.
  - Already customized for project with proper styling
  - Full TypeScript support with clear props interface
- **ONLY IF NEEDED:** `src/components/ui/` (21 folders - Shadcn primitives)
  - Use only when custom components don't have equivalent
  - Unstyled, require additional styling
- **RULE:** Custom components > UI components > Create new

**Design Tokens:**
- Primary: `#269a85` (teal)
- Secondary: `#1e7b6a` (dark teal)
- Tertiary: `#2eb9a0`
- Font: Inter (400, 500, 600, 700)

## 🚨 Critical Rules

1. **COMPONENT PRIORITY** - ALWAYS import from `@/components/custom` first
   ```typescript
   // ✅ Correct
   import { Button } from '@/components/custom/button'
   import { Input } from '@/components/custom/input'

   // ❌ Wrong
   import { Button } from '@/components/ui/button'
   ```

2. **NEVER** skip the Figma-to-Code workflow when receiving design links

3. **ALWAYS** use existing components if similarity exists (even 70%+ match)

4. **🚨 TESTING ENFORCEMENT (NON-NEGOTIABLE):**
   - Step 4 (E2E + Visual Testing) **CANNOT BE SKIPPED** under ANY circumstances
   - Step 5 (Auto-iteration) **MUST EXECUTE** if tests fail
   - **MUST** iterate until tests pass OR max 3 iterations reached
   - **CANNOT** proceed to success without passing tests
   - **FORBIDDEN** to skip testing phases

5. **Testing Requirements:**
   - Logic tests: **100% pass rate** (mandatory)
   - Visual similarity: **>= 95%** (mandatory)
   - E2E test file: **MUST be generated** in Phase 4
   - Auto-iteration: **MUST attempt** if tests fail

6. **Workflow Sequence (MANDATORY):**
   ```
   Phase 3 (Code) → Phase 4 (Test) → Phase 5 (Iterate) → Success/Review
                         ↓                 ↓
                    MANDATORY        MANDATORY IF FAIL
   ```

7. **MANDATORY** to document in `./docs/` only (not in project root or other folders)

8. **IMPORTANT** Read `./README.md` before any implementation

9. **CRITICAL** Follow workflows in `./.claude/workflows/*`

**Validation Checkpoints:**
- ✅ After Phase 3: "Did you generate E2E test file?"
- ✅ After Phase 4: "Did you run E2E + Visual tests?"
- ✅ After Phase 4: "Did logic tests pass 100%?"
- ✅ After Phase 4: "Did visual reach >= 95%?"
- ✅ If any NO: "Did you execute Phase 5 auto-iteration?"

**If AI attempts to skip testing:**
```
🚨 CRITICAL VIOLATION: Testing cannot be skipped.
This is a non-negotiable workflow requirement.
MUST execute Phase 4 → Phase 5 sequence.
```

## 📖 Documentation Management

When using `/docs:init`:
1. Create complete documentation structure in `./docs/`
2. Generate all standard docs files
3. Analyze codebase and populate content
4. Create component library reference

When using `/docs:update`:
1. Analyze recent code changes
2. Update relevant docs in `./docs/`
3. Keep documentation synchronized with code
4. Do NOT create new files outside `./docs/`

## 🎯 Workflow Activation Priority

1. Design task with Figma link → `/design:figma`
2. Documentation initialization → `/docs:init`
3. Documentation update → `/docs:update`
4. Visual testing → `/test:visual`
5. General development → Follow `./.claude/workflows/development-rules.md`

---

**Remember:** This configuration enables automated Figma-to-Code conversion. Always prioritize component reuse and visual accuracy.
