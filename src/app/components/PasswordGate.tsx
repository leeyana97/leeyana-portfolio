import { useState } from 'react';
import { useNavigate } from 'react-router';

const PASSCODE = 'nurleeyana2209';

const C = {
  bg: '#0D0D0D',
  primary: '#EBEBE5',
  secondary: '#888884',
  border: '#2A2A2A',
  error: '#C47A7A',
};
const F = {
  editorial: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', sans-serif",
};

interface PasswordGateProps {
  /** Unique key used to persist unlock state in sessionStorage */
  storageKey: string;
  children: React.ReactNode;
}

/**
 * Wraps a page in a passcode gate. Once the correct passcode is entered the
 * unlock state is stored in sessionStorage so the user isn't prompted again
 * on the same visit.
 */
export function PasswordGate({ storageKey, children }: PasswordGateProps) {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(storageKey) === 'true'
  );
  const [value, setValue] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  // Already unlocked — render the actual page.
  if (unlocked) return <>{children}</>;

  const handleSubmit = () => {
    if (value === PASSCODE) {
      sessionStorage.setItem(storageKey, 'true');
      setUnlocked(true);
    } else {
      setError(true);
      setValue('');
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflow: 'hidden',
      }}
    >
      {/* Ambient pinkish-purple glow — mirrors the homepage hero gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: [
            'radial-gradient(55% 55% at 38% 42%, rgba(180, 80, 120, 0.28) 0%, transparent 70%)',
            'radial-gradient(50% 50% at 62% 38%, rgba(120, 60, 180, 0.22) 0%, transparent 70%)',
            'radial-gradient(40% 40% at 50% 60%, rgba(160, 60, 160, 0.12) 0%, transparent 70%)',
          ].join(', '),
          filter: 'blur(40px)',
        }}
      />

      {/* Gate card */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '360px' }}>

        {/* Label */}
        <p
          style={{
            fontFamily: F.sans,
            fontSize: '11px',
            fontWeight: 500,
            color: C.secondary,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            margin: '0 0 32px 0',
          }}
        >
          Enter Passcode to Continue
        </p>

        {/* Input row */}
        <div style={{ position: 'relative', marginBottom: error ? '10px' : '16px' }}>
          <input
            type={showPass ? 'text' : 'password'}
            value={value}
            placeholder="Passcode"
            autoComplete="off"
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            style={{
              width: '100%',
              padding: '14px 64px 14px 18px',
              border: `1px solid ${error ? C.error : C.border}`,
              backgroundColor: 'rgba(255,255,255,0.03)',
              fontFamily: F.sans,
              fontSize: '15px',
              fontWeight: 400,
              letterSpacing: '0.04em',
              color: C.primary,
              outline: 'none',
              boxSizing: 'border-box',
              caretColor: C.primary,
              borderRadius: '2px',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = 'rgba(235,235,229,0.35)'; }}
            onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = C.border; }}
          />
          <button
            onClick={() => setShowPass((s) => !s)}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontFamily: F.sans,
              fontSize: '11px',
              fontWeight: 500,
              color: C.secondary,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.secondary)}
          >
            {showPass ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Inline error */}
        {error && (
          <p
            style={{
              fontFamily: F.sans,
              fontSize: '12px',
              color: C.error,
              letterSpacing: '0.05em',
              margin: '0 0 16px 0',
            }}
          >
            Incorrect passcode — please try again.
          </p>
        )}

        {/* Elegant submit button — Playfair Display, ghost outline */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '15px 24px',
            border: '1px solid rgba(235,235,229,0.22)',
            backgroundColor: 'transparent',
            fontFamily: F.editorial,
            fontSize: '17px',
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: C.primary,
            cursor: 'pointer',
            marginBottom: '28px',
            borderRadius: '2px',
            transition: 'border-color 0.3s ease, background-color 0.3s ease, letter-spacing 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(235,235,229,0.55)';
            e.currentTarget.style.backgroundColor = 'rgba(235,235,229,0.05)';
            e.currentTarget.style.letterSpacing = '0.08em';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(235,235,229,0.22)';
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.letterSpacing = '0.04em';
          }}
        >
          View Case Study
        </button>

        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: F.sans,
            fontSize: '12px',
            fontWeight: 400,
            color: C.secondary,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: 0,
            display: 'block',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.secondary)}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
