import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CREATORS, Creator } from '../data';
import { FireButton } from './Hero';

export const Clients: React.FC = () => {
  // Line 1: Top 4 channels by subscriber count
  const line1 = CREATORS.slice(0, 4);
  // Line 2: Next 4 channels by subscriber count
  const line2 = CREATORS.slice(4, 8);

  const renderCard = (creator: Creator, index: number) => {
    const delayClass = `d${(index % 6) + 1}`;
    return (
      <a
        key={creator.name}
        href={creator.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`client-card reveal-scale ${delayClass} visible group w-full`}
        id={`client-card-${creator.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
        title={`Visit ${creator.name} on YouTube (${creator.subs})`}
      >
        <div className="client-avatar">
          <img
            src={creator.avatar}
            alt={creator.name}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="client-info min-w-0 flex-1">
          <h4 className="leading-tight">{creator.name}</h4>
          <div className="subs">
            <span>{creator.subs}</span>
          </div>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all ml-auto shrink-0" />
      </a>
    );
  };

  return (
    <>
      <section className="section" id="clients">
        <div className="site-container">
          <div className="section-header reveal visible">
            <h2 className="section-title section-title-lg" id="clients-heading">
              Worked with <span className="cursor-highlight inline-block text-accent text-glow">AMAZING</span> creators like you
            </h2>
          </div>

          <div className="trusted-grid" id="trusted-creators-grid">
            {/* Line 1: 4 channels */}
            <div className="trusted-row-1 contents" id="trusted-creators-row-1">
              {line1.map((creator, index) => renderCard(creator, index))}
            </div>

            {/* Line 2: 4 channels */}
            <div className="trusted-row-2 contents" id="trusted-creators-row-2">
              {line2.map((creator, index) => renderCard(creator, index + 4))}
            </div>
          </div>
        </div>
      </section>

      <div className="cta-mid" id="mid-cta-1">
        <div className="site-container">
          <FireButton id="mid-cta-btn-1" />
        </div>
      </div>
    </>
  );
};
