import { useState, useEffect } from 'react';

interface Post {
  id: string;
  data: {
    title: string;
    description?: string;
    category: string;
    tags: string[];
    date: Date;
  };
}

interface Props {
  query?: string;
}

export default function Search({ query = '' }: Props) {
  const [searchQuery, setSearchQuery] = useState(query);
  const [posts, setPosts] = useState<Post[]>([]);
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all posts on mount
  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/posts.json');
        const data = await response.json();
        setPosts(data.posts || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load posts:', error);
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  // Search when query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = posts.filter((post) => {
      return (
        post.data.title.toLowerCase().includes(lowerQuery) ||
        (post.data.description && post.data.description.toLowerCase().includes(lowerQuery)) ||
        post.data.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        post.data.category.toLowerCase().includes(lowerQuery)
      );
    });
    setResults(filtered);
  }, [searchQuery, posts]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const categories = {
    skills: { name: 'AI 技能', icon: '🛠️' },
    insights: { name: '技术洞察', icon: '💡' },
    'book-notes': { name: '读书笔记', icon: '📚' },
    'hot-reports': { name: '热点报告', icon: '📊' },
    'writing-system': { name: '写作系统', icon: '✍️' },
    course: { name: '课程资料', icon: '🎓' },
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Search Input */}
      <div className="relative mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索标题、描述、标签..."
          className="w-full px-4 py-3 pl-12 rounded-lg bg-bg-secondary border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-text-muted">加载中...</p>
        </div>
      )}

      {/* Results */}
      {!loading && searchQuery.trim() !== '' && (
        <div>
          <p className="text-sm text-text-muted mb-4">
            找到 {results.length} 篇相关文章
          </p>

          {results.length > 0 ? (
            <ul className="space-y-4">
              {results.map((post) => (
                <li key={post.id}>
                  <a
                    href={`/post/${post.id}`}
                    className="block p-4 rounded-lg bg-bg-secondary border border-border hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">
                        {categories[post.data.category]?.icon || '📄'}
                      </span>
                      <span className="text-xs text-text-muted">
                        {categories[post.data.category]?.name || post.data.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-text-primary mb-1">
                      {post.data.title}
                    </h3>
                    {post.data.description && (
                      <p className="text-sm text-text-secondary line-clamp-2">
                        {post.data.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2 text-xs text-text-muted">
                      <time>{formatDate(post.data.date)}</time>
                      {post.data.tags.length > 0 && (
                        <span>
                          {post.data.tags.slice(0, 3).map((tag) => `#${tag}`).join(' ')}
                        </span>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-text-muted">没有找到相关文章</p>
              <p className="text-sm text-text-muted mt-2">
                试试其他关键词？
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && searchQuery.trim() === '' && (
        <div className="text-center py-8">
          <p className="text-text-muted">输入关键词开始搜索</p>
        </div>
      )}
    </div>
  );
}