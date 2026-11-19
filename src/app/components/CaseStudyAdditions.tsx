import type { ReactNode } from 'react';

const C = { primary: '#EBEBE5', secondary: '#888884', cardBorder: '#222222', label: '#8A8A82' };
const F = { editorial: "'Playfair Display', Georgia, serif", sans: "'DM Sans', sans-serif" };

export function RoleBlock({ rows }: { rows: Array<[string, ReactNode]> }) {
  return (
    <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: '28px', marginTop: '4px', maxWidth: '880px' }}>
      <p style={{ fontFamily: F.sans, fontSize: '11px', color: C.label, margin: '0 0 18px 0', letterSpacing: '0.14em', textTransform: 'uppercase' }}>My role</p>
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', rowGap: '14px', columnGap: '32px' }} className="max-md:!grid-cols-1 max-md:!gap-y-1">
        {rows.map(([k, v]) => (
          <div key={k} style={{ display: 'contents' }}>
            <p style={{ fontFamily: F.sans, fontSize: '11px', color: C.label, margin: 0, paddingTop: '4px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{k}</p>
            <p style={{ fontFamily: F.sans, fontSize: '16px', color: C.primary, margin: 0, lineHeight: 1.6 }} className="max-md:!mb-3">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export type Decision = { tag: string; title: ReactNode; rows: Array<[string, ReactNode]> };

export function DecisionCards({ intro, items }: { intro?: ReactNode; items: Decision[] }) {
  return (
    <>
      {intro && (
        <p style={{ fontFamily: F.editorial, fontSize: 'clamp(24px, 3vw, 36px)', color: C.primary, lineHeight: 1.35, letterSpacing: '-0.01em', fontWeight: 400, margin: '0 0 56px 0', maxWidth: '960px' }}>{intro}</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {items.map((d, i) => (
          <div
            key={i}
            style={{ border: `1px solid ${C.cardBorder}`, padding: '40px', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '40px', alignItems: 'start' }}
            className="max-md:!grid-cols-1 max-md:!gap-6 max-md:!p-7"
          >
            <div>
              <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, margin: '0 0 12px 0', letterSpacing: '0.08em' }}>{String(i + 1).padStart(2, '0')}</p>
              <p style={{ fontFamily: F.sans, fontSize: '12px', color: 'var(--accent-color, #888884)', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.4 }}>{d.tag}</p>
            </div>
            <div>
              <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(22px, 2.4vw, 30px)', color: C.primary, margin: '0 0 24px 0', lineHeight: 1.25, fontWeight: 400 }}>{d.title}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', rowGap: '16px', columnGap: '28px' }} className="max-md:!grid-cols-1 max-md:!gap-y-1">
                {d.rows.map(([k, v]) => (
                  <div key={k} style={{ display: 'contents' }}>
                    <p style={{ fontFamily: F.sans, fontSize: '11px', color: C.label, margin: 0, paddingTop: '5px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{k}</p>
                    <p style={{ fontFamily: F.sans, fontSize: '16px', color: C.primary, lineHeight: 1.7, margin: 0 }} className="max-md:!mb-3">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(19px, 2vw, 24px)', color: C.primary, lineHeight: 1.5, margin: '56px 0 0 0', paddingLeft: '24px', borderLeft: '2px solid var(--accent-color, #2A2A2A)', maxWidth: '880px' }}>
      {children}
    </p>
  );
}

export function Prose({ children, top = 0 }: { children: ReactNode; top?: number }) {
  return (
    <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: `${top}px 0 0 0`, maxWidth: '720px' }}>{children}</p>
  );
}
