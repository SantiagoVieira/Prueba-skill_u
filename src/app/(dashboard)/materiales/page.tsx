"use client";
import { useState, useMemo } from "react";
import {
  Topbar,
  StatsGrid,
  SearchFilters,
  MaterialGrid,
  DetailPanel,
} from "@/components/dashboard/dashboardComponents";
import { UploadFileModal }   from "@/components/dashboard/UploadFileModal";
import { PublishMetaModal }  from "@/components/dashboard/PublishMetaModal";
import { Toast }             from "@/components/ui/Toast";
import { MOCK_MATERIALS }    from "@/lib/mockMaterials";
import type { Material }     from "@/types/material";

export default function MaterialesPage() {
  const [materials,  setMaterials]  = useState<Material[]>(MOCK_MATERIALS);
  const [search,     setSearch]     = useState("");
  const [filterCat,  setFilterCat]  = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showMeta,   setShowMeta]   = useState(false);
  const [toast,      setToast]      = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return materials.filter((m) =>
      (!q || m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q) || m.author.toLowerCase().includes(q)) &&
      (!filterCat  || m.cat  === filterCat)  &&
      (!filterType || m.type === filterType)
    );
  }, [materials, search, filterCat, filterType]);

  const selected = materials.find((m) => m.id === selectedId) ?? null;

  function showToastMsg(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3200);
  }

  function handleFileSubmit() {
    setShowUpload(false);
    showToastMsg("Archivo subido. Completa los datos para publicar.");
    setTimeout(() => setShowMeta(true), 700);
  }

  function handleMetaSubmit(data: {
    title: string; desc: string; subject: string; cat: string; university: string;
  }) {
    const next: Material = {
      id:        materials.length + 1,
      title:     data.title,
      cat:       data.cat as Material["cat"],
      type:      "PDF",
      subject:   data.subject   || "General",
      uni:       data.university || "Mi Universidad",
      author:    "Tú",
      date:      "Hoy",
      size:      "—",
      desc:      data.desc || "Nuevo material publicado.",
      downloads: 0,
    };
    setMaterials((prev) => [next, ...prev]);
    setShowMeta(false);
    showToastMsg("¡Material publicado exitosamente!");
  }

  return (
    <>
      <Topbar
        title="Material académico"
        onPublishData={() => setShowMeta(true)}
        onUploadFile={() => setShowUpload(true)}
      />

      <div className="dash-content">
        <StatsGrid
          total={materials.length}
          published={materials.length - 2}
          downloads={341}
          categories={4}
        />

        <SearchFilters
          search={search}      onSearch={setSearch}
          filterCat={filterCat}  onFilterCat={setFilterCat}
          filterType={filterType} onFilterType={setFilterType}
        />

        <div>
          <div className="section-header">
            <span className="section-title">Resultados</span>
            <span className="section-count">
              {filtered.length} material{filtered.length !== 1 ? "es" : ""}
            </span>
          </div>
          <MaterialGrid
            materials={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        {selected && (
          <DetailPanel
            material={selected}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>

      {showUpload && (
        <UploadFileModal
          onClose={() => setShowUpload(false)}
          onSubmit={handleFileSubmit}
        />
      )}

      {showMeta && (
        <PublishMetaModal
          onClose={() => setShowMeta(false)}
          onSubmit={handleMetaSubmit}
        />
      )}

      {toast && <Toast message={toast} />}
    </>
  );
}
