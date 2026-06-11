import Link from "next/link";
import { getContatos } from '@/lib/notion';

export const dynamic = 'force-dynamic';

export default async function ContatosPage() {
  const contatos = await getContatos();

  return (
    <div className="table-card" style={{ padding: '0px' }}>
      <table className="oraculo-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Função Principal</th>
            <th>E-mail</th>
            <th>Telefone/WhatsApp</th>
            <th>Cliente Vinculado</th>
          </tr>
        </thead>
        <tbody>
          {contatos?.map((c: any) => (
            <tr key={c.id}>
              <td>
                <Link href={`/contatos/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <strong>👤 {c.nome}</strong>
                </Link>
              </td>
              <td>
                <span className="badge badge-gold">{c.cargo || 'Membro'}</span>
              </td>
              <td>{c.email || '--'}</td>
              <td style={{ color: 'var(--text-dim)' }}>{c.telefone || '--'}</td>
              <td style={{ color: 'var(--text-dim)' }}>
                {c.clientes?.id ? (
                  <Link href={`/clientes/${c.clientes.id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                    🏢 {c.clientes.nome}
                  </Link>
                ) : (
                  c.clientes?.nome || '--'
                )}
              </td>
            </tr>
          ))}
          {(!contatos || contatos.length === 0) && (
             <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Nenhum contato encontrado.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

