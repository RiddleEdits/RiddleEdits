import React, { useState } from 'react';
import { WORKS } from '../data';
import { FireButton } from './Hero';

export const WorkSection: React.FC = () => {
  const [playingWorks, setPlayingWorks] = useState<Record<string, boolean>>({});

  const handlePlay = (id: string) => {
    setPlayingWorks((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <section className="section" id="work">
        <div className="site-container">
          <div className="section-header reveal visible">
            <h2 className="section-title section-title-lg" id="work-heading">
              Check out my <span className="cursor-highlight inline-block text-accent text-glow">work 🎬</span>
            </h2>
          </div>

          <div className="work-grid" id="portfolio-work-grid">
            {WORKS.map((work, index) => {
              const isPlaying = playingWorks[work.id];
              const isEven = index % 2 === 1;
              const revealClass = isEven ? 'reveal-right d2' : 'reveal-left d1';
              const videoSrc = `https://www.youtube.com/embed/${work.youtubeId}${isPlaying ? '?autoplay=1' : ''}`;

              return (
                <article
                  key={work.id}
                  className={`work-card ${revealClass} visible`}
                  id={`work-card-${work.id}`}
                >
                  <div
                    className={`work-thumb ${isPlaying ? 'is-playing' : ''}`}
                  >
                    <div
                      className="work-thumb-cover"
                      onClick={() => handlePlay(work.id)}
                      title={`Play ${work.title}`}
                    />
                    <iframe
                      src={videoSrc}
                      title={work.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="work-body">
                    <h3>{work.title}</h3>
                    <div className="work-meta">
                      <span>{work.creator}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="cta-mid" id="mid-cta-2">
        <div className="site-container">
          <FireButton id="mid-cta-btn-2" />
        </div>
      </div>
    </>
  );
};
