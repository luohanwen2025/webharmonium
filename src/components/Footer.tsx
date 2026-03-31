import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">Web Harmonium</div>
        <p className="footer-text">
          A free, open-source virtual harmonium app. Play harmonium online with Web Harmonium, built with Web Audio API.
        </p>
        <p className="footer-copy">&copy; {year} Web Harmonium. All rights reserved.</p>
      </div>
    </footer>
  );
}
