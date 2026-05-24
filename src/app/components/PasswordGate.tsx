import { useState } from 'react';
import { useNavigate } from 'react-router';

const PASSCODE = 'nurleeyana2209';

const F = { mono: "'Courier New', Courier, monospace" };

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
        minHeight: '100vh',
        backgroundColor: '#F0EFEB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '380px' }}>
        {/* Prompt */}
        <p
          style={{
            fontFamily: F.mono,
            fontSize: '11px',
            color: '#888884',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: '0 0 28px 0',
          }}
        >
          Enter Passcode to Continue
        </p>

        {/* Input */}
        <div style={{ position: 'relative', marginBottom: error ? '10px' : '12px' }}>
          <input
            type={showPass ? 'text' : 'password'}
            value={value}
            placeholder="PASSCODE"
            autoComplete="off"
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            style={{
              width: '100%',
              padding: '14px 60px 14px 16px',
              border: `1px solid ${error ? '#b84040' : '#C8C7C2'}`,
              backgroundColor: 'transparent',
              fontFamily: F.mono,
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: '#555550',
              outline: 'none',
              boxSizing: 'border-box',
              caretColor: '#555550',
            }}
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
              fontFamily: F.mono,
              fontSize: '10px',
              color: '#888884',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {showPass ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p
            style={{
              fontFamily: F.mono,
              fontSize: '10px',
              color: '#b84040',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: '0 0 12px 0',
            }}
          >
            Incorrect passcode. Try again.
          </p>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '16px',
            border: '1px solid #888884',
            backgroundColor: 'transparent',
            fontFamily: F.mono,
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: '#555550',
            textTransform: 'uppercase',
            cursor: 'pointer',
            marginBottom: '28px',
            transition: 'background-color 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#555550';
            e.currentTarget.style.color = '#F0EFEB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#555550';
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
            fontFamily: F.mono,
            fontSize: '10px',
            color: '#888884',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: 0,
            display: 'block',
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
