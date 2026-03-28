---
title: "抖音AI热点监控系统"
description: "自动爬取抖音热搜，筛选与 AI 相关的内容，整理成报告发送给用户。"
category: "skills"
tags: ["AI", "热点监控", "抖音", "自动化", "爬虫"]
image: "/images/covers/douyin-hot-monitor.png"
date: 2026-03-28
author: "杰哥 AI TEAM"
---

# 抖音AI热点监控系统

自动爬取抖音热搜，筛选与 AI 相关的内容，整理成报告发送给用户。

## 功能特性

- ✅ **自动监控**: 每小时自动爬取抖音热搜榜
- ✅ **智能筛选**: 基于 80+ AI 关键词智能筛选相关内容
- ✅ **报告生成**: 生成 Markdown 格式的详细报告
- ✅ **热度分析**: 提供热点趋势分析和关键词统计
- ✅ **守护进程**: 支持后台持续运行

## 快速开始

### 一次性执行

```bash
bun run start
# 或
bun run douyin-hot-monitor.ts
```

### 守护进程模式（每小时自动执行）

```bash
bun run daemon
# 或
bun run douyin-hot-monitor.ts --daemon
```

### 开发模式（文件变化自动重启）

```bash
bun run dev
```

## 监控关键词

系统监控以下类别的关键词：

### 核心关键词
- AI、人工智能、大模型、AGI

### AI 工具
- ChatGPT、Claude、DeepSeek
- 文心一言、通义千问、Kimi、豆包、智谱
- Sora、Midjourney、Stable Diffusion
- Cursor、Copilot、Gemini

### AI 应用
- AI绘画、AI写作、AI视频、AI编程
- 智能体、Agent、RAG、提示词

### 行业热点
- AI创业、AI变现、AI风口
- 算力、GPU、英伟达、OpenAI
- 百度AI、阿里AI、腾讯AI、字节AI、华为AI

### 新兴话题
- 人形机器人、具身智能
- AI手机、AI电脑、AI眼镜、AI耳机

## 输出示例

### 控制台输出

```
============================================================
📋 抖音AI热点监控摘要
============================================================
📊 总热搜数: 50 条
🎯 AI相关热点: 3 条
📈 占比: 6.0%
------------------------------------------------------------

🔥 AI热点TOP5:

🥇 全世界都在用中国Token
   热度: 1187.5万 | 关键词: Token
🥈 小米大模型负责人谈未来竞争
   热度: 766.3万 | 关键词: 大模型
🥉 内存条降价
   热度: 912.7万 | 关键词: 暂无AI关键词

============================================================
```

### Markdown 报告

报告保存在 `output/` 目录下，包含：
- 数据概览
- AI热点榜单（带热度、排名、匹配关键词）
- 热点分析（高频关键词、热度分布）
- 封面图片

## API 说明

本系统使用免费的抖音热搜 API：
- 接口地址: `https://v2.xxapi.cn/api/douyinhot`
- 无需 API Key
- 返回 50 条热搜数据

## 文件结构

```
douyin-hot-monitor/
├── douyin-hot-monitor.ts    # 主程序
├── package.json              # 项目配置
├── README.md                 # 说明文档
├── tsconfig.json             # TypeScript 配置
└── output/                   # 报告输出目录
    └── douyin-ai-hot-report-*.md
```

## 扩展建议

### 1. 添加通知功能

可以扩展发送通知到：
- 邮件通知
- 企业微信/钉钉
- Telegram Bot
- 飞书机器人

### 2. 数据存储

可以将历史数据存储到：
- SQLite 数据库
- JSON 文件
- 云数据库

### 3. 更多数据源

可以扩展监控：
- 微博热搜
- 知乎热榜
- B站热门
- 百度热搜

## License

MIT