# Skill: design:figma

> **Tự động chuyển đổi thiết kế Figma thành code Vue 3 + TypeScript + Tailwind CSS**

## Description

Automated workflow for converting Figma designs to production-ready Vue code with >95% visual accuracy.

## Usage

```bash
/design:figma <figma-url>
```

**Arguments:**
- `<figma-url>` - Full Figma design URL with node-id

**Examples:**
```bash
/design:figma https://figma.com/design/abc123/LoginPage?node-id=1-2
/design:figma https://figma.com/design/xyz789/Dashboard?node-id=10-50
```

## Trigger Conditions

Activate this skill when:
1. User provides a Figma URL
2. User asks to "convert Figma to code"
3. User mentions "implement Figma design"
4. User requests "generate UI from Figma"

## Skill Instructions

When this skill is activated, you MUST follow the **Figma-to-Code Automation Workflow** exactly as defined in:

📖 **Primary Workflow:** `.claude/workflows/figma-to-code-automation.md`

### Execution Steps (5 Phases)

#### Phase 1: Figma Analysis
```typescript
// 1. Parse Figma URL
const { fileKey, nodeId } = parseFigmaUrl(figma_url)

// 2. Fetch design context using Figma MCP
const design_context = await mcp__figma-remote-mcp__get_design_context({
  fileKey,
  nodeId,
  clientLanguages: "typescript",
  clientFrameworks: "vue"
})

// 3. Get screenshot
const screenshot = await mcp__figma-remote-mcp__get_screenshot({
  fileKey,
  nodeId
})

// 4. Get metadata
const metadata = await mcp__figma-remote-mcp__get_metadata({
  fileKey,
  nodeId
})

// 5. Get design tokens
const variables = await mcp__figma-remote-mcp__get_variable_defs({
  fileKey,
  nodeId
})

// 6. Analyze components
const components = analyzeDesignComponents(design_context, metadata)
```

**Output:** Design analysis report với components, tokens, layout

#### Phase 2: Component Mapping
```typescript
// 1. Scan existing components
const existing_components = await scanComponents([
  'src/components/ui/**/*.vue',
  'src/components/custom/**/*.vue'
])

// 2. Read component files
for (const component of existing_components) {
  const content = await Read(component.path)
  const props = extractPropsInterface(content)
  component.capabilities = analyzeCapabilities(props)
}

// 3. Map Figma components to Vue components
const mapping = figma_components.map(figma_comp => {
  const matches = findSimilarComponents(figma_comp, existing_components)
  const best_match = matches[0]

  return {
    figma_name: figma_comp.name,
    vue_component: best_match?.path,
    confidence: best_match?.confidence || 0,
    action: best_match?.confidence >= 70 ? 'reuse' : 'create'
  }
})
```

**Output:** Component mapping report với reuse vs create decisions

#### Phase 3: Code Implementation
```typescript
// 1. Determine file path
const file_path = determineFilePath(design_context.type)
// e.g., src/pages/Login.vue or src/components/custom/widget/Widget.vue

// 2. Generate Vue SFC
const vue_code = generateVueSFC({
  components: mapped_components,
  design_tokens: variables,
  layout: metadata.layout,
  naming_convention: {
    variables: 'snake_case',
    functions: 'camelCase',
    classes: 'PascalCase'
  }
})

// 3. Write file
await Write(file_path, vue_code)

// 4. Create new components if needed
for (const new_comp of components_to_create) {
  const comp_path = `src/components/custom/${new_comp.name}/`
  await Write(comp_path + `${new_comp.name}.vue`, new_comp.code)
  await Write(comp_path + 'index.ts', new_comp.export)
}
```

**Output:** Generated Vue files

#### Phase 4: E2E + Visual Testing (MANDATORY - CANNOT SKIP)
```typescript
// 🚨 CRITICAL: This phase CANNOT be skipped

// 1. Generate E2E test file
const test_file = generateE2ETest({
  component_name,
  page_route,
  figma_config: {
    figma_url,
    figma_screenshot_url: screenshot_url
  },
  logic_tests: generateLogicTests(components),
  visual_options: {
    threshold: 0.05,  // 95% similarity required
    full_page: true
  }
})

await Write(`e2e/tests/${component_name}.spec.ts`, test_file)

// 2. Start dev server (if not running)
await Bash('npm run dev', { run_in_background: true })
await sleep(3000)

// 3. Run E2E + Visual tests (MANDATORY)
const test_result = await Bash(
  `npx playwright test e2e/tests/${component_name}.spec.ts --reporter=json`
)

// 4. Parse results
const results = JSON.parse(test_result.stdout)

// 5. Validate BOTH logic AND visual
const pass_criteria = {
  logic_passed: results.logic.pass_rate === 100,
  visual_passed: results.visual.similarity >= 95
}
```

**Output:** Complete test results (logic + visual)

