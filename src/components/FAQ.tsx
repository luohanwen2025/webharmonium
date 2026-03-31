import { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    question: 'What is Web Harmonium?',
    answer: 'Web Harmonium is a free, browser-based virtual harmonium. It lets you play harmonium sounds directly in your web browser using your computer keyboard or a connected MIDI controller, with no downloads or installations required.',
  },
  {
    question: 'Do I need to install anything to use Web Harmonium?',
    answer: 'No. Web Harmonium runs entirely in your browser. Just visit webharmonium.site and start playing. You can optionally install Web Harmonium as a Progressive Web App (PWA) for offline access.',
  },
  {
    question: 'Does Web Harmonium work on mobile devices?',
    answer: 'Yes, you can tap the on-screen keys on mobile browsers to play harmonium. However, Web Harmonium is optimized for desktop use with a physical keyboard or MIDI controller.',
  },
  {
    question: 'How do I connect a MIDI keyboard to Web Harmonium?',
    answer: 'Plug in your USB MIDI keyboard, then click the refresh button in the MIDI section of Web Harmonium. Select your device from the dropdown, and your MIDI keyboard will control the harmonium directly.',
  },
  {
    question: 'What browsers does Web Harmonium support?',
    answer: 'Web Harmonium works best in modern browsers that support the Web Audio API and Web MIDI API: Chrome, Edge, Firefox, and Safari. For MIDI support, Chrome or Edge is recommended.',
  },
  {
    question: 'Can I use Web Harmonium offline?',
    answer: 'Yes. After your first visit, install Web Harmonium as a PWA. On Chrome, click the install icon in the address bar. Once installed, Web Harmonium works without an internet connection.',
  },
  {
    question: 'What harmonium controls are available?',
    answer: 'Web Harmonium provides transpose (shift the root key by semitones), octave shift (move the keyboard range up or down), additional reeds (layer extra reed sounds for a richer tone), and reverb (add room ambience).',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq" id="faq">
      <div className="faq-inner">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <button
                className={`faq-question ${openIndex === index ? 'faq-open' : ''}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <span className="faq-arrow">{openIndex === index ? '\u2212' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
