import './HowItWorks.css';

const steps = [
  {
    number: '1',
    title: 'Open Web Harmonium',
    description: 'Visit webharmonium.site in any modern browser. No sign-up or installation required — your harmonium is ready to play.',
  },
  {
    number: '2',
    title: 'Play Harmonium',
    description: 'Click "Load Harmonium", then press keys on your computer keyboard or click the on-screen keys to play harmonium notes.',
  },
  {
    number: '3',
    title: 'Customize Your Sound',
    description: 'Adjust transpose, octave, and reverb to customize your harmonium sound. Connect a MIDI keyboard for a full-size harmonium experience.',
  },
];

export function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-inner">
        <h2 className="section-title">How Web Harmonium Works</h2>
        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.number}>
              <div className="step-number">{s.number}</div>
              <div className="step-content">
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
