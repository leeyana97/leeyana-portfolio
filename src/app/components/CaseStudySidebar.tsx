import { useEffect, useState } from 'react';

export interface SidebarItem {
  /** id of the section element to scroll to / observe */
  id: string;
  label: string;
}

/**
 * Sticky left-rail navigation for case study pages. Lists the major
 * sections, highlights the one currently in view (via IntersectionObserver),
 * and smooth-scrolls to a section on click. Hidden below 1024px (CSS).
 */
export function CaseStudySidebar({ items }: { items: SidebarItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    // A horizontal "reading line" ~140px below the top. The active section
    // is the last one whose top has scrolled above that line — the standard
    // scroll-spy behaviour, and it lands correctly after click-to-scroll.
    const LINE = 140;
    const recompute = () => {
      let current = items[0]?.id ?? '';
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top - LINE <= 1) current = it.id;
      }
      setActive(current);
    };

    // IntersectionObserver with a fine threshold list fires frequently as
    // sections scroll, triggering a position-based recompute each time.
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer = new IntersectionObserver(recompute, { threshold: thresholds });

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    recompute();

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <aside className="cs-sidebar" aria-label="Case study sections">
      <nav className="cs-sidebar__nav">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            className={`cs-sidebar__link${active === it.id ? ' is-active' : ''}`}
            onClick={() => handleClick(it.id)}
          >
            {it.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
