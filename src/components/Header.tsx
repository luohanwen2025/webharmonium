import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="header-brand">Web Harmonium</a>
        <nav className="header-nav">
          <a href="#harmonium">Play</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
    </header>
  );
}
