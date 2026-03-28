// Category definitions for blog
export interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  color: string;
  desc?: string;
}

export const categories: CategoryInfo[] = [
  {
    id: 'skills',
    name: 'AI 技能',
    icon: '🛠️',
    color: '#6366F1',
    desc: '视频生成、图片生成、热点监控等工具文档'
  },
  {
    id: 'insights',
    name: '技术洞察',
    icon: '💡',
    color: '#3B82F6',
    desc: 'AI 编程、软件工程、行业分析等深度文章'
  },
  {
    id: 'book-notes',
    name: '读书笔记',
    icon: '📚',
    color: '#F97316',
    desc: '经典著作研读报告'
  },
  {
    id: 'hot-reports',
    name: '热点报告',
    icon: '📊',
    color: '#10B981',
    desc: '抖音/小红书 AI 热点监控日报'
  },
  {
    id: 'writing-system',
    name: '写作系统',
    icon: '✍️',
    color: '#EC4899',
    desc: '写作训练方法论和组件库'
  },
  {
    id: 'course',
    name: '课程资料',
    icon: '🎓',
    color: '#8B5CF6',
    desc: 'AI 培训课程相关资料'
  }
];

// Category metadata object (for lookup by id)
export const categoryMeta = {
  skills: { name: 'AI 技能', icon: '🛠️', color: '#6366F1', desc: '视频生成、图片生成、热点监控等工具文档' },
  insights: { name: '技术洞察', icon: '💡', color: '#3B82F6', desc: 'AI 编程、软件工程、行业分析等深度文章' },
  'book-notes': { name: '读书笔记', icon: '📚', color: '#F97316', desc: '经典著作研读报告' },
  'hot-reports': { name: '热点报告', icon: '📊', color: '#10B981', desc: '抖音/小红书 AI 热点监控日报' },
  'writing-system': { name: '写作系统', icon: '✍️', color: '#EC4899', desc: '写作训练方法论和组件库' },
  course: { name: '课程资料', icon: '🎓', color: '#8B5CF6', desc: 'AI 培训课程相关资料' },
} as const;

// Helper function to get category by id
export function getCategoryById(id: string): CategoryInfo | undefined {
  return categories.find(c => c.id === id);
}