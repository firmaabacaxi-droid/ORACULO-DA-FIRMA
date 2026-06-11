import Link from "next/link";
import { getContactDetail } from "@/lib/notion";

export const dynamic = "force-dynamic";

function R$(val: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val ?? 0);
}

function dt(val: string) {
  if (!val) return "—";
  return new Date(val).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contact = await getContactDetail(id);

  if (!contact) {
    return (
      <div className="content-area" style={{ textAlign: "center", paddingTop: "80px", color: "var(--text-dim)" }}>
        Contato não encontrado no Notion.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 10px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "13px" }}>
        <Link href="/contatos" style={{ color: "var(--text-dim)", textDecoration: "none" }}>Contatos</Link>
        <span style={{ color: "var(--text-muted)" }}>›</span>
        <span style={{ color: "var(--text)" }}>{contact.nome}</span>
      </div>

      {/* Hero Card */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        borderTop: "3px solid var(--gold)",
        padding: "24px 28px",
        marginBottom: "24px",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                #{String(contact.auto_id).padStart(3, "0")} · {contact.tipo}
              </span>
              <span className="badge badge-gold">{contact.cargo || "Membro"}</span>
              <span className="badge badge-gray">{contact.tipo}</span>
            </div>

            <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.5px" }}>
              👤 {contact.nome}
            </h1>
            {contact.cliente && (
              <div style={{ fontSize: "13px", color: "var(--text-dim)" }}>
                🏢 Vinculado a:{" "}
                <Link href={`/clientes/${contact.cliente.id}`} style={{ color: "var(--gold)", fontWeight: 600, textDecoration: "none" }}>
                  {contact.cliente.nome}
                </Link>
              </div>
            )}
          </div>

          {/* Highlights */}
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {contact.valorDiaria > 0 && (
              <div style={{ textAlign: "right", minWidth: "120px" }}>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                  Valor da Diária
                </div>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--gold)" }}>
                  {R$(contact.valorDiaria)}
                </div>
              </div>
            )}
            <div style={{ textAlign: "right", minWidth: "120px" }}>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                Histórico Obras
              </div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--text)" }}>
                {contact.historicoFirma || contact.projetos?.length || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid-2" style={{ marginBottom: "24px" }}>
        {/* Contact Info Card */}
        <div className="card">
          <div className="card-title">📞 Detalhes de Contato & Financeiro</div>
          <div className="detail-row">
            <div className="detail-label">E-mail</div>
            <div className="detail-value">{contact.email || "—"}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">Telefone</div>
            <div className="detail-value">{contact.telefone || "—"}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">CPF</div>
            <div className="detail-value">{contact.cpf || "—"}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">PIX chave</div>
            <div className="detail-value" style={{ fontFamily: "monospace", color: "var(--gold)" }}>{contact.pix || "—"}</div>
          </div>
          {contact.portfolio && (
            <div className="detail-row">
              <div className="detail-label">Portfolio</div>
              <div className="detail-value">
                <a href={contact.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)", textDecoration: "underline" }}>
                  Acessar Portfolio ↗
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Dietary / Special Observations */}
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div className="card-title">🥗 Restrição Alimentar</div>
            <div style={{
              background: contact.restricoes ? "rgba(239, 68, 68, 0.08)" : "var(--surface2)",
              border: contact.restricoes ? "1px dashed rgba(239, 68, 68, 0.3)" : "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "12px 16px",
              color: contact.restricoes ? "var(--red)" : "var(--text-dim)",
              fontSize: "13px",
              lineHeight: "1.6",
              fontWeight: contact.restricoes ? 600 : 400,
            }}>
              {contact.restricoes ? `⚠️ Restrição registrada: ${contact.restricoes}` : "Nenhuma restrição alimentar informada para este contato."}
            </div>
          </div>

          <div>
            <div className="card-title">📝 Notas & Anotações</div>
            <div style={{ color: "var(--text-dim)", fontSize: "13px", lineHeight: "1.7" }}>
              {contact.observacoes || "Nenhuma observação interna registrada no Notion."}
            </div>
          </div>
        </div>
      </div>

      {/* Relações: Projetos e Tarefas */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Projetos Vinculados */}
        <div>
          <div className="section-header">
            <h3 className="section-title">🎬 Obras com Participação</h3>
          </div>
          <div className="table-card" style={{ padding: "0px" }}>
            <table className="oraculo-table">
              <thead>
                <tr>
                  <th>Obra / Projeto</th>
                  <th>Status</th>
                  <th>Data de Entrega</th>
                </tr>
              </thead>
              <tbody>
                {contact.projetos?.map((prj: any) => (
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
                    <td style={{ color: "var(--text-dim)" }}>{dt(prj.entrega)}</td>
                  </tr>
                ))}
                {(!contact.projetos || contact.projetos.length === 0) && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center", padding: "2rem", color: "var(--text-dim)" }}>
                      Nenhum projeto associado a este contato no Notion.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tarefas Atribuídas */}
        <div>
          <div className="section-header">
            <h3 className="section-title">📋 Tarefas Atribuídas</h3>
          </div>
          <div className="table-card" style={{ padding: "0px" }}>
            <table className="oraculo-table">
              <thead>
                <tr>
                  <th>Tarefa</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Prazo</th>
                </tr>
              </thead>
              <tbody>
                {contact.tarefas?.map((t: any) => {
                  const done = ["Concluída", "Concluido"].includes(t.status);
                  return (
                    <tr key={t.id}>
                      <td style={{ fontWeight: 500, textDecoration: done ? "line-through" : "none", color: done ? "var(--text-dim)" : "var(--text)" }}>
                        {t.titulo}
                      </td>
                      <td>
                        <span className={`badge badge-${t.prioridade === "Urgente" ? "red" : t.prioridade === "Alta" ? "orange" : "gray"}`}>
                          {t.prioridade}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${done ? "green" : t.status === "Em andamento" ? "orange" : "gray"}`}>
                          {t.status}
                        </span>
                      </td>
                      <td style={{ color: "var(--text-dim)", fontSize: "12px" }}>{dt(t.prazo)}</td>
                    </tr>
                  );
                })}
                {(!contact.tarefas || contact.tarefas.length === 0) && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "2rem", color: "var(--text-dim)" }}>
                      Nenhuma tarefa atribuída a este contato no Notion.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
