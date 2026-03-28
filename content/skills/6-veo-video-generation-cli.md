---
title: "Google Veo 视频 CLI 工具"
description: "基于 Google Veo API 的视频生成命令行工具，支持文生视频和图生视频两种模式。"
category: "skills"
tags: ["AI", "视频生成", "Veo", "CLI", "Google"]
image: "/images/covers/veo-video-generation-cli.png"
date: 2026-03-28
author: "杰哥 AI TEAM"
---

# Google Veo 视频 CLI 工具

基于 Google Veo API 的视频生成命令行工具，支持文生视频和图生视频两种模式。

## 文件结构

```
aigc/veo/
├── cli.ts              # CLI 入口脚本
├── veo-service.ts      # API 封装服务
├── README.md           # 本文档
└── public/
    └── videos/         # 输出目录（视频保存位置）
```

## 环境配置

### 1. 获取 API Key

访问 [Google AI Studio](https://aistudio.google.com/app/apikey) 创建或获取 API Key。

### 2. 配置环境变量

在项目根目录 `.env.local` 文件中添加：

```bash
GEMINI_API_KEY=your_api_key_here
```

## 使用方法

### 生成视频 (generate)

```bash
# 文生视频
bun run aigc/veo/cli.ts generate \
  --prompt "A cinematic drone shot flying over a misty mountain range at sunrise" \
  --ratio 16:9 \
  --output mountain.mp4

# 图生视频
bun run aigc/veo/cli.ts generate \
  --prompt "The person smiles and turns their head slightly" \
  --image ./photo.jpg \
  --ratio 9:16 \
  --output animated.mp4

# 仅创建任务（不等待完成）
bun run aigc/veo/cli.ts generate \
  --prompt "A beautiful sunset over the ocean" \
  --no-wait
```

#### 参数说明

| 参数 | 必需 | 默认值 | 说明 |
|------|------|--------|------|
| `--prompt` | ✓ | - | 文本提示词 |
| `--image` | - | - | 输入图片路径（图生视频模式） |
| `--ratio` | - | 16:9 | 视频比例: 16:9 / 9:16 / 1:1 |
| `--output` | - | veo-video-{timestamp}.mp4 | 输出文件路径 |
| `--samples` | - | 1 | 生成视频数量 (1-4) |
| `--no-wait` | - | false | 创建任务后立即返回 |
| `--help` | - | - | 显示帮助信息 |

### 查询任务状态 (status)

```bash
bun run aigc/veo/cli.ts status --operation operations/veo-123456
```

### 下载视频 (download)

```bash
bun run aigc/veo/cli.ts download \
  --uri "https://generativelanguage.googleapis.com/v1beta/files/abc123:download?alt=media" \
  --output video.mp4
```

## API 信息

- **模型**: `veo-3.1-generate-preview`
- **端点**: `https://generativelanguage.googleapis.com/v1beta`
- **生成时间**: 通常 1-5 分钟

## 视频比例

| 比例 | 用途 |
|------|------|
| 16:9 | 横屏视频（YouTube、网页） |
| 9:16 | 竖屏视频（抖音、小红书） |
| 1:1 | 方形视频（Instagram） |

## Prompt 编写技巧

```bash
# 高质量 Prompt 模板
"[镜头运动], [主体描述], [环境氛围], [光影效果]"

# 示例1：电影级航拍
"A cinematic drone shot flying over a misty mountain range at sunrise, golden light streaming through clouds"

# 示例2：人物特写
"Close-up of a woman smiling, hair gently moving in the breeze, soft natural lighting"

# 示例3：产品展示
"Product rotation on a white background, smooth lighting, professional commercial style"
```

## 错误处理

- **API Key 无效**: 检查 `.env.local` 中的 `GEMINI_API_KEY` 是否正确
- **任务超时**: 默认等待 10 分钟，可通过 API 增加 `maxWaitTime`
- **图片过大**: 图片限制 10MB，建议使用高质量图片（≥1280x720）
- **配额用尽**: Veo API 有每日请求限制

## 注意事项

1. **API Key 安全**: 不要将 API Key 硬编码或提交到 Git
2. **生成时间**: 视频生成需要 1-5 分钟，请耐心等待
3. **视频下载**: 视频 URI 有时效性，建议生成后立即下载
4. **配额限制**: 建议实现重试机制

## 相关文档

- [Google Veo 官方文档](https://ai.google.dev/gemini-api/docs/video)
- [Generative Language API 参考](https://ai.google.dev/api/generatecontent)
- [Google AI Studio](https://aistudio.google.com/)