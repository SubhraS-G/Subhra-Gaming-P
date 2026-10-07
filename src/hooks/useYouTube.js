import { useEffect, useState } from "react";
import { CHANNEL, STATS as FALLBACK_STATS } from "../data/content.js";

const API = "https://www.googleapis.com/youtube/v3";
const KEY = import.meta.env.VITE_YT_API_KEY;
const CHANNEL_ID = CHANNEL.channelId;

// Module-level cache so multiple components share one request
let statsCache = null;
let mixCache = null;

async function jsonOrThrow(res) {
  if (!res.ok) throw new Error(`YouTube API error ${res.status}`);
  return res.json();
}

/** Parse ISO-8601 duration (PT1H2M3S) into total seconds. */
function durationSeconds(iso) {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso || "");
  if (!m) return 0;
  return (+(m[1] || 0)) * 3600 + (+(m[2] || 0)) * 60 + (+(m[3] || 0));
}

function toCard(item) {
  return {
    id: item.id?.videoId || item.id,
    title: item.snippet.title,
    publishedAt: item.snippet.publishedAt,
    thumbnail:
      item.snippet.thumbnails?.medium?.url ||
      item.snippet.thumbnails?.high?.url,
  };
}

async function fetchChannel() {
  if (statsCache) return statsCache;
  if (!KEY) return null;

  const res = await fetch(
    `${API}/channels?part=statistics&id=${CHANNEL_ID}&key=${KEY}`
  );
  const data = await jsonOrThrow(res);
  statsCache = data.items?.[0]?.statistics ?? null;
  return statsCache;
}

/**
 * Fetches a mixed set of content:
 *   2 regular videos + 2 completed livestreams + 1 short (with backfill).
 * Uses search.list (recent + past-broadcast) and videos.list for durations.
 */
async function fetchContentMix() {
  if (mixCache) return mixCache;
  if (!KEY) return [];

  // 1) Recent uploads (mixed types)
  const recentRes = await fetch(
    `${API}/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=25&key=${KEY}`
  );
  const recentData = await jsonOrThrow(recentRes);
  const recent = (recentData.items ?? []).filter((i) => i.id?.videoId).map(toCard);

  // 2) Past livestreams
  const liveRes = await fetch(
    `${API}/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&eventType=completed&maxResults=8&key=${KEY}`
  );
  const liveData = await jsonOrThrow(liveRes).catch(() => ({ items: [] }));
  const liveIds = new Set((liveData.items ?? []).map((i) => i.id?.videoId).filter(Boolean));

  // 3) Durations to detect shorts (≤ 3 min)
  const ids = recent.map((v) => v.id).join(",");
  let durations = {};
  if (ids) {
    const detailsRes = await fetch(
      `${API}/videos?part=contentDetails&id=${ids}&key=${KEY}`
    );
    const details = await jsonOrThrow(detailsRes);
    durations = Object.fromEntries(
      (details.items ?? []).map((i) => [i.id, durationSeconds(i.contentDetails?.duration)])
    );
  }

  const lives = [];
  const shorts = [];
  const videos = [];

  for (const card of recent) {
    const secs = durations[card.id] ?? Infinity;
    if (liveIds.has(card.id)) lives.push({ ...card, kind: "LIVE" });
    else if (secs > 0 && secs <= 180) shorts.push({ ...card, kind: "SHORT" });
    else videos.push({ ...card, kind: "VIDEO" });
  }

  // Desired mix: 2 videos, 2 lives, 1 short — backfill from leftovers if a
  // category is empty so the grid always feels varied.
  const picked = [
    ...videos.slice(0, 2),
    ...lives.slice(0, 2),
    ...shorts.slice(0, 1),
  ];
  const rest = [...videos.slice(2), ...lives.slice(2), ...shorts.slice(1)];
  for (const extra of rest) {
    if (picked.length >= 5) break;
    picked.push(extra);
  }

  mixCache = picked;
  return picked;
}

/** Live channel stats; falls back to hardcoded numbers on failure. */
export function useYouTubeStats() {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [live, setLive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchChannel()
      .then((s) => {
        if (cancelled || !s) return;
        setStats([
          { value: parseInt(s.subscriberCount, 10) || 0, suffix: "+", label: "YOUTUBE SUBSCRIBERS" },
          { value: parseInt(s.viewCount, 10) || 0, suffix: "+", label: "TOTAL VIEWS", format: true },
          { value: parseInt(s.videoCount, 10) || 0, suffix: "+", label: "VIDEOS PUBLISHED" },
          { value: 2018, suffix: "", label: "CREATING SINCE" },
        ]);
        setLive(true);
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, live, error };
}

/** Mixed latest content (videos + lives + shorts); [] while loading or without a key. */
export function useYouTubeVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(Boolean(KEY));

  useEffect(() => {
    let cancelled = false;
    fetchContentMix()
      .then((v) => {
        if (!cancelled) setVideos(v);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { videos, loading };
}
