"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  onClose:    () => void;
  onAccepted: () => void;
}

export function SellerModal({ onClose, onAccepted }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleAccept() {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await supabase
      .from("profiles")
      .update({ is_seller: true })
      .eq("id", session.user.id);

    window.dispatchEvent(new CustomEvent("seller-activated"));
    onAccepted();
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <span className="modal-title">Términos para vendedores</span>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div style={{
            background: "var(--gray-50)", border: "1px solid var(--gray-200)",
            borderRadius: 8, padding: "16px", fontSize: 12,
            color: "var(--gray-600)", lineHeight: 1.8, maxHeight: 320, overflowY: "auto"
          }}>

            <p style={{ fontWeight: 700, fontSize: 13, color: "var(--gray-900)", marginBottom: 4 }}>
              Términos de servicio para vendedores en SkillU
            </p>
            <p style={{ marginBottom: 12 }}>
              Para los vendedores en SkillU, las reglas son claras: la plataforma es un entorno académico
              responsable y ético donde solo se permite el comercio de material intelectual legítimo.
            </p>

            <p style={{ fontWeight: 700, color: "var(--gray-800)", marginBottom: 6 }}>
              1. Compromiso de Originalidad y Autoría
            </p>
            <p style={{ marginBottom: 6 }}>
              Todo material cargado en la plataforma debe ser una creación original y de tu autoría exclusiva.
            </p>
            <p style={{ marginBottom: 4 }}>
              <strong>Prohibición de Contenido Ajeno:</strong> Queda estrictamente prohibido vender, distribuir
              o comercializar contenido que no haya sido desarrollado por ti, incluyendo libros, revistas o
              fragmentos de obras protegidas por derechos de autor sin la debida autorización.
            </p>
            <p style={{ marginBottom: 4 }}>
              <strong>Material de Docentes:</strong> No está permitido bajo ninguna circunstancia publicar,
              vender o distribuir exámenes, parciales o material didáctico exclusivo elaborado por docentes
              o instituciones educativas.
            </p>
            <p style={{ marginBottom: 12 }}>
              <strong>Fraude y Citación:</strong> Cualquier uso de fuentes externas debe estar debidamente
              citado siguiendo estándares académicos internacionales. El plagio, el fraude o la presentación
              de ideas ajenas como propias es causa de expulsión inmediata de la plataforma.
            </p>

            <p style={{ fontWeight: 700, color: "var(--gray-800)", marginBottom: 6 }}>
              2. Rol del Curador y Verificación
            </p>
            <p style={{ marginBottom: 6 }}>
              La figura del curador es la autoridad encargada de validar que el material cumpla con los
              estándares de calidad y legalidad exigidos por SkillU.
            </p>
            <p style={{ marginBottom: 4 }}>
              <strong>Validación Previa:</strong> Todo contenido publicado está sujeto a revisión por parte
              del curador. Si el material no cumple con los requisitos de originalidad o viola la propiedad
              intelectual, el curador tiene la facultad de denegar su publicación.
            </p>
            <p style={{ marginBottom: 4 }}>
              <strong>Facultades de Remoción:</strong> Ante cualquier denuncia de plagio, uso indebido de
              material docente o fraude, el curador tiene la potestad de retirar el contenido de forma
              inmediata y preventiva mientras se realiza la investigación pertinente.
            </p>
            <p style={{ marginBottom: 12 }}>
              <strong>Responsabilidad del Vendedor:</strong> Al publicar en la plataforma, declaras bajo
              gravedad de juramento ser el único titular de los derechos de explotación sobre el material.
              En caso de reclamos legales de terceros, el vendedor asume la responsabilidad exclusiva por
              la infracción cometida, eximiendo a SkillU de cualquier daño derivado de dicha acción.
            </p>

            <p style={{ fontWeight: 700, color: "var(--gray-800)", marginBottom: 6 }}>
              3. Obligaciones y Conducta
            </p>
            <p style={{ marginBottom: 6 }}>
              El vendedor se compromete a mantener la integridad de la comunidad universitaria.
            </p>
            <p style={{ marginBottom: 4 }}>
              <strong>Uso de la Plataforma:</strong> El servicio debe utilizarse exclusivamente para el
              intercambio de materiales de estudio legítimos.
            </p>
            <p style={{ marginBottom: 4 }}>
              <strong>Cumplimiento Normativo:</strong> Debes cumplir con las leyes de propiedad intelectual
              vigentes en Colombia (Ley 23 de 1982 y normas complementarias).
            </p>
            <p>
              <strong>Sanciones:</strong> Cualquier incumplimiento de estas normas faculta a SkillU para
              suspender permanentemente tu cuenta, retener pagos pendientes relacionados con material ilícito
              y, si la ley lo requiere, colaborar con las autoridades competentes.
            </p>

          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="modal-btn-submit" onClick={handleAccept} disabled={loading}>
            {loading ? "Activando…" : "Acepto — Quiero vender"}
          </button>
        </div>
      </div>
    </div>
  );
}