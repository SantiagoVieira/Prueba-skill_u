"use client";

import { CATEGORY_MAP, TYPE_THUMB_CLS } from "@/types/material";
import type { Material } from "@/types/material";

// ── Topbar ────────────────────────────────────────────────
export function Topbar({
  title,
  onPublishData,
  onUploadFile,
}: {
  title: string;
  onPublishData: () => void;
  onUploadFile: () => void;
}) {
  return (
    <header className="topbar">
      <span className="topbar-title">{title}</span>
      <div className="topbar-actions">
        <button className="btn-ghost" onClick={onPublishData}>
          Publicar datos
        </button>
        <button className="btn-orange-sm" onClick={onUploadFile}>
          <PlusIcon />
          Subir archivo
        </button>
      </div>
    </header>
  );
}

// ── StatsGrid ─────────────────────────────────────────────
export function StatsGrid({
  total,
  published,
  downloads,
  categories,
}: {
  total: number;
  published: number;
  downloads: number;
  categories: number;
}) {
  const cards = [
    { label: "Total materiales", value: total,      sub: "En tu biblioteca"   },
    { label: "Publicados",       value: published,   sub: "Visibles para todos" },
    { label: "Descargas",        value: downloads,   sub: "Este mes"           },
    { label: "Categorías",       value: categories,  sub: "Temas activos"      },
  ];
  return (
    <div className="stats-grid">
      {cards.map((c) => (
        <div className="stat-card" key={c.label}>
          <div className="stat-card-label">{c.label}</div>
          <div className="stat-card-value">{c.value}</div>
          <div className="stat-card-sub">{c.sub}</div>
        </div>
      ))}
    </div>
  );
}

// ── SearchFilters (HU-10) ─────────────────────────────────
export function SearchFilters({
  search,
  onSearch,
  filterCat,
  onFilterCat,
  filterType,
  onFilterType,
}: {
  search: string;
  onSearch: (v: string) => void;
  filterCat: string;
  onFilterCat: (v: string) => void;
  filterType: string;
  onFilterType: (v: string) => void;
}) {
  return (
    <div className="search-filters">
      <div className="search-wrap">
        <svg className="search-icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar material por palabra clave..."
        />
      </div>

      <div className="select-wrap">
        <select
          className="filter-select"
          value={filterCat}
          onChange={(e) => onFilterCat(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          <option value="pub">Publicación del material</option>
          <option value="bus">Búsqueda del material</option>
          <option value="rec">Recursos</option>
        </select>
      </div>

      <div className="select-wrap">
        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => onFilterType(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <option value="PDF">PDF</option>
          <option value="DOC">DOC</option>
          <option value="IMG">IMG</option>
          <option value="VID">VID</option>
        </select>
      </div>
    </div>
  );
}

// ── MaterialGrid ──────────────────────────────────────────
export function MaterialGrid({
  materials,
  selectedId,
  onSelect,
}: {
  materials: Material[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  if (!materials.length) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        Sin resultados para esa búsqueda
      </div>
    );
  }

  return (
    <div className="materials-grid">
      {materials.map((m) => {
        const cat = CATEGORY_MAP[m.cat];
        return (
          <div
            key={m.id}
            className={`mat-card ${selectedId === m.id ? "selected" : ""}`}
            onClick={() => onSelect(m.id)}
          >
            <div className={`mat-thumb ${TYPE_THUMB_CLS[m.type]}`}>
              <TypeIcon type={m.type} />
            </div>
            <span className={`badge ${cat.cls}`}>{cat.label}</span>
            <p className="mat-title">{m.title}</p>
            <div className="mat-meta">
              <UserIcon /> {m.author}
              &nbsp;·&nbsp;
              <DownIcon /> {m.downloads}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── DetailPanel (HU-11) ───────────────────────────────────
export function DetailPanel({
  material: m,
  onClose,
}: {
  material: Material;
  onClose: () => void;
}) {
  const cat = CATEGORY_MAP[m.cat];
  const rows: [string, string][] = [
    ["Tipo de archivo", m.type],
    ["Tamaño",          m.size],
    ["Materia",         m.subject],
    ["Universidad",     m.uni],
    ["Publicado",       m.date],
    ["Descargas",       String(m.downloads)],
  ];

  return (
    <div className="detail-panel">
      <div className="detail-top">
        <div>
          <span className={`badge ${cat.cls}`}>{cat.label}</span>
          <h3 className="detail-title">{m.title}</h3>
          <p className="detail-author">Por {m.author}</p>
        </div>
        <button className="detail-close" onClick={onClose} aria-label="Cerrar">
          <svg viewBox="0 0 24 24">
            <line x1="18" y1="6"  x2="6"  y2="18" />
            <line x1="6"  y1="6"  x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="detail-sep" />

      {rows.map(([label, value]) => (
        <div key={label} className="detail-row">
          <span className="detail-row-lbl">{label}</span>
          <span className="detail-row-val">{value}</span>
        </div>
      ))}

      <div className="detail-sep" />
      <p className="detail-desc">{m.desc}</p>

      <button className="btn-download">
        <svg viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Descargar material
      </button>
    </div>
  );
}

// ── Icon helpers ──────────────────────────────────────────
function PlusIcon() {
  return (
    <svg
      width="13" height="13"
      viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5"  y1="12" x2="19" y2="12" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="11" height="11"
      viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function DownIcon() {
  return (
    <svg
      width="11" height="11"
      viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function TypeIcon({ type }: { type: string }) {
  if (type === "IMG") {
    return (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    );
  }
  if (type === "VID") {
    return (
      <svg viewBox="0 0 24 24">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    );
  }
  // PDF / DOC
  return (
    <svg viewBox="0 0 24 24">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  );
}