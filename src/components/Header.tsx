import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-brand">Web Harmonium</Link>
        <nav className="header-nav">
          {isHome ? (
            <>
              <a href="#harmonium">Play</a>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#faq">FAQ</a>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
            </>
          )}
          <Link to="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
