import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { X, Menu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactModal } from './ContactModal';

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  showBack?: boolean;
}

export function Navigation({ showBack = false }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const heroEl = document.getElementById('hero');
    const trigger = ScrollTrigger.create({
      trigger: heroEl ?? document.documentElement,
      start: heroEl ? 'bottom top+=80' : 'top top-=80',
      onEnter: () => navEl.classList.add('is-scrolled'),
      onLeaveBack: () => navEl.classList.remove('is-scrolled'),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="site-nav max-md:!px-6"
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: '80px',
          paddingRight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Back arrow (case study pages) or just monogram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {showBack && (
            <Link
              to="/"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
                color: '#888884',
                letterSpacing: '0.03em',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#EBEBE5')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888884')}
            >
              Back
            </Link>
          )}
          {/* NL Monogram */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontSize: '28px',
                color: '#EBEBE5',
                letterSpacing: '-0.02em',
                display: 'inline-flex',
                alignItems: 'flex-start',
                lineHeight: 1,
              }}
            >
              <span className="font-[Luxurious_Script]" style={{ position: 'relative', top: '2px', marginRight: '-6px', zIndex: 1 }}>N</span>
              <span className="font-[Luxurious_Script]" style={{ position: 'relative', top: '7px', marginLeft: '-2px' }}>L</span>
            </span>
          </Link>
        </div>

        {/* Right: Nav links (desktop) */}
        <div className="hidden md:flex" style={{ gap: '40px', alignItems: 'center' }}>
          {['Work', 'About', 'Contact'].map(item => (
            <button
              key={item}
              onClick={() => item === 'Contact' ? setContactOpen(true) : scrollTo(item.toLowerCase())}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
                color: '#888884',
                letterSpacing: '0.05em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#EBEBE5')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888884')}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#EBEBE5',
            padding: '4px',
            minWidth: '44px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </nav>

      {/* Mobile fullscreen overlay menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          backgroundColor: '#0D0D0D',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
          <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
            <span
              style={{
                fontFamily: '"Luxurious Script", cursive',
                fontStyle: 'italic',
                fontSize: '36px',
                color: '#EBEBE5',
                letterSpacing: '-0.02em',
                display: 'inline-flex',
                alignItems: 'flex-start',
                lineHeight: 1,
              }}
            >
              <span style={{ position: 'relative', top: '2px', marginRight: '-6px', zIndex: 1 }}>N</span>
              <span style={{ position: 'relative', top: '7px', marginLeft: '-2px' }}>L</span>
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#EBEBE5',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {['Work', 'About', 'Contact'].map(item => (
            <button
              key={item}
              onClick={() => {
                setMenuOpen(false);
                if (item === 'Contact') {
                  setContactOpen(true);
                } else {
                  scrollTo(item.toLowerCase());
                }
              }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '48px',
                color: '#EBEBE5',
                letterSpacing: '-0.02em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                textAlign: 'left',
                lineHeight: 1.1,
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingBottom: '24px' }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: '#888884',
            }}
          >
            © 2026 Leeyana
          </p>
        </div>
      </div>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}