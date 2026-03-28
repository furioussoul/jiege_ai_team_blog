import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// 从标题或文件名提取排序编号
function extractOrderNumber(title: string, id: string): number | null {
  // 优先从文件名提取序号（如 "1-xxx.md"、"2-xxx.md"）
  const fileMatch = id.match(/^(\d+)-/);
  if (fileMatch) {
    return parseInt(fileMatch[1]);
  }
  
  // 其次从标题提取章节号（如 "第1章"、"第1-2章"、"chapter-1"）
  const titleMatch = title.match(/第(\d+)|chapter-(\d+)/i);
  if (titleMatch) {
    return parseInt(titleMatch[1] || titleMatch[2]);
  }
  
  return null;
}

// Category metadata
export const categories = {
  skills: { name: 'AI 技能', icon: '🛠️', color: '#6366F1', desc: '视频生成、图片生成、热点监控等工具文档' },
  insights: { name: '技术洞察', icon: '💡', color: '#3B82F6', desc: 'AI 编程、软件工程、行业分析等深度文章' },
  'book-notes': { name: '读书笔记', icon: '📚', color: '#F97316', desc: '经典著作研读报告' },
  'hot-reports': { name: '热点报告', icon: '📊', color: '#10B981', desc: '抖音/小红书 AI 热点监控日报' },
  'writing-system': { name: '写作系统', icon: '✍️', color: '#EC4899', desc: '写作训练方法论和组件库' },
  course: { name: '课程资料', icon: '🎓', color: '#8B5CF6', desc: 'AI 培训课程相关资料' },
} as const;

// Get all posts
export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts');
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => {
      const orderA = extractOrderNumber(a.data.title, a.id);
      const orderB = extractOrderNumber(b.data.title, b.id);
      
      // 都有编号，按编号排序
      if (orderA !== null && orderB !== null) {
        return orderA - orderB;
      }
      
      // 都无编号，按日期排序（最新在前）
      if (orderA === null && orderB === null) {
        return b.data.date.valueOf() - a.data.date.valueOf();
      }
      
      // 有编号的排前面
      return orderA !== null ? -1 : 1;
    });
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.category === category);
}

// Get featured posts
export async function getFeaturedPosts(limit = 4): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.featured).slice(0, limit);
}

// Get latest posts
export async function getLatestPosts(limit = 10): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags.includes(tag));
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagsSet = new Set<string>();
  posts.forEach((post) => {
    post.data.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

// Get category stats
export async function getCategoryStats(): Promise<Record<string, number>> {
  const posts = await getAllPosts();
  const stats: Record<string, number> = {};
  posts.forEach((post) => {
    stats[post.data.category] = (stats[post.data.category] || 0) + 1;
  });
  return stats;
}

// Calculate reading time (approximate)
export function calculateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const totalWords = words + chineseChars;
  const readingTimeMinutes = Math.ceil(totalWords / 200); // Average reading speed
  return `${readingTimeMinutes} 分钟`;
}