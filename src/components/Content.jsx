import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import { CHANNEL, FEATURED_VIDEOS } from "../data/content.js";
import SectionHeading from "./SectionHeading.jsx";

/** Max-res thumbnail with graceful fallback if a video has no 1280px poster. */
function Thumb({ id, alt }) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  return (
    <img
      src={src}
      onError={() => setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
      alt={alt}
      loading="lazy"
    />
  );
}

function VideoCard({ video, index, featured = false }) {
  const revealRef = useReveal();
  const [playing, setPlaying] = useState(false);

  return (
    <article
      className={`video-card reveal${featured ? " large" : ""}`}
      ref={revealRef}
      style={{ transitionDelay: `${Math.min(index, 4) * 90}ms` }}
    >
      <div className="video-media">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="video-thumb"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${video.title}`}
          >
            <Thumb id={video.id} alt={video.title} />
            <span className="play-badge">▶</span>
          </button>
        )}
        <span className={`kind-chip kind-${(video.kind || "VIDEO").toLowerCase()}`}>
          {video.kind || "VIDEO"}
        </span>
      </div>
      <div className="video-meta">
        <h3>{video.title}</h3>
        <a
          className="video-link"
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noreferrer"
        >
          WATCH ON YOUTUBE <span>↗</span>
        </a>
      </div>
    </article>
  );
}

export default function Content() {
  return (
    <section id="content" className="section shell content-section">
      <div className="bg-word" aria-hidden="true" ref={null}>
        CREATE
      </div>

      <SectionHeading index="02" eyebrow="THE CONTENT" prefix="WHAT I " accent="CREATE." />

      <div className="videos-grid">
        {FEATURED_VIDEOS.map((video, index) => (
          <VideoCard key={video.id} video={video} index={index} featured={index === 0} />
        ))}
      </div>

      <div className="videos-cta reveal">
        <div>
          <h3>NEW DROPS EVERY WEEK.</h3>
          <span className="cta-hint">GAMEPLAY • LIVE STREAMS • VLOGS</span>
        </div>
        <a className="button primary" href={CHANNEL.url} target="_blank" rel="noreferrer">
          SUBSCRIBE ON YOUTUBE <span>↗</span>
        </a>
      </div>
    </section>
  );
}
