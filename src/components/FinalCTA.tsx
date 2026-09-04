import React from 'react';
import { FireButton } from './Hero';

export const FinalCTA: React.FC = () => {
  return (
    <section className="final-cta" id="contact">
      <div className="site-container reveal visible">
        <h2 id="final-cta-heading">
          Ready to <span className="cursor-highlight inline-block text-accent text-glow">level up?</span>
        </h2>
        <FireButton id="final-cta-btn" />
      </div>
    </section>
  );
};

