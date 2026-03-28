---
title: "AI Knowledge - AI 基础科普视频"
description: "AI 基础科普视频项目，使用 Remotion 制作，UI 复刻 GitHub Markdown 界面。"
category: "skills"
tags: ["AI", "科普视频", "Remotion", "GitHub风格", "参数量"]
date: 2026-03-28
author: "杰哥 AI TEAM"
---

# AI Knowledge - AI 基础科普视频

AI 基础科普视频项目，使用 Remotion 制作，UI 复刻 GitHub Markdown 界面。

## 项目结构

```
aigc/ai-knowledge/
├── src/
│   ├── index.tsx              # 入口文件
│   ├── Root.tsx               # Remotion Root
│   ├── types.ts               # 类型定义
│   ├── components/
│   │   ├── GitHubMarkdownCard.tsx  # GitHub Markdown 卡片组件
│   │   └── index.ts
│   ├── effects/
│   │   ├── GitHubEffectsWrapper.tsx
│   │   └── index.ts
│   └── pages/
│       └ ParameterVideo.tsx # 参数量科普视频
├── public/                    # 静态资源
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

## 快速开始

```bash
cd aigc/ai-knowledge
npm install
npm run dev
```

## 视频配置

### ParameterVideo（参数量科普）

- **时长**: 30秒
- **场景**: 5 个场景
  1. 什么是参数？（5秒）
  2. 通俗比喻（5秒）
  3. 主流模型对比（8秒）
  4. 边际效益递减（6秒）
  5. 总结（6秒）

### 添加新视频

1. 在 `src/pages/` 创建新组件
2. 在 `src/Root.tsx` 注册 Composition
3. 运行 `npm run dev` 预览

## GitHub Markdown 风格

- 深色主题 (#0d1117 背景)
- 支持 heading、paragraph、code、list、table、blockquote
- 动态高亮当前内容块
- 文件头部复刻 GitHub 界面

## 渲染输出

```bash
npm run build
```

输出到 `out/video.mp4`