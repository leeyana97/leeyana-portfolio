import { useRef, useState, useEffect, type ReactNode } from 'react';

export function MobileCarouselWrap({ children, count, autoPlay = false }: { children: ReactNode; count: number; autoPlay?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const touchingRef = useRef(false);
  const activeRef = useRef(0);

  useEffect(() => {
    const el = wrapRef.current?.querySelector('.mobile-card-carousel') as HTMLElement | null;
    if (!el) return;

    const getIdx = () => Math.min(Math.round(el.scrollLeft / (el.scrollWidth / count)), count - 1);

    const onScroll = () => {
      const idx = getIdx();
      activeRef.current = idx;
      setActive(idx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });

    const onTouchStart = () => { touchingRef.current = true; };
    const onTouchEnd = () => { touchingRef.current = false; };
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    let timer: ReturnType<typeof setInterval> | null = null;
    if (autoPlay) {
      timer = setInterval(() => {
        if (touchingRef.current) return;
        const next = (activeRef.current + 1) % count;
        el.scrollTo({ left: (el.scrollWidth / count) * next, behavior: 'smooth' });
      }, 2500);
    }

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      if (timer) clearInterval(timer);
    };
  }, [count, autoPlay]);

  return (
    <div ref={wrapRef}>
      {children}
      <div className="mobile-carousel-dots">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`mobile-carousel-dot${i === active ? ' active' : ''}`} />
        ))}
      </div>
    </div>
  );
}
