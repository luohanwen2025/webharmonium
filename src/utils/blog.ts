export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

const mdModules = import.meta.glob('../blog/*.md', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string }>;

function parseFrontmatter(raw: string): { meta: { title: string; date: string; description: string }; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { meta: { title: 'Untitled', date: '', description: '' }, content: raw };
  }

  const frontmatter = match[1];
  const content = match[2];

  const meta: Record<string, string> = {};
  for (const line of frontmatter.split('\n')) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      meta[key] = value;
    }
  }

  return {
    meta: {
      title: meta.title || 'Untitled',
      date: meta.date || '',
      description: meta.description || '',
    },
    content,
  };
}

function slugFromPath(path: string): string {
  const filename = path.split('/').pop() || '';
  return filename.replace(/\.md$/, '');
}

const allPosts: BlogPost[] = Object.entries(mdModules)
  .map(([path, mod]) => {
    const { meta, content } = parseFrontmatter(mod.default);
    return {
      slug: slugFromPath(path),
      title: meta.title,
      date: meta.date,
      description: meta.description,
      content,
    };
  })
  .sort((a, b) => (a.date > b.date ? -1 : 1));

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return allPosts.map((post) => post.slug);
}
