---
name: cron-job
description: 创建和管理定时任务，支持 Cron 表达式调度
---

# Cron Job Skill

定时任务管理技能，让用户可以调度任务在特定时间自动执行。
Plan Mode 也支持定时任务。

## 触发场景

当用户说：
- "每天早上提醒我..."
- "每周一 9 点执行..."
- "每隔 30 分钟检查..."

Agent 应加载此 skill。

## Cron 表达式格式

```
分 时 日 月 周
0-59 0-23 1-31 1-12 0-6
```

示例：
- `0 9 * * *` - 每天 9:00
- `0 9 * * 1-5` - 周一到周五 9:00  
- `*/30 * * * *` - 每 30 分钟

## API URL

- **生产模式**：`http://localhost:3456/api/...`（端口可能动态变化，默认 3456）

## 获取 projectId 和 taskId

Agent 可以从**消息开头**的 Context 部分获取：
- `projectId` - 当前项目 ID
- `taskId` - 当前任务 ID

---

## taskId 使用方式（重要）

**根据 taskId 决定谁执行任务：**

| taskId | 执行者 | assignedRole |
|--------|--------|--------------|
| 当前 taskId | 自己执行 | 当前任务的 assignedRole |
| 其他 taskId | 别人执行 | 目标 task 的 assignedRole |
| 无（需创建） | 别人执行 | 新 task 的 assignedRole |

### 场景 1：自己执行

使用当前 taskId，触发时由当前任务的 Agent 执行。

```bash
curl -X POST "http://localhost:3456/api/projects/${projectId}/cron-jobs" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "每日喝热水提醒",
    "cronExpression": "0 9 * * *",
    "taskId": "'"${taskId}"'",
    "triggerMessage": "请发送消息提醒用户喝热水"
  }'
```

### 场景 2：别人执行（已有任务）

使用其他任务的 ID，触发时由该任务的 Agent 执行。

```bash
# 假设目标 task ID 为 "task_abc123"
curl -X POST "http://localhost:3456/api/projects/${projectId}/cron-jobs" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "定时代码审查",
    "cronExpression": "0 18 * * 5",
    "taskId": "task_abc123",
    "triggerMessage": "请执行代码审查任务"
  }'
```

### 场景 3：别人执行（无任务，需创建）

**必须先创建任务**，再创建 cron job。

```bash
# 步骤 1：创建新任务
# 使用 workflow_manage 工具创建 task
# 获取返回的 taskId

# 步骤 2：使用新 taskId 创建 cron job
curl -X POST "http://localhost:3456/api/projects/${projectId}/cron-jobs" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "定时数据备份",
    "cronExpression": "0 2 * * *",
    "taskId": "新创建的taskId",
    "triggerMessage": "请执行数据备份"
  }'
```

---

## 创建定时任务参数

| 字段 | 必填 | 说明 |
|------|------|------|
| name | ✅ | 任务名称 |
| cronExpression | ✅ | Cron 表达式 |
| taskId | ✅ | 目标任务 ID |
| triggerMessage | ✅ | 触发时发送给 Agent 的消息 |
| timezone | ❌ | 时区，默认 Asia/Shanghai |
| jobType | ❌ | RECURRING 或 ONE_TIME |

**注意**：`assignedRole` 无需指定，自动从目标 task 获取。

---

## API 端点

| 方法 | 端点 | 说明 |
|------|------|------|
| POST | /api/projects/[id]/cron-jobs | 创建定时任务 |
| GET | /api/projects/[id]/cron-jobs | 列出定时任务 |
| GET | /api/projects/[id]/cron-jobs/[jobId] | 获取任务详情 |
| PATCH | /api/projects/[id]/cron-jobs/[jobId] | 更新任务 |
| DELETE | /api/projects/[id]/cron-jobs/[jobId] | 删除任务 |
| POST | /api/projects/[id]/cron-jobs/[jobId]/pause | 暂停任务 |
| POST | /api/projects/[id]/cron-jobs/[jobId]/resume | 恢复任务 |
| POST | /api/projects/[id]/cron-jobs/[jobId]/trigger | 立即触发 |