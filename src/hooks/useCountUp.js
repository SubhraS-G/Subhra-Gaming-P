import { useEffect, useRef, useState } from "react";

const DURATION = 1400;

/** Counts from 0 to `target` once the element scrolls into view. */
export default function useCountUp(target, { format = false, suffix = "" } = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / DURATION, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          setDisplay(
            (format ? current.toLocaleString("en-IN") : String(current)) + suffix
          );
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, format, suffix]);

  return { ref, display };
}