**🚨 Validation Checkpoint:**
```typescript
if (!pass_criteria.logic_passed || !pass_criteria.visual_passed) {
  // MUST go to Phase 5 (Iteration)
  console.log('❌ Tests failed - Starting iteration...')
  await Phase5_Iteration(results)
}
```

#### Phase 5: Auto-Loop Until Pass (MANDATORY)
```typescript
// 🚨 CRITICAL: Must loop until tests pass or MAX_ITERATIONS reached

async function autoIterateUntilPass() {
  let iteration = 0
  const MAX_ITERATIONS = 3

  while (iteration < MAX_ITERATIONS) {
    iteration++
    console.log(`🔄 Iteration ${iteration}/${MAX_ITERATIONS}`)

    // Phase 4: Run E2E + Visual tests
    const results = await runE2EAndVisualTests()

    // PRIORITY 1: Check logic tests
    if (!results.logic_passed) {
      console.log('❌ Logic tests failed')

      // Analyze logic errors
      const logic_issues = analyzeLogicErrors(results.logic_errors)

      // Generate fixes
      const fixes = logic_issues.map(issue => generateLogicFix(issue))

      // Apply fixes to code
      for (const fix of fixes) {
        await Edit(file_path, fix.old_code, fix.new_code)
      }

      continue  // Back to Phase 4
    }

    // PRIORITY 2: Check visual similarity
    if (results.visual_similarity < 95) {
      console.log(`❌ Visual: ${results.visual_similarity}%`)

      // Analyze visual differences
      const visual_issues = analyzeVisualDiff(results.visual_diff_image)

      // Generate visual fixes
      const fixes = visual_issues.map(issue => generateVisualFix(issue))

      // Apply fixes (Tailwind classes, spacing, colors)
      for (const fix of fixes) {
        await Edit(file_path, fix.old_code, fix.new_code)
      }

      continue  // Back to Phase 4
    }

    // ✅ Both logic and visual tests passed!
    return {
      status: 'success',
      similarity: results.visual_similarity,
      iterations: iteration,
      files_modified: [file_path, ...new_component_paths],
      test_results: results
    }
  }

  // ❌ Max iterations reached without passing
  return {
    status: 'needs_review',
    similarity: results.visual_similarity,
    iterations: MAX_ITERATIONS,
    issues: results.remaining_issues,
    suggestion: 'Manual review required - exceeded max iterations'
  }
}
```

**Output:** Final report với status và metrics

**🚨 CRITICAL VALIDATION:**
```typescript
// This workflow CANNOT proceed without validation:

const validation = {
  phase_4_executed: true,        // Phase 4 MUST run
  logic_tested: true,            // Logic tests MUST run
  visual_tested: true,           // Visual tests MUST run
  iteration_attempted: true      // Phase 5 MUST attempt iteration if failed
}

// If ANY of these is false → REJECT and throw error
if (!Object.values(validation).every(v => v === true)) {
  throw new Error('🚨 WORKFLOW VIOLATION: Testing phases cannot be skipped')
}
```

### Communication Guidelines

**IMPORTANT:** Viết tất cả reports và outputs bằng tiếng Việt.

**Report template:**
```markdown
## 🎨 Figma-to-Code Report

### 📊 Kết quả
- ✅ File generated: `{file_path}`
- ✅ Visual similarity: {similarity}%
- ✅ Components reused: {reused_count}
- ✅ New components: {new_count}
- ✅ Iterations: {iteration_count}
- ⏱️ Time: {elapsed_time}

### 📋 Component Mapping
{mapping_details}

### 🔧 Changes Made
{changes_list}

### ⚠️ Issues (if any)
{issues_list}
```

### Rules & Constraints

**MANDATORY:**
1. ✅ Always use existing components if similarity >= 70%
2. ✅ Follow naming conventions strictly (snake_case, camelCase, PascalCase)
3. ✅ Use Composition API (`<script setup>`) only
4. ✅ Tailwind CSS only (no inline styles)
5. ✅ TypeScript strict mode
6. ✅ Visual similarity >= 95% to pass
7. ✅ Maximum 3 iterations before requesting review
8. ✅ **Phase 4 (E2E Testing) CANNOT be skipped under ANY circumstances**
9. ✅ **Phase 5 (Auto-iteration) MUST execute if tests fail**
10. ✅ **Must iterate until tests pass OR max 3 iterations reached**

**FORBIDDEN:**
1. ❌ Do NOT create new components without checking existing ones
2. ❌ Do NOT use inline styles
3. ❌ Do NOT skip visual testing
4. ❌ Do NOT proceed if similarity < 95% after 3 iterations
5. ❌ Do NOT use Options API
6. ❌ **NEVER skip Phase 4 testing - this is a BLOCKER**
7. ❌ **NEVER skip Phase 5 iteration loop - this is a BLOCKER**
8. ❌ **NEVER accept failing tests without attempting fixes**

