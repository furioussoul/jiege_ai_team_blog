# AI Team Blog - Agent 配置

本项目为杰哥 AI TEAM 的技术博客，主要分享 AI 编程、工程化、认知提升等内容。

## 项目结构

```
.
├── content/
│   ├── insights/          # 认知提升类文章
│   └── ...
├── .agents/
│   └── skills/            # Agent 技能配置
│       ├── cron-job/      # 定时任务技能
│       └── ai-learning-article/  # AI学习文章写作协作技能
└── agents.md              # 本文件
```

## 可用 Skills

### 1. cron-job

定时任务管理，支持 Cron 表达式调度。

**触发场景：**
- "每天早上提醒我..."
- "每周一 9点执行..."
- "每隔 30 分钟检查..."

详见：`.agents/skills/cron-job/SKILL.md`

### 2. ai-learning-article

AI学习加速器主题文章写作协作。

**触发场景：**
- "写一篇AI学习加速器的文章"
- "按照之前的风格写AI学习文章"
- "创建AI提效学习主题的内容"

**核心要点：**
- 开头例子必须是AI相关（不要React、Vue等传统技术）
- 时间对比要夸张，突出10倍提效
- 包含4个指令框架
- 每个指令有权威案例和个人实践
- 有认知科学原理支撑
- 金句收尾

详见：`.agents/skills/ai-learning-article/SKILL.md`

## 写作规范

### 文章类型

| 类型 | 目录 | 说明 |
|------|------|------|
| 认知提升 | content/insights/ | AI时代的思维模式、学习方法、效率提升 |
| 技术教程 | content/tutorials/ | 具体技术栈的教程和最佳实践 |
| 项目复盘 | content/case-studies/ | 实际项目的经验总结 |

### 文章命名

格式：`[序号]-[slug].md`

示例：
- `9-ai-learning-accelerator.md`
- `10-ai-prompt-mastery.md`

### Frontmatter 模板

```yaml
---
title: "文章标题"
description: "文章简介，用于SEO和分享预览"
category: "insights"
tags: ["AI", "学习方法", "效率提升"]
image: "/images/covers/xxx.png"
date: 2026-04-04
author: "杰哥 AI TEAM"
---
```

## 参考

- 风格参考：`content/insights/3-ai-coding-not-wishing.md`