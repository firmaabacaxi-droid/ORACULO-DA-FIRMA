import { getAllProjects } from '@/lib/notion';
import ClientProjetos from './ClientProjetos';

export const dynamic = 'force-dynamic';

export default async function ProjetosPage() {
  const projetos = await getAllProjects();

  return (
    <div style={{ padding: '0px' }}>
      <ClientProjetos initialProjetos={projetos} />
    </div>
  );
}
