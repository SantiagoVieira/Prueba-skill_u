"use client";

import { useState } from "react";

interface MetaData {
  title:      string;
  desc:       string;
  subject:    string;
  cat:        string;
  university: string;
  price:      string;
}

interface Props {
  onClose:  () => void;
  onSubmit: (data: MetaData) => void;
}

export function PublishMetaModal({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<MetaData>({
    title: "", desc: "", subject: "", cat: "pub", university: "", price: "",
  });

  function set(key: keyof MetaData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  function handleSubmit() {
    if (!form.title.trim()) return;
    onSubmit(form);
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <span className="modal-title">Publicar material académico</span>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Steps */}
          <div>
            <div className="step-row">
              <div className="step-bar done" />
              <div className="step-bar done" />
              <div className="step-bar" />
            </div>
            <p className="step-meta">Paso 2 de 3 — Datos del material (HU-06)</p>
          </div>

          <div className="field-group">
            <label className="field-label">Título del material *</label>
            <input
              className="field-input"
              type="text"
              value={form.title}
              onChange={set("title")}
              placeholder="Ej: Apuntes de Cálculo Diferencial — Semestre 2024-1"
            />
          </div>

          <div className="field-group">
            <label className="field-label">Descripción</label>
            <textarea
              className="field-textarea"
              rows={3}
              value={form.desc}
              onChange={set("desc")}
              placeholder="Describe brevemente el contenido del material..."
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field-group">
              <label className="field-label">Materia</label>
              <input className="field-input" type="text" value={form.subject} onChange={set("subject")} placeholder="Cálculo Diferencial" />
            </div>
            <div className="field-group">
              <label className="field-label">Categoría</label>
              <div className="select-wrap">
                <select className="field-select" value={form.cat} onChange={set("cat")}>
                  <option value="pub">Publicación del material</option>
                  <option value="bus">Búsqueda del material</option>
                  <option value="rec">Recursos</option>
                </select>
              </div>
            </div>
            <div className="field-group">
              <label className="field-label">Universidad</label>
              <input className="field-input" type="text" value={form.university} onChange={set("university")} placeholder="Universidad Nacional" />
            </div>
            <div className="field-group">
              <label className="field-label">Precio (COP)</label>
              <input className="field-input" type="number" value={form.price} onChange={set("price")} placeholder="0 = gratis" min={0} />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="modal-btn-submit" onClick={handleSubmit}>
            Guardar y continuar →
          </button>
        </div>
      </div>
    </div>
  );
}
