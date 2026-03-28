#!/usr/bin/env node
/**
 * 文章预览图生成脚本 - Sharp + SVG版本
 * 生成 Dan Koe 风格的斜切截图封面
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const COVERS_DIR = path.join(ROOT_DIR, 'public/images/covers');

// 颜色配置
const COLORS = {
  gradient1: '#1a1a2e',
  gradient2: '#16213e',
  accent: '#e94560',
  text: '#ffffff',
  textMuted: '#a0a0a0',
};

// 收集所有文章
async function collectArticles() {
  const articles = [];
  const categories = ['insights', 'skills', 'book-notes', 'writing-system'];
  
  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category);
    try {
      const files = await fs.readdir(categoryPath);
      
      for (const file of files) {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const filePath = path.join(categoryPath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          
          // 解析 frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const titleMatch = frontmatter.match(/^title:\s*["']?(.+?)["']?\s*$/m);
            const descMatch = frontmatter.match(/^description:\s*["']?(.+?)["']?\s*$/m);
            
            if (titleMatch) {
              const title = titleMatch[1].replace(/['"]/g, '').trim();
              const description = descMatch ? descMatch[1].replace(/['"]/g, '').trim() : '';
              const slug = file.replace(/\.(md|mdx)$/, '');
              
              articles.push({
                title,
                description,
                slug,
                category,
                filePath,
              });
            }
          }
        }
      }
    } catch (e) {
      console.log(`跳过目录: ${category}`);
    }
  }
  
  return articles;
}

// 文本换行
function wrapText(text, maxChars) {
  const lines = [];
  let currentLine = '';
  
  for (const char of text) {
    if (currentLine.length >= maxChars && (char === ' ' || char === '，' || char === '。' || char === '、')) {
      lines.push(currentLine.trim());
      currentLine = '';
    } else {
      currentLine += char;
    }
  }
  
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }
  
  return lines.length > 0 ? lines : [text];
}

// 获取分类标签
function getCategoryLabel(category) {
  const labels = {
    'insights': '技术洞察',
    'skills': '技能手册',
    'book-notes': '读书笔记',
    'writing-system': '写作系统',
  };
  return labels[category] || category;
}

// 生成 SVG 模板
function generateCoverSVG(article) {
  const titleLines = wrapText(article.title, 35);
  const titleFontSize = titleLines.length > 2 ? 38 : 48;
  
  // 计算标题位置
  const titleStartY = 140;
  const titleLineHeight = titleFontSize * 1.3;
  
  // 构建标题文本元素
  const titleElements = titleLines.slice(0, 3).map((line, i) => 
    `<text x="150" y="${titleStartY + i * titleLineHeight}" 
      font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" 
      font-size="${titleFontSize}" font-weight="700" fill="${COLORS.text}"
      style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3)">
      ${escapeXml(line)}
    </text>`
  ).join('\n');
  
  // 描述文本
  const descLines = article.description ? wrapText(article.description, 50).slice(0, 2) : [];
  const descStartY = titleStartY + Math.min(titleLines.length, 3) * titleLineHeight + 30;
  const descElements = descLines.map((line, i) => 
    `<text x="150" y="${descStartY + i * 28}" 
      font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" 
      font-size="18" fill="${COLORS.textMuted}">
      ${escapeXml(line)}
    </text>`
  ).join('\n');
  
  const categoryLabel = getCategoryLabel(article.category);
  
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.gradient1}"/>
      <stop offset="100%" style="stop-color:${COLORS.gradient2}"/>
    </linearGradient>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="20" dy="20" stdDeviation="30" flood-opacity="0.5"/>
    </filter>
    <filter id="innerShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="-5" dy="-5" stdDeviation="10" flood-opacity="0.05"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- 网格装饰 -->
  <g opacity="0.03">
    ${generateGridPattern()}
  </g>
  
  <!-- 斜切卡片 -->
  <g transform="translate(600, 315) rotate(-5)">
    <rect x="-425" y="-190" width="850" height="380" rx="16" ry="16"
      fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2"
      filter="url(#cardShadow) url(#innerShadow)"/>
    
    <!-- 角落装饰 - 左上 -->
    <path d="M -405 -170 L -405 -110 L -345 -110" 
      stroke="${COLORS.accent}" stroke-width="3" fill="none" opacity="0.6"/>
    
    <!-- 角落装饰 - 右下 -->
    <path d="M 405 170 L 405 110 L 345 110" 
      stroke="${COLORS.accent}" stroke-width="3" fill="none" opacity="0.6"/>
    
    <!-- 分类标签 -->
    <rect x="-375" y="-140" width="${categoryLabel.length * 14 + 40}" height="32" rx="16" fill="${COLORS.accent}"/>
    <text x="${-375 + (categoryLabel.length * 14 + 40) / 2}" y="-120" 
      font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" 
      font-size="14" font-weight="600" fill="white" text-anchor="middle">
      ${categoryLabel}
    </text>
    
    <!-- 标题 -->
    <g transform="translate(-600, -315) rotate(5)">
      ${titleElements}
      ${descElements}
    </g>
  </g>
  
  <!-- 品牌标识 -->
  <rect x="1068" y="565" width="32" height="32" rx="8" fill="${COLORS.accent}"/>
  <text x="1084" y="585" font-family="sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">J</text>
  <text x="1130" y="585" font-family="-apple-system, sans-serif" font-size="16" fill="${COLORS.textMuted}">杰哥 AI TEAM</text>
</svg>`;
}

// 生成网格图案
function generateGridPattern() {
  const lines = [];
  const gridSize = 60;
  
  for (let x = 0; x <= 1200; x += gridSize) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="white" stroke-width="1"/>`);
  }
  for (let y = 0; y <= 630; y += gridSize) {
    lines.push(`<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="white" stroke-width="1"/>`);
  }
  
  return lines.join('\n');
}

// XML转义
function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// 生成预览图
async function generateCover(article) {
  const svg = generateCoverSVG(article);
  const buffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();
  return buffer;
}

// 更新文章 frontmatter
async function updateFrontmatter(article) {
  const content = await fs.readFile(article.filePath, 'utf-8');
  const imagePath = `/images/covers/${article.slug}.png`;
  
  // 检查是否已有 image 字段
  if (content.match(/^image:\s*["']?.*?["']?\s*$/m)) {
    // 更新已有的 image 字段
    const updated = content.replace(
      /^image:\s*["']?.*?["']?\s*$/m,
      `image: "${imagePath}"`
    );
    await fs.writeFile(article.filePath, updated, 'utf-8');
  } else {
    // 添加 image 字段到 frontmatter（在 date 之后）
    const updated = content.replace(
      /^(---\n[\s\S]*?)(date:.*?\n)/,
      `$1image: "${imagePath}"\n$2`
    );
    await fs.writeFile(article.filePath, updated, 'utf-8');
  }
}

// 主函数
async function main() {
  console.log('🎨 开始生成文章预览图...\n');
  
  // 确保输出目录存在
  await fs.mkdir(COVERS_DIR, { recursive: true });
  
  // 收集文章
  const articles = await collectArticles();
  console.log(`📚 找到 ${articles.length} 篇文章\n`);
  
  const results = [];
  
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const shortTitle = article.title.substring(0, 40) + (article.title.length > 40 ? '...' : '');
    console.log(`📸 [${i + 1}/${articles.length}] 生成: ${shortTitle}`);
    
    try {
      const buffer = await generateCover(article);
      const outputPath = path.join(COVERS_DIR, `${article.slug}.png`);
      await fs.writeFile(outputPath, buffer);
      
      // 更新 frontmatter
      await updateFrontmatter(article);
      
      results.push({ slug: article.slug, title: article.title, status: '✅' });
      console.log(`   ✅ 已保存: ${outputPath}`);
    } catch (error) {
      results.push({ slug: article.slug, title: article.title, status: '❌', error: error.message });
      console.log(`   ❌ 失败: ${error.message}`);
    }
  }
  
  // 输出结果
  console.log('\n' + '='.repeat(60));
  console.log('📊 生成结果汇总');
  console.log('='.repeat(60));
  
  const success = results.filter(r => r.status === '✅');
  const failed = results.filter(r => r.status === '❌');
  
  console.log(`\n✅ 成功: ${success.length} 篇`);
  console.log(`❌ 失败: ${failed.length} 篇\n`);
  
  console.log('生成的预览图清单:');
  console.log('-'.repeat(60));
  for (const r of success) {
    const displayTitle = r.title.length > 35 ? r.title.substring(0, 35) + '...' : r.title;
    console.log(`  ${r.status} ${r.slug}.png`);
    console.log(`      ${displayTitle}`);
  }
  
  if (failed.length > 0) {
    console.log('\n失败列表:');
    for (const r of failed) {
      console.log(`  ${r.status} ${r.slug} - ${r.error}`);
    }
  }
  
  console.log('\n📁 预览图保存位置: public/images/covers/');
  console.log('📝 文章 frontmatter 已更新');
}

main().catch(console.error);