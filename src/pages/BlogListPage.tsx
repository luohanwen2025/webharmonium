import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getAllPosts } from '../utils/blog';
import './BlogListPage.css';

export function BlogListPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="blog-list-page">
        <div className="blog-list-inner">
          <h1 className="blog-list-title">Blog</h1>
          <p className="blog-list-subtitle">
            Articles about harmonium, playing techniques, and how to get the most out of Web Harmonium.
          </p>
          <div className="blog-list">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card">
                <span className="blog-card-date">{post.date}</span>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
                <span className="blog-card-read">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
