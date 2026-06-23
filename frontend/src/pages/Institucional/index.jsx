import Hero from './sections/Hero';
import ProvaSocial from './sections/ProvaSocial';
import Valores from './sections/Valores';
import Funcionalidades from './sections/Funcionalidades';
import CTA from './sections/CTA';

export default function Institucional() {
  return (
    <div className="font-sans">
      <Hero />
      <ProvaSocial />
      <Valores />
      <Funcionalidades />
      <CTA />
    </div>
  );
}