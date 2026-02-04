---
description: my-workflow
---
```mermaid
flowchart TD
    start_node_default([Start])
    prompt_figma_link[Vui lòng cung cấp link Figm...]
    agent_analyze_figma[agent-analyze-figma]
    agent_read_docs[agent-read-docs]
    agent_read_custom_components[agent-read-custom-components]
    agent_plan[agent-plan]
    ask_approve_plan{AskUserQuestion:<br/>Kế hoạch triển khai trên có hợp lý chưa? Bạn muốn điều chỉnh gì không?}
    agent_revise_plan[agent-revise-plan]
    agent_implement_code[agent-implement-code]
    agent_visual_test[agent-visual-test]
    ask_visual_result{AskUserQuestion:<br/>Kết quả kiểm thử visual như thế nào? Code có giống thiết kế không?}
    agent_fix_code[agent-fix-code]
    end_node_default([End])

    start_node_default --> prompt_figma_link
    prompt_figma_link --> agent_analyze_figma
    agent_analyze_figma --> agent_read_docs
    agent_read_docs --> agent_read_custom_components
    agent_read_custom_components --> agent_plan
    agent_plan --> ask_approve_plan
    ask_approve_plan -->|Đồng ý, tiếp tục triển khai| agent_implement_code
    ask_approve_plan -->|Cần điều chỉnh kế hoạch| agent_revise_plan
    agent_revise_plan --> ask_approve_plan
    agent_implement_code --> agent_visual_test
    agent_visual_test --> ask_visual_result
    ask_visual_result --> end_node_default
    ask_visual_result --> agent_fix_code
    agent_fix_code --> agent_visual_test
```

## Workflow Execution Guide

Follow the Mermaid flowchart above to execute the workflow. Each node type has specific execution methods as described below.

### Execution Methods by Node Type

- **Rectangle nodes**: Execute Sub-Agents using the Task tool
- **Diamond nodes (AskUserQuestion:...)**: Use the AskUserQuestion tool to prompt the user and branch based on their response
- **Diamond nodes (Branch/Switch:...)**: Automatically branch based on the results of previous processing (see details section)
- **Rectangle nodes (Prompt nodes)**: Execute the prompts described in the details section below

### Prompt Node Details

#### prompt_figma_link(Vui lòng cung cấp link Figm...)

```
Vui lòng cung cấp link Figma design mà bạn muốn triển khai thành code.
```

### AskUserQuestion Node Details

Ask the user and proceed based on their choice.

#### ask_approve_plan(Kế hoạch triển khai trên có hợp lý chưa? Bạn muốn điều chỉnh gì không?)

**Selection mode:** Single Select (branches based on the selected option)

**Options:**
- **Đồng ý, tiếp tục triển khai**: Tiến hành implement code theo kế hoạch
- **Cần điều chỉnh kế hoạch**: Muốn sửa lại một số phần trong kế hoạch

#### ask_visual_result(Kết quả kiểm thử visual như thế nào? Code có giống thiết kế không?)

**Selection mode:** AI Suggestions (AI generates options dynamically based on context and presents them to the user)
