import { useEffect, useState } from 'react';

/**
 * Preload (and decode) a list of image URLs and return `true` once they're
 * all ready. Used to gate animations so we don't kick off a hero entrance
 * while the browser is still downloading/decoding the underlying assets —
 * which produces visible jank when images pop in mid-animation.
 *
 * Notes:
 * - `img.decode()` waits for the image to be both downloaded AND decoded,
 *   so by the time the promise resolves the next paint will display it
 *   instantly (no decode-on-paint stall).
 * - Failed decodes don't block the rest — we treat the URL as "ready" so
 *   one missing/broken asset can't permanently block the animation.
 * - We key the effect on the joined URL string rather than the array
 *   reference so callers can safely pass a fresh array on every render.
 */
export function useImagesLoaded(urls: readonly string[]): boolean {
  const [loaded, setLoaded] = useState(false);
  const urlKey = urls.join('|');

  useEffect(() => {
    if (urls.length === 0) {
      setLoaded(true);
      return;
    }

    let cancelled = false;
    setLoaded(false);

    Promise.all(
      urls.map((url) => {
        const img = new Image();
        // High priority hint — browsers that support it (Chrome 101+) will
        // bump these requests to the head of the queue.
        if ('fetchPriority' in img) {
          (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = 'high';
        }
        img.src = url;
        return img.decode().catch(() => undefined);
      }),
    ).then(() => {
      if (!cancelled) setLoaded(true);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlKey]);

  return loaded;
}
