# Deployment Guide

## Overview

Hướng dẫn deploy ứng dụng SMIT Chat lên các môi trường.

## Prerequisites

- Node.js 18+
- npm hoặc yarn
- Git

## Development Build

```bash
npm install
npm run dev
```

App chạy tại: http://localhost:5173

## Production Build

```bash
npm run build
```

Build output: `dist/` folder

## Preview Production Build

```bash
npm run preview
```

## Deployment Options

### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 2. Netlify

Kéo thả folder `dist/` lên Netlify Dashboard

### 3. Static Hosting

Upload folder `dist/` lên bất kỳ static hosting nào (AWS S3, Firebase Hosting, etc.)

## Environment Variables

Tạo file `.env.production`:

```
VITE_API_BASE_URL=https://api.example.com
```

## CI/CD

Xem file `.github/workflows/` (nếu có) để biết thêm chi tiết về CI/CD pipeline.
