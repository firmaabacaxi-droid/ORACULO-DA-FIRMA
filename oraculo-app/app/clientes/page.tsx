import Link from "next/link";
import { getClientes } from '@/lib/notion';

export const dynamic = 'force-dynamic';

export default async function ClientesPage() {
  const clientes = await getClientes();

  return (
    <div className="table-card" style={{ padding: '0px' }}>
      <table className="oraculo-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Razão Social</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Segmento</th>
          </tr>
        </thead>
        <tbody>
          {clientes?.map((cli: any) => (
            <tr key={cli.id}>
              <td>
                <Link href={`/clientes/${cli.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <strong>🏢 {cli.nome}</strong>
                </Link>
              </td>
              <td style={{ color: 'var(--text-dim)' }}>{cli.empresa || '--'}</td>
              <td>{cli.email || '--'}</td>
              <td style={{ color: 'var(--text-dim)' }}>{cli.telefone || '--'}</td>
              <td>
                {cli.tags && Array.isArray(cli.tags) && cli.tags.map((tag: string) => (
                  <span key={tag} className="badge badge-gray" style={{ marginRight: '8px' }}>
                    {tag}
                  </span>
                ))}
              </td>
            </tr>
          ))}
          {(!clientes || clientes.length === 0) && (
             <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Nenhum cliente encontrado.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

