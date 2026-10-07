import { useEffect, useState } from "react";
import useReveal from "../hooks/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";
import { MEDIA_KIT } from "../data/mediaKit.js";
import { CHANNEL } from "../data/content.js";

function useLiveStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const key = import.meta.env.VITE_YT_API_KEY;
    if (!key) return;
    fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL.channelId}&key=${key}`
    )
      .then((r) => r.json())
      .then((d) => setStats(d.items?.[0]?.statistics ?? null))
      .catch(() => {});
  }, []);
  return stats;
}

export default function MediaKit() {
  const sheetRef = useReveal();
  const live = useLiveStats();
  const subs = live ? `${parseInt(live.subscriberCount, 10).toLocaleString("en-IN")}+` : "991+";
  const views = live ? `${Math.round(parseInt(live.viewCount, 10) / 1000)}K+` : "225K+";
  const videos = live ? `${live.videoCount}+` : "576+";

  return (
    <section id="media-kit" className="section shell mediakit-section">
      <div className="bg-word" aria-hidden="true">KIT</div>

      <SectionHeading index="05" eyebrow="FOR BRANDS" prefix="THE " accent="MEDIA KIT." />

      <div className="mediakit-sheet reveal" ref={sheetRef}>
        <header className="mk-head">
          <div>
            <span className="mk-kicker">CREATOR MEDIA KIT — {MEDIA_KIT.updated}</span>
            <h3 className="mk-name">SUBHRA GAMING</h3>
            <p className="mk-tag">GAMER • STREAMER • CONTENT CREATOR</p>
          </div>
          <button
            type="button"
            className="button primary mk-print"
            onClick={() => window.print()}
          >
            DOWNLOAD PDF <span>↗</span>
          </button>
        </header>

        <div className="mk-stats">
          <div className="mk-stat"><strong>{subs}</strong><span>YOUTUBE SUBSCRIBERS</span></div>
          <div className="mk-stat"><strong>{views}</strong><span>TOTAL VIEWS</span></div>
          <div className="mk-stat"><strong>{videos}</strong><span>VIDEOS PUBLISHED</span></div>
          <div className="mk-stat"><strong>2018</strong><span>CREATING SINCE</span></div>
        </div>

        <div className="mk-columns">
          <div className="mk-block">
            <h4>THE CHANNEL</h4>
            <p>{MEDIA_KIT.channel.niche}.</p>
            <p>
              Uploading since {MEDIA_KIT.channel.since} with a library of{" "}
              {MEDIA_KIT.channel.videos}+ videos and a weekly live cadence.
            </p>
          </div>
          <div className="mk-block">
            <h4>AUDIENCE</h4>
            <p>{MEDIA_KIT.audience.primaryGeo}</p>
            <p>{MEDIA_KIT.audience.demo}</p>
            <p>{MEDIA_KIT.audience.language}</p>
          </div>
          <div className="mk-block">
            <h4>HIGHLIGHTS</h4>
            <ul>
              {MEDIA_KIT.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mk-services">
          <h4>WHAT BRANDS GET</h4>
          <div className="mk-services-grid">
            {MEDIA_KIT.services.map((s) => (
              <div className="mk-service" key={s.title}>
                <strong>{s.title}</strong>
                <span>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="mk-foot">
          <span>{MEDIA_KIT.contacts.email}</span>
          <span>{CHANNEL.handle} • @wao._.subhra • kick.com/SubhraGaming69</span>
        </footer>
      </div>
    </section>
  );
}
