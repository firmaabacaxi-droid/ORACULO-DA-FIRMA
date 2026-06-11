import Link from "next/link";
import { getClientDetail } from "@/lib/notion";

export const dynamic = "force-dynamic";

function R$(val: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val ?? 0);
}

function dt(val: string) {
  if (!val) return "—";
  return new Date(val).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientDetail(id);

  if (!client) {
    return (
      <div className="content-area" style={{ textAlign: "center", paddingTop: "80px", color: "var(--text-dim)" }}>
        Cliente não encontrado no Notion.
      </div>
    );
  }

  // NPS color mapping
  const getNpsBadgeColor = (nps: string) => {
    if (["Promotor", "9", "10", "Excelente"].includes(nps)) return "green";
    if (["Neutro", "7", "8", "Bom"].includes(nps)) return "gold";
    if (["Detrator", "Crítico", "Regular", "Ruim"].includes(nps)) return "red";
    return "gray";
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 10px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "13px" }}>
        <Link href="/clientes" style={{ color: "var(--text-dim)", textDecoration: "none" }}>Clientes</Link>
        <span style={{ color: "var(--text-muted)" }}>›</span>
        <span style={{ color: "var(--text)" }}>{client.nome}</span>
      </div>

      {/* Hero Card */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        borderTop: "3px solid var(--blue)",
        padding: "24px 28px",
        marginBottom: "24px",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                #{String(client.auto_id).padStart(3, "0")} · {client.segmento}
              </span>
              <span className="badge badge-gray">{client.segmento}</span>
              {client.nps !== "—" && (
                <span className={`badge badge-${getNpsBadgeColor(client.nps)}`}>
                  NPS: {client.nps}
                </span>
              )}
            </div>

            <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.5px" }}>
              🏢 {client.nome}
            </h1>
            {client.empresa && client.empresa !== client.nome && (
              <h2 style={{ fontSize: "16px", color: "var(--text-dim)", fontWeight: 500, marginBottom: "0px" }}>
                {client.empresa}
              </h2>
            )}
          </div>

          <div style={{ textAlign: "right", minWidth: "180px" }}>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
              Projetos Vinculados
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--gold)" }}>
              {client.projetos?.length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Details & Notes */}
      <div className="grid-2" style={{ marginBottom: "24px" }}>
        <div className="card">
          <div className="card-title">📞 Informações de Contato</div>
          <div className="detail-row">
            <div className="detail-label">E-mail</div>
            <div className="detail-value">{client.email || "—"}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">Telefone</div>
            <div className="detail-value">{client.telefone || "—"}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">CNPJ/CPF</div>
            <div className="detail-value">{client.cnpj_cpf || "—"}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">Endereço</div>
            <div className="detail-value" style={{ fontSize: "12px" }}>{client.endereco || "—"}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">📝 Observações & Relação</div>
          <div style={{ color: "var(--text-dim)", fontSize: "13px", lineHeight: "1.7", minHeight: "100px" }}>
            {client.observacoes || "Nenhuma observação ou restrição especial registrada para este cliente no Notion."}
          </div>
        </div>
      </div>

      {/* Related Content Tabs/Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Section: Projetos */}
        <div>
          <div className="section-header">
            <h3 className="section-title">🎬 Obras / Projetos Realizados</h3>
          </div>
          <div className="table-card" style={{ padding: "0px" }}>
            <table className="oraculo-table">
              <thead>
                <tr>
                  <th>Nome do Projeto</th>
                  <th>Status</th>
                  <th>Valor Contratado</th>
                  <th>Entrega</th>
                </tr>
              </thead>
              <tbody>
                {client.projetos?.map((prj: any) => (
                  <tr key={prj.id}>
                    <td>
                      <Link href={`/projetos/${prj.id}`} style={{ textDecoration: "none", color: "inherit", fontWeight: 600 }} className="project-name-sm">
                        {prj.titulo}
                      </Link>
                    </td>
                    <td>
                      <span className={`badge badge-${["Concluído", "Finalizado"].includes(prj.status) ? "green" : "orange"}`}>
                        {prj.status}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: "var(--gold)" }}>{prj.valor ? R$(prj.valor) : "—"}</td>
                    <td style={{ color: "var(--text-dim)" }}>{dt(prj.entrega)}</td>
                  </tr>
                ))}
                {(!client.projetos || client.projetos.length === 0) && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "2rem", color: "var(--text-dim)" }}>
                      Nenhum projeto ativo ou concluído associado a este cliente no Notion.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Columns: Proposals and Key Contacts */}
        <div className="grid-2">
          {/* Section: Proposals */}
          <div>
            <div className="section-header">
              <h3 className="section-title">📄 Propostas Comerciais</h3>
            </div>
            <div className="table-card" style={{ padding: "0px" }}>
              <table className="oraculo-table">
                <thead>
                  <tr>
                    <th>Proposta</th>
                    <th>Valor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {client.propostas?.map((prop: any) => (
                    <tr key={prop.id}>
                      <td style={{ fontWeight: 600 }}>{prop.nome}</td>
                      <td style={{ color: "var(--gold)" }}>{R$(prop.valor)}</td>
                      <td>
                        <span className={`badge badge-${prop.status === "Aprovada" ? "green" : "orange"}`}>
                          {prop.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!client.propostas || client.propostas.length === 0) && (
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center", padding: "2rem", color: "var(--text-dim)" }}>
                        Nenhuma proposta cadastrada no Notion.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Related Contacts */}
          <div>
            <div className="section-header">
              <h3 className="section-title">👥 Contatos Internos</h3>
            </div>
            <div className="table-card" style={{ padding: "0px" }}>
              <table className="oraculo-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>E-mail / Telefone</th>
                  </tr>
                </thead>
                <tbody>
                  {client.contatos?.map((ctt: any) => (
                    <tr key={ctt.id}>
                      <td>
                        <Link href={`/contatos/${ctt.id}`} style={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}>
                          {ctt.nome}
                        </Link>
                      </td>
                      <td>
                        <span className="badge badge-gold">{ctt.cargo}</span>
                      </td>
                      <td style={{ fontSize: "11px", color: "var(--text-dim)" }}>
                        <div>{ctt.email || "—"}</div>
                        <div style={{ color: "var(--text-muted)", marginTop: "2px" }}>{ctt.telefone || "—"}</div>
                      </td>
                    </tr>
                  ))}
                  {(!client.contatos || client.contatos.length === 0) && (
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center", padding: "2rem", color: "var(--text-dim)" }}>
                        Nenhum contato cadastrado no Notion para este cliente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
