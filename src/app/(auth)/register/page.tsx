"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLeft } from "@/components/auth/AuthLeft";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName,   setFirstName]   = useState("");
  const [lastName,    setLastName]    = useState("");
  const [email,       setEmail]       = useState("");
  const [program,     setProgram]     = useState("");
  const [password,    setPassword]    = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error,       setError]       = useState("");
  const [success,     setSuccess]     = useState(false);
  const [loading,     setLoading]     = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const ALLOWED_DOMAINS = ["@soyudemedellin.edu.co", "@udemedellin.edu.co"];
    const emailLower = email.toLowerCase();
    if (!ALLOWED_DOMAINS.some(d => emailLower.endsWith(d))) {
      setError("Solo se permiten correos institucionales @soyudemedellin.edu.co o @udemedellin.edu.co");
      return;
    }

    if (password !== confirmPass) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName, program },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Mostrar mensaje de éxito y redirigir después de 2.5s
    setSuccess(true);
    setTimeout(() => router.push("/login?registered=1"), 2500);
  }

  // ── Pantalla de éxito ──────────────────────────────────
  if (success) {
    return (
      <div className="auth-wrapper">
        <AuthLeft
          headline={<>Únete a la<br />comunidad<br /><em>estudiantil.</em></>}
          stats={[
            { value: "Gratis", label: "Siempre"     },
            { value: "2 min",  label: "Registro"    },
            { value: "100%",   label: "Comunidad Universitaria" },
          ]}
        />
        <div className="auth-right" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", maxWidth: 360 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "#dcfce7",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{
              fontFamily: "Syne, sans-serif", fontSize: 22,
              fontWeight: 700, color: "var(--gray-900)", marginBottom: 10,
            }}>
              ¡Cuenta creada!
            </h2>
            <p style={{ fontSize: 13, color: "var(--gray-500)", lineHeight: 1.65, marginBottom: 24 }}>
              Tu cuenta fue creada exitosamente.<br />
              Te redirigimos al inicio de sesión…
            </p>
            <div style={{
              height: 4, borderRadius: 2,
              background: "var(--gray-200)", overflow: "hidden",
            }}>
              <div style={{
                height: "100%", background: "var(--orange)",
                borderRadius: 2,
                animation: "progress-bar 2.5s linear forwards",
              }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrapper">
      <AuthLeft
        headline={<>Únete a la<br />comunidad<br /><em>estudiantil.</em></>}
        stats={[
          { value: "Gratis", label: "Siempre" },
          { value: "2 min", label: "Registro" },
          { value: "100%", label: "Estudiantes" },
        ]}
      />

      <div className="auth-right" style={{ paddingTop: 36, paddingBottom: 36 }}>
        <h1 className="auth-form-title">Crear cuenta</h1>
        <p className="auth-form-sub">Completa tu perfil universitario</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-row">
            <div className="field-group">
              <label className="field-label" htmlFor="firstName">Nombre</label>
              <input id="firstName" className="field-input" type="text"
                placeholder="Juan" autoComplete="given-name" required
                value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="field-group">
              <label className="field-label" htmlFor="lastName">Apellido</label>
              <input id="lastName" className="field-input" type="text"
                placeholder="García" autoComplete="family-name" required
                value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="reg-email">Correo electrónico</label>
            <input id="reg-email" className="field-input" type="email"
              placeholder="tu@soyudemedellin.edu.co" autoComplete="email" required
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="program">Carrera / Programa</label>
            <input id="program" className="field-input" type="text"
              placeholder="Ej: Ingeniería de Sistemas"
              value={program} onChange={e => setProgram(e.target.value)} />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="reg-password">Contraseña</label>
            <div className="password-wrap">
              <input id="reg-password" className="field-input"
                type={showPass ? "text" : "password"}
                placeholder="Mínimo 8 caracteres" autoComplete="new-password"
                required minLength={8}
                value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" className="password-eye"
                onClick={() => setShowPass(v => !v)} tabIndex={-1}>
                {showPass ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="confirm-password">Confirmar contraseña</label>
            <div className="password-wrap">
              <input id="confirm-password" className="field-input"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirma tu contraseña" autoComplete="new-password" required
                value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
              <button type="button" className="password-eye"
                onClick={() => setShowConfirm(v => !v)} tabIndex={-1}>
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creando cuenta…" : "Crear mi cuenta"}
          </button>

          <p className="auth-terms">
            Al registrarte aceptas nuestros{" "}
            <Link href="#">Términos de uso</Link> y{" "}
            <Link href="#">Política de privacidad</Link>
          </p>
        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
