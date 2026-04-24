import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skill_u — Política de Tratamiento de Datos Personales",
};

export default function TratamientoDatosPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#fafafa",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Header */}
      <header style={{
        background: "#0f0f0f",
        padding: "18px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/login" style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 20, fontWeight: 700,
          color: "white", textDecoration: "none",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Skill<span style={{ color: "#f97316" }}>_u</span>
        </Link>
        <Link href="/register" style={{
          fontSize: 12, color: "#9ca3af", textDecoration: "none",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          ← Volver al registro
        </Link>
      </header>

      {/* Content */}
      <main style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "48px 24px 80px",
      }}>
        {/* Title */}
        <div style={{ marginBottom: 40 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#f97316",
            background: "#fff3e8", borderRadius: 4, padding: "3px 10px",
            display: "inline-block", marginBottom: 14,
          }}>
            Política de Privacidad
          </span>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 32, fontWeight: 700,
            color: "#0f0f0f", lineHeight: 1.2,
            margin: "0 0 12px",
          }}>
            Política de Tratamiento de Datos Personales
          </h1>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
            Última actualización: abril de 2025 · Conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

          <Section title="1. Responsable del Tratamiento">
            <p>
              <strong>Skill_u</strong> (en adelante "la Plataforma") es responsable del tratamiento
              de los datos personales recopilados a través de su plataforma web. Para cualquier
              consulta relacionada con el tratamiento de sus datos puede contactarnos a través de
              los canales oficiales dispuestos en la plataforma.
            </p>
          </Section>

          <Section title="2. Marco Legal">
            <p>
              El tratamiento de datos personales en Skill_u se rige por la{" "}
              <strong>Ley Estatutaria 1581 de 2012</strong> (Ley de Protección de Datos Personales
              de Colombia), el <strong>Decreto Reglamentario 1377 de 2013</strong>, y demás normas
              concordantes. Todos los usuarios tienen garantizados los derechos consagrados en
              dicha normativa.
            </p>
          </Section>

          <Section title="3. Datos Personales Recopilados">
            <p>Skill_u recopila y trata las siguientes categorías de datos personales:</p>
            <ul>
              <li><strong>Datos de identificación:</strong> nombre, apellido y correo electrónico institucional.</li>
              <li><strong>Datos académicos:</strong> carrera o programa universitario.</li>
              <li><strong>Datos de uso:</strong> materiales publicados, comprados y calificaciones otorgadas.</li>
              <li><strong>Datos de transacción:</strong> información de pagos procesados a través de Stripe (la plataforma no almacena datos de tarjetas de crédito).</li>
            </ul>
          </Section>

          <Section title="4. Finalidades del Tratamiento">
            <p>Los datos personales recopilados serán utilizados para las siguientes finalidades:</p>
            <ul>
              <li>Gestionar el registro, autenticación y acceso a la plataforma.</li>
              <li>Facilitar la compra, venta y descarga de materiales académicos.</li>
              <li>Procesar pagos y gestionar transacciones económicas.</li>
              <li>Mostrar calificaciones y reseñas entre usuarios (con opción de anonimato).</li>
              <li>Enviar comunicaciones relacionadas con el uso de la plataforma.</li>
              <li>Cumplir con obligaciones legales y requerimientos de autoridades competentes.</li>
              <li>Mejorar los servicios mediante análisis estadísticos anonimizados.</li>
            </ul>
          </Section>

          <Section title="5. Derechos del Titular">
            <p>
              De conformidad con la Ley 1581 de 2012, como titular de los datos personales usted tiene derecho a:
            </p>
            <ul>
              <li><strong>Conocer</strong> los datos personales que tenemos sobre usted.</li>
              <li><strong>Actualizar y rectificar</strong> sus datos cuando sean inexactos o incompletos.</li>
              <li><strong>Solicitar prueba</strong> de la autorización otorgada para el tratamiento.</li>
              <li><strong>Ser informado</strong> sobre el uso que se ha dado a sus datos personales.</li>
              <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.</li>
              <li><strong>Revocar la autorización</strong> y/o solicitar la supresión de sus datos, siempre que no exista un deber legal o contractual que lo impida.</li>
              <li><strong>Acceder gratuitamente</strong> a sus datos personales que hayan sido objeto de tratamiento.</li>
            </ul>
          </Section>

          <Section title="6. Transferencia y Transmisión de Datos">
            <p>
              Skill_u podrá compartir datos personales con terceros proveedores de servicios
              estrictamente necesarios para la operación de la plataforma, entre ellos:
            </p>
            <ul>
              <li><strong>Supabase Inc.</strong> — proveedor de base de datos y autenticación.</li>
              <li><strong>Stripe Inc.</strong> — procesador de pagos. Los datos de pago se rigen por la política de privacidad de Stripe.</li>
              <li><strong>Vercel Inc.</strong> — proveedor de infraestructura de despliegue.</li>
            </ul>
            <p>
              Estos proveedores están obligados contractualmente a garantizar niveles adecuados
              de protección de datos personales.
            </p>
          </Section>

          <Section title="7. Seguridad de los Datos">
            <p>
              Skill_u implementa medidas técnicas y organizativas apropiadas para proteger
              los datos personales contra accesos no autorizados, pérdida, destrucción o
              alteración. Las contraseñas son almacenadas mediante cifrado y los datos se
              transmiten a través de conexiones HTTPS seguras.
            </p>
          </Section>

          <Section title="8. Conservación de los Datos">
            <p>
              Los datos personales serán conservados durante el tiempo que el usuario mantenga
              una cuenta activa en la plataforma y, posteriormente, por el tiempo necesario
              para cumplir con obligaciones legales o resolver disputas pendientes.
            </p>
          </Section>

          <Section title="9. Datos de Menores de Edad">
            <p>
              Skill_u está dirigida exclusivamente a estudiantes universitarios mayores de edad.
              No recopilamos conscientemente datos personales de menores de 18 años. Si detectamos
              que un menor ha proporcionado datos personales, procederemos a eliminarlos de
              inmediato.
            </p>
          </Section>

          <Section title="10. Modificaciones a esta Política">
            <p>
              Skill_u se reserva el derecho de modificar esta política en cualquier momento.
              Los cambios serán notificados a los usuarios registrados y publicados en esta
              página con indicación de la fecha de actualización. El uso continuado de la
              plataforma tras la notificación implica la aceptación de los cambios.
            </p>
          </Section>

          <Section title="11. Autorización">
            <p>
              Al marcar la casilla de aceptación durante el proceso de registro, el usuario
              manifiesta de forma libre, expresa e informada su autorización para que Skill_u
              trate sus datos personales conforme a las finalidades descritas en esta política,
              en cumplimiento del artículo 9 de la Ley 1581 de 2012.
            </p>
          </Section>

        </div>

        {/* Back button */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #e5e7eb" }}>
          <Link
            href="/register"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#f97316", color: "white",
              borderRadius: 8, padding: "10px 20px",
              fontSize: 13, fontWeight: 600, textDecoration: "none",
              transition: "background 0.15s",
            }}
          >
            ← Volver al registro
          </Link>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 16, fontWeight: 700,
        color: "#0f0f0f", marginBottom: 12,
        paddingBottom: 8,
        borderBottom: "2px solid #f97316",
        display: "inline-block",
      }}>
        {title}
      </h2>
      <div style={{
        fontSize: 14, color: "#374151", lineHeight: 1.75,
      }}>
        {children}
      </div>
    </section>
  );
}