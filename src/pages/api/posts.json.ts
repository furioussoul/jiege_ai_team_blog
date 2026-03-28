import { getAllPosts } from '../../utils/content';

export async function GET() {
  // 使用 getAllPosts 确保按日期倒序排列
  const posts = await getAllPosts();
  
  const postsData = posts.map((post) => ({
    id: post.id,
    data: {
      title: post.data.title,
      description: post.data.description,
      category: post.data.category,
      tags: post.data.tags,
      date: post.data.date.toISOString(),
    },
  }));
  
  return new Response(
    JSON.stringify({ posts: postsData }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}