"use client";

import { useState } from "react";

interface Props {
  onClose:  () => void;
  onSubmit: () => void;
}

export function UploadFileModal({ onClose, onSubmit }: Props) {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileType, setFileType] = useState("Apuntes de clase");

  function handleFile(file: File) {
    setFileName(file.name);
    setFileSize((file.size / 1_048_576).toFixed(1) + " MB");
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.currentTarget.classList.remove("over");
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <span className="modal-title">Subir archivo digital</span>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Steps */}
          <div>
            <div className="step-row">
              <div className="step-bar done" />
              <div className="step-bar" />
              <div className="step-bar" />
            </div>
            <p className="step-meta">Paso 1 de 3 — Subir archivo (HU-07)</p>
          </div>

          {/* Drop zone */}
          <div
            className="drop-zone"
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("over"); }}
            onDragLeave={(e) => e.currentTarget.classList.remove("over")}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-inp")?.click()}
          >
            <div className="drop-zone-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="drop-zone-text">
              <strong>Haz clic o arrastra</strong> tu archivo aquí<br />
              PDF, DOC, DOCX, JPG, PNG, MP4 · Máx 50 MB
            </p>
            <input
              id="file-inp"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {/* File chip */}
          {fileName && (
            <div className="file-chip">
              <svg viewBox="0 0 24 24">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              <span className="file-chip-name">{fileName}</span>
              <span className="file-chip-size">{fileSize}</span>
            </div>
          )}

          {/* Type selector */}
          <div className="field-group">
            <label className="field-label">Tipo de material</label>
            <div className="select-wrap">
              <select
                className="field-select"
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
              >
                <option>Apuntes de clase</option>
                <option>Parcial resuelto</option>
                <option>Taller / Guía</option>
                <option>Resumen</option>
                <option>Presentación</option>
                <option>Otro</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="modal-btn-submit" onClick={onSubmit}>
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