**🚨 TESTING ENFORCEMENT (NON-NEGOTIABLE):**

The workflow MUST follow this sequence:
```
Phase 3 (Code) → Phase 4 (Test) → Phase 5 (Iterate if failed) → Success/Review
                      ↓                    ↓
                   MANDATORY          MANDATORY IF TESTS FAIL
```

**Validation checkpoints:**
- ✅ After Phase 3: "Did you generate E2E test file?"
- ✅ After Phase 4: "Did you run E2E + Visual tests?"
- ✅ After Phase 4: "Did logic tests pass 100%?"
- ✅ After Phase 4: "Did visual similarity reach >= 95%?"
- ✅ If any NO: "Did you trigger Phase 5 auto-iteration?"

**If AI attempts to skip testing:**
```typescript
throw new Error(
  '🚨 CRITICAL VIOLATION: Phase 4 testing is MANDATORY. ' +
  'Workflow cannot proceed without E2E + Visual testing. ' +
  'This is a non-negotiable requirement.'
)
```

### Tools Required

**Figma MCP Tools:**
- `mcp__figma-remote-mcp__get_design_context`
- `mcp__figma-remote-mcp__get_screenshot`
- `mcp__figma-remote-mcp__get_metadata`
- `mcp__figma-remote-mcp__get_variable_defs`

**File Operations:**
- `Read` - Read existing components
- `Write` - Create new files
- `Edit` - Modify existing files
- `Glob` - Find component files
- `Grep` - Search component code

**Testing:**
- `Bash` - Run Playwright tests, start dev server

### Success Criteria

**Must achieve:**
- ✅ Visual similarity >= 95%
- ✅ Component reuse rate >= 80%
- ✅ Zero TypeScript errors
- ✅ Zero inline styles
- ✅ All tests passing (logic 100% + visual 95%)
- ✅ **E2E test file generated in Phase 4**
- ✅ **E2E tests executed in Phase 4**
- ✅ **Phase 5 iteration attempted if tests failed**

**Testing Requirements (MANDATORY):**
- ✅ Logic tests pass rate: 100% (all tests must pass)
- ✅ Visual similarity: >= 95% (pixel-perfect match)
- ✅ Performance metrics: FCP < 2s, LCP < 4s
- ✅ Accessibility: Zero violations
- ✅ Responsive: Works on all breakpoints

**Workflow Completion Checklist:**
- [ ] Phase 1: Figma analysis completed
- [ ] Phase 2: Component mapping completed
- [ ] Phase 3: Code implementation completed
- [ ] Phase 4: E2E test file generated (**MANDATORY**)
- [ ] Phase 4: E2E tests executed (**MANDATORY**)
- [ ] Phase 4: Test results validated (**MANDATORY**)
- [ ] Phase 5: Iteration attempted if needed (**MANDATORY IF FAILED**)
- [ ] Final: All tests passing OR max iterations reached

**Metrics:**
- ⏱️ Total time: < 10 minutes
- 🔄 Iterations: <= 3
- 🎯 First-pass success: >= 60%
- 📊 Testing coverage: 100% (cannot be skipped)

## Related Workflows

- `.claude/workflows/figma-to-code-automation.md` - Complete workflow
- `.claude/workflows/development-rules.md` - Coding standards
- `docs/figma-to-code-workflow.md` - User documentation
- `docs/component-library.md` - Component reference

## Example Execution

```bash
# User command
/design:figma https://figma.com/design/abc123/Login?node-id=1-2

# AI execution
1. Parse URL → fileKey: abc123, nodeId: 1:2
2. Fetch Figma data → design_context, screenshot, metadata
3. Analyze components → 7 components detected
4. Map components → 3 reused, 0 new
5. Generate code → src/pages/Login.vue
6. Visual test → similarity: 94.2% (iteration 1)
7. Fix issues → adjust spacing, colors
8. Re-test → similarity: 97.8% ✅
9. Report → Success!

# Output
✅ Generated: src/pages/Login.vue
✅ Similarity: 97.8%
✅ Components: Button, Input, Checkbox
✅ Time: 6 minutes
```

## Error Handling

**Common errors:**

1. **Invalid Figma URL**
   - Check URL format
   - Ensure node-id parameter exists

2. **Figma MCP connection failed**
   - Verify Figma MCP is configured
   - Check authentication

3. **Component mapping failed**
   - Review Figma component names
   - Check existing component library

4. **Visual test failed after 3 iterations**
   - Generate detailed report
   - Request human review
   - Provide manual fix suggestions

## Version

- **Version:** 1.0.0
- **Last Updated:** 2026-01-30
- **Maintained by:** AI automation system

---

**Note:** This skill MUST be used whenever user provides a Figma URL or requests Figma-to-code conversion.
