"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { SUBJECTS } from "@/types/material";

interface Props {
  onClose: () => void;
  onSaved: (id: string) => void;
}

export function PublishMetaModal({ onClose, onSaved }: Props) {
  const [title,   setTitle]   = useState("");
  const [desc,    setDesc]    = useState("");
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [price,   setPrice]   = useState("0");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    // Solo dígitos, sin negativos ni letras
    if (raw === "" || /^\d+$/.test(raw)) {
      setPrice(raw);
    }
  }

  function handlePriceBlur() {
    // Si queda vacío al salir del campo, vuelve a 0
    if (price === "") setPrice("0");
  }

  async function handleSave() {
    if (!title.trim()) { setError("El título es obligatorio"); return; }

    const parsedPrice = parseInt(price, 10);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setError("El precio debe ser un número positivo");
      return;
    }

    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error: err } = await supabase
      .from("materials")
      .insert({
        user_id:     session.user.id,
        title:       title.trim(),
        description: desc.trim(),
        subject,
        price:       parsedPrice,
        is_visible:  false,
      })
      .select("id")
      .single();

    if (err) { setError(err.message); setLoading(false); return; }
    onSaved(data.id);
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <span className="modal-title">Nueva publicación</span>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="field-group">
            <label className="field-label">Título *</label>
            <input
              className="field-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Apuntes Cálculo Diferencial 2024-1"
            />
          </div>

          <div className="field-group">
            <label className="field-label">Descripción</label>
            <textarea
              className="field-textarea"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe brevemente el contenido..."
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field-group">
              <label className="field-label">Materia</label>
              <div className="select-wrap">
                <select
                  className="field-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">
                Precio (COP)
                {price !== "0" && price !== "" && (
                  <span style={{ color: "var(--orange)", fontWeight: 400, marginLeft: 6 }}>
                    ${parseInt(price || "0").toLocaleString("es-CO")}
                  </span>
                )}
              </label>
              <input
                className="field-input"
                type="text"
                inputMode="numeric"
                value={price}
                onChange={handlePriceChange}
                onBlur={handlePriceBlur}
                placeholder="0 = gratis"
              />
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <p style={{ fontSize: 11, color: "var(--gray-400)", lineHeight: 1.5 }}>
            💡 La publicación quedará guardada pero no será visible hasta que subas el archivo.
          </p>
        </div>

        <div className="modal-footer">
          <button className="modal-btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="modal-btn-submit" onClick={handleSave} disabled={loading}>
            {loading ? "Guardando…" : "Guardar publicación →"}
          </button>
        </div>
      </div>
    </div>
  );
}
