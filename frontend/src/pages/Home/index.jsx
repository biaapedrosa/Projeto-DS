import Hero from './sections/Hero';
import Sobre from './sections/Sobre';
import CTA from './sections/CTA';

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      <Sobre />
      <CTA />
    </div>
  );
}