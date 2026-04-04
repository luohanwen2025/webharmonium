import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Harmonium } from '../components/Harmonium';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';

export function HomePage() {
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
