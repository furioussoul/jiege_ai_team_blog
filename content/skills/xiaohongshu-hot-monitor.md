---
title: "小红书AI热点监控"
description: "自动爬取小红书热榜，筛选与 AI 相关的内容，生成详细报告。"
category: "skills"
tags: ["AI", "热点监控", "小红书", "自动化", "定时任务"]
date: 2026-03-28
author: "杰哥 AI TEAM"
---

# 小红书AI热点监控

## 功能概述
自动爬取小红书热榜，筛选与 AI 相关的内容，生成详细报告。

## 核心能力
- **自动监控**: 支持定时执行（每天上午 10:00）
- **智能筛选**: 基于 90+ AI 关键词智能匹配
- **报告生成**: Markdown 格式，包含热度分析、内容建议
- **守护进程**: 支持后台持续运行

## 快速使用

### 执行一次监控
```bash
bun run xiaohongshu:hot
# 或
cd aigc/xiaohongshu-hot-monitor && bun run start
```

### 后台守护模式（每小时自动执行）
```bash
bun run xiaohongshu:daemon
# 或
cd aigc/xiaohongshu-hot-monitor && bun run daemon
```

## 监控关键词覆盖

### 核心关键词
AI、人工智能、大模型、AGI

### AI 工具
ChatGPT、Claude、DeepSeek、文心一言、通义千问、Kimi、豆包、智谱、Sora、Midjourney、Cursor、Gemini、Perplexity、Llama

### AI 应用
AI绘画、AI写作、AI视频、AI编程、智能体、Agent、RAG、数字人、AI修图、AI换装

### 行业热点
AI创业、AI变现、算力、GPU、英伟达、OpenAI、百度AI、阿里AI、腾讯AI、字节AI

### 小红书热门词汇
AI绘画教程、AI美妆、AI换装、AI修图教程、AI效率工具、AI神器、AI宝藏

## 输出示例

### 控制台摘要
```
============================================================
小红书AI热点监控摘要
============================================================
总热搜数: 15 条
AI相关热点: 10 条
占比: 66.7%
------------------------------------------------------------

AI热点TOP5:

[1] AI绘画神器Midjourney最新教程
   热度: 123.5万 | 关键词: AI, AI绘画, Midjourney
[2] DeepSeek大模型爆火背后的故事
   热度: 98.8万 | 关键词: DeepSeek, 大模型
[3] ChatGPT写论文实测体验
   热度: 87.7万 | 关键词: ChatGPT, AI写作
============================================================
```

### Markdown 报告
保存在 `aigc/xiaohongshu-hot-monitor/output/` 目录：
- 数据概览
- AI热点榜单（热度、关键词、描述）
- 热点分析（高频关键词、热度分布）
- 内容创作建议

## 技术实现

### 数据源
- API: DailyHotApi 开源项目（可自部署）
- 支持多个 API 源备份
- 模拟数据作为备用方案

### 篮选逻辑
1. 遍历热榜列表
2. 对每个热点标题和描述匹配关键词列表
3. 计算综合评分（关键词权重 × 热度）
4. 按评分排序输出

## 定时任务配置

使用 Cron Job Skill 配置每天上午 10:00 自动执行：

```bash
# Cron 表达式: 0 10 * * *
# 表示每天上午 10:00 执行
```

通过 API 创建定时任务：
```bash
curl -X POST "http://localhost:3456/api/projects/${projectId}/cron-jobs" \
  -H "Content-Type: application/json" \\n  -d '{
    "name": "小红书AI热点监控",
    "cronExpression": "0 10 * * *",
    "taskId": "'"${taskId}"'",
    "triggerMessage": "请执行小红书热点监控任务，生成AI热点报告"
  }'
```

## 扩展建议

### 通知推送
可扩展发送到：
- 企业微信/钉钉机器人
- Telegram Bot
- 邮件通知

### 数据存储
可将历史数据存储到：
- SQLite 数据库
- 云数据库
- JSON 文件归档

## 文件位置
- 主程序: `aigc/xiaohongshu-hot-monitor/xiaohongshu-hot-monitor.ts`
- 输出目录: `aigc/xiaohongshu-hot-monitor/output/`
- 配置文件: `aigc/xiaohongshu-hot-monitor/package.json`