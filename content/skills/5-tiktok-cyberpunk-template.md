---
title: "抖音 AI 科普视频模板 - 赛博朋克风格"
description: "冷色系赛博风（Cyber-Tech）视频模板，融合《边缘行者》高对比度赛博朋克质感"
category: "skills"
tags: ["AI", "视频模板", "Remotion", "赛博朋克", "抖音"]
image: "/images/covers/tiktok-cyberpunk-template.png"
date: 2026-03-28
author: "杰哥 AI TEAM"
---

# 抖音 AI 科普视频模板 - 赛博朋克风格

> 冷色系赛博风（Cyber-Tech）视频模板，融合《边缘行者》高对比度赛博朋克质感

## 🎨 设计特色

- **赛博青 #00F0FF** - 主强调色，极具穿透力
- **霓虹紫 #8A2BE2** - 次强调色，增加层次感
- **深空黑 #0B1120** - 背景色，突出内容

## 📁 项目结构

```
tiktok/
├── src/
│   ├── TikTokTemplate.tsx   # 核心模板组件
│   └── index.tsx            # Remotion 入口
├── scripts/
│   ├── convert-tts-timeline.ts  # TTS 时间戳转换
│   └── build-video.ts           # 视频构建脚本
├── public/
│   └── example-data.json    # 示例数据
├── lesson.json              # 课程配置
└── package.json
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd aigc/tiktok
bun install
```

### 2. 启动预览

```bash
bun run studio
```

### 3. 渲染视频

```bash
bun run render
```

## 📝 核心组件

### 1. ProgressBar - 进度条
- 顶部 6px 极窄进度条
- 青色到紫色渐变
- 心理暗示拉升完播率

### 2. HookTitle - 黄金三秒标题
- 弹簧回弹动效
- 高亮关键词突出显示
- 错位阴影增加层次

### 3. KaraokeSubtitles - 卡拉OK字幕
- Word-level 高亮效果
- 赛博青激活色
- 自动缩放动画

### 4. CyberBackground - 赛博背景
- 深空黑基底
- 脉动微光效果
- 双色渐变光晕

## 🔧 TTS 时间戳转换

将 TTS API 返回的毫秒时间戳转换为 Remotion 帧数：

```bash
# 基础用法
npx tsx scripts/convert-tts-timeline.ts input.json output.json

# 指定帧率
npx tsx scripts/convert-tts-timeline.ts input.json output.json --fps 30
```

### 输入格式 (毫秒)

```json
[
  { "word": "今天", "startTime": 0, "endTime": 800 },
  { "word": "带你", "startTime": 800, "endTime": 1500 }
]
```

### 输出格式 (帧数, 30fps)

```json
{
  "words": [
    { "word": "今天", "startFrame": 0, "endFrame": 24 },
    { "word": "带你", "startFrame": 24, "endFrame": 45 }
  ],
  "fps": 30,
  "totalFrames": 45
}
```

## 📋 配置说明

### lesson.json

```json
{
  "id": "demo-001",
  "title": "AI 驱动的无头组件架构",
  "hookMain": "全栈开发效率低？",
  "hookHighlight": "试试 AI 驱动的无头组件",
  "ipName": "杰哥_ai_team",
  "ipSlogan": "硬核 AI 架构解析",
  "fps": 30,
  "durationFrames": 150,
  "ttsData": [...]
}
```

## 🎬 批量生产工作流

1. **准备脚本** → lesson.json
2. **生成 TTS** → 火山引擎 Podcast API
3. **转换时间戳** → convert-tts-timeline.ts
4. **渲染视频** → bun run render

## 📦 依赖

- Remotion ^4.0.434
- React ^19.2.4
- TypeScript ^5

## 🔗 相关资源

- [火山引擎口播大模型](../volcengine-podcast.skill)
- [AI教学视频工作流](../ai-teaching-video.skill)