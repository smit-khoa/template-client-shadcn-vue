---
description: go
---
```mermaid
flowchart TD
    start_node_default([Start])
    prompt_figma_link[Vui lòng cung cấp link Figm...]
    end_node_default([End])
    agent_1770621158350[agent-analytics-figma]
    agent_1770621482261[agent-analytics-project]
    agent_1770621677356[plan]
    agent_1770622516467[code]

    start_node_default --> prompt_figma_link
    prompt_figma_link --> agent_1770621158350
    prompt_figma_link --> agent_1770621482261
    agent_1770621158350 --> agent_1770621677356
    agent_1770621482261 --> agent_1770621677356
    agent_1770621677356 --> agent_1770622516467
    agent_1770622516467 --> end_node_default
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
Vui lòng cung cấp link Figma design mà bạn muốn triển khai thành code và cung cấp yêu cầu chi tiết nếu muốn mô tả thêm công việc cụ thể.
```
