import { Header } from './components/Header';
import { Harmonium } from './components/Harmonium';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Harmonium />
        <Features />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

export default App;
