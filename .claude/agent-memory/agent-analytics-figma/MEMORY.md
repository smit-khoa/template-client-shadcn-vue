# Agent Analytics Figma - Memory

## Figma API Access
- Token location: `/Users/khoamac/Documents/me/vibefigma/.env` - FIGMA_TOKEN key
- File key cho SMIT Chat: `vxY9b9C93gOh0F8Q6L3hMH`
- API endpoint: `https://api.figma.com/v1/files/{key}/nodes?ids={node_id}&depth={n}`
- Variables API (403 - viewer-only access): use nodes API instead
- Screenshot API: `https://api.figma.com/v1/images/{key}?ids={node_id}&scale=1&format=png`

## Quy trình phân tích Figma (không có MCP)
1. Dùng REST API với token từ vibefigma/.env
2. Get metadata: depth=3 cho cấu trúc tổng quan, depth=8 cho chi tiết
3. Get colors: extract từ fills/strokes/effects trong node data
4. Variables API 403 - phải extract trực tiếp từ node fills
5. Screenshot: lấy URL từ images API rồi curl -sL để download

## Design tokens SMIT Chat (Register page - node 2950:196166)
- Page background: #ffffff
- Page size: 1440x960px
- Glass card: 692x920px, corner-radius 16px, padding 100px
- Glass card fill: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.12) 100%)
- Glass card shadow: 0 24px 40px rgba(0,0,0,0.03)
- Glass card inner shadow: inset 0 8px 32px rgba(255,255,255,0.18)
- Poster section bg: #57e3c5, width 692px, corner-radius 16px
- Input border: #e8edf2 (1px solid)
- Input bg: #ffffff
- Text primary: #1a2229
- Text secondary: #495366
- Text placeholder: #7d91a6
- Text link: #0069fe
- Divider: #afbfd0 (0.5px dashed 3px 3px)
- Checkbox border: #c5ced8 (1.5px)
- Button primary gradient: radial-gradient từ #00a47e (center) đến #08ccb8 (edge)
- Button corner-radius: 8px
- Button size: 40px height, padding 10px 12px, gap 8px

## Screenshots đã chụp
- `tests/screenshots/figma/register-figma.png` - Trang đăng ký (node 2950:196166, scale 2x)

## Full Analysis Output
- Full JSON analysis: `.claude/agent-memory/agent-analytics-figma/register-analysis.json`
- Poster bg color chính xác: #56e2c4 (không phải #57e3c5)
- Poster actual color từ API: rgba(86,226,196,1.00)

## Component IDs quan trọng
- Input Field: componentId=619:63139, states: Default/Hover/Error/Disabled, style: Yes/No (label)
- Button Primary: componentId=619:62590, props: Size=40, Type=Primary, State=Active
- Button White: componentId=619:62501, props: Size=40, Type=White
- Checkbox: componentId=642:5456
- Link: componentId=642:5944 (Blue Default), 642:5531 (Default)
- Logo: componentId=740:54889

## Node IDs trang Register
- Root frame: 2950:196166
- Glass card: 2950:196170
- Content: 2950:196171
- 4 Input fields: 2950:196184, 196185, 196186, 196187
- Checkbox row: 2950:196189
- Button Primary: 2950:196193
- Button Google: 2950:196200
- Poster: 2950:196201
