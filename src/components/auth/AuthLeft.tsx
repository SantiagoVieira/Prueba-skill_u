import type { ReactNode } from "react";

interface Stat {
  value: string;
  label: string;
}

interface AuthLeftProps {
  headline: ReactNode;
  stats: Stat[];
}

export function AuthLeft({ headline, stats }: AuthLeftProps) {
  return (
    <div className="auth-left">
      <div className="auth-logo">
        <div className="auth-logo-icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="auth-logo-name">
          Skill<span>_u</span>
        </span>
      </div>

      <div className="auth-left-content">
        <h2 className="auth-headline">{headline}</h2>
        <p className="auth-subline">
          Compra, vende y conecta con otros
          <br />
          estudiantes de tu universidad.
        </p>
      </div>

      <div className="auth-stats">
        {stats.map((s) => (
          <div key={s.label}>
            <span className="auth-stat-num">{s.value}</span>
            <span className="auth-stat-lbl">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthLeft;