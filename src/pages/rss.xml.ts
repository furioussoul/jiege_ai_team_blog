import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('posts', ({ data }) => {
    return data.draft !== true;
  });
  
  const sortedPosts = posts.sort((a, b) => 
    b.data.date.getTime() - a.data.date.getTime()
  );
  
  return rss({
    title: 'AI写作博客',
    description: 'AI 时代的内容创作实验室 - 探索 AI 技能、洞察行业趋势、提升写作能力',
    site: context.site || 'https://ai-writing.blog',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/post/${post.id}`,
      author: post.data.author || '杰哥 AI TEAM',
      categories: post.data.tags,
    })),
    customData: `<language>zh-cn</language>`,
  });
}