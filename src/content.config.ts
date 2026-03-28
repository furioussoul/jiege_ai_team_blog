import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 分类定义
export const categories = [
  { id: 'skills', name: 'AI 技能', icon: '🛠️', color: '#6366F1', order: 1 },
  { id: 'insights', name: '技术洞察', icon: '💡', color: '#3B82F6', order: 2 },
  { id: 'book-notes', name: '读书笔记', icon: '📚', color: '#F97316', order: 3 },
  { id: 'hot-reports', name: '热点报告', icon: '📊', color: '#10B981', order: 4 },
  { id: 'writing-system', name: '写作系统', icon: '✍️', color: '#EC4899', order: 5 },
  { id: 'course', name: '课程资料', icon: '🎓', color: '#8B5CF6', order: 6 },
] as const;

// 文章 Schema - 使用宽松验证以兼容现有文章
const postSchema = z.object({
  title: z.string(),
  description: z.string().optional().default(''),
  category: z.enum(['skills', 'insights', 'book-notes', 'hot-reports', 'writing-system', 'course']).optional().default('skills'),
  tags: z.array(z.string()).optional().default([]),
  author: z.string().default('杰哥 AI TEAM'),
  date: z.coerce.date().optional().default(new Date()),
  modified: z.coerce.date().optional(),
  cover: z.string().optional(),
  image: z.string().optional(), // 支持image字段作为cover的别名
  featured: z.boolean().default(false),
  toc: z.boolean().default(true),
  keywords: z.array(z.string()).optional(),
  draft: z.boolean().default(false),
});

// 定义集合 - 使用 posts 作为集合名称
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content' }),
  schema: postSchema,
});

export const collections = { posts };