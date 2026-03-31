import './Hero.css';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">Web Harmonium &mdash; Play Harmonium Online</h1>
        <p className="hero-subtitle">
          Web Harmonium is a free, open-source virtual harmonium that runs entirely in your browser.
          Play harmonium using your computer keyboard or connect a MIDI controller and start playing instantly.
          No downloads, no installs &mdash; just open and play.
        </p>
        <a href="#harmonium" className="hero-cta">Play Harmonium Now</a>
      </div>
    </section>
  );
}
