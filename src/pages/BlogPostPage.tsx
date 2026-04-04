import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getPostBySlug } from '../utils/blog';
import './BlogPostPage.css';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <>
        <Header />
        <main className="blog-post-page">
          <div className="blog-post-inner">
            <h1>Post Not Found</h1>
            <p>The blog post you are looking for does not exist.</p>
            <Link to="/blog" className="blog-back-link">← Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="blog-post-page">
        <article className="blog-post-inner">
          <Link to="/blog" className="blog-back-link">← Back to Blog</Link>
          <header className="blog-post-header">
            <h1 className="blog-post-title">{post.title}</h1>
            <time className="blog-post-date">{post.date}</time>
          </header>
          <div className="blog-post-content">
            <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
          </div>
          <Link to="/blog" className="blog-back-link blog-back-bottom">← Back to Blog</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
