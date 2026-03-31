import './Features.css';

const features = [
  {
    icon: '🎹',
    title: 'Harmonium Keyboard Mapping',
    description: 'Play harmonium notes directly with your computer keyboard. White keys map to Q-P and black keys to the number row — intuitive and instant.',
  },
  {
    icon: '🎵',
    title: 'MIDI Harmonium Support',
    description: 'Connect any MIDI keyboard or controller to Web Harmonium for a richer playing experience. Your computer becomes a full harmonium instrument.',
  },
  {
    icon: '🔊',
    title: 'Reverb Effect',
    description: 'Built-in reverb adds depth and ambience to your harmonium sound, simulating a natural room acoustic.',
  },
  {
    icon: '⬆️',
    title: 'Transpose & Octave',
    description: 'Shift the harmonium pitch up or down by semitones or whole octaves to match your vocal range or play in any key.',
  },
  {
    icon: '🎶',
    title: 'Additional Reeds',
    description: 'Layer extra reed sounds for a fuller, richer harmonium tone — just like a real harmonium with multiple reed banks.',
  },
  {
    icon: '📱',
    title: 'Web Harmonium Works Offline',
    description: 'Install Web Harmonium as a Progressive Web App and play harmonium even without an internet connection. Always ready when inspiration strikes.',
  },
];

export function Features() {
  return (
    <section className="features" id="features">
      <div className="features-inner">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
