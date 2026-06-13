import { spawn } from 'child_process';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const command = searchParams.get('command');
    const project = searchParams.get('project') || '';
    const status = searchParams.get('status') || '';

    if (!command) {
      return new Response(JSON.stringify({ error: 'Parâmetro command é obrigatório' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let scriptPath = '';
    let args: string[] = [];
    const pythonPath = 'python'; // Executável Python no Windows

    switch (command) {
      case 'sync_proposal':
        scriptPath = 'scripts/sync_proposal.py';
        args = ['--mode', 'project'];
        if (project) {
          args.push('--project-name', project);
        }
        if (status) {
          args.push('--status', status);
        }
        break;
      case 'update_metrics':
        scriptPath = 'scripts/operacional/update_global_dashboard_final.py';
        break;
      case 'process_financials':
        scriptPath = 'scripts/operacional/process_financials.py';
        break;
      case 'audit_vault':
        scriptPath = 'scripts/operacional/full_oracle_deep_dive.py';
        break;
      case 'sync_vault':
        scriptPath = 'scripts/sync_vault_core.py';
        break;
      default:
        return new Response(JSON.stringify({ error: 'Comando inválido/não reconhecido' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }

    const responseStream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        const sendLog = (text: string) => {
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ log: text })}\n\n`));
          } catch (e) {
            // Stream pode ter sido fechado pelo cliente
          }
        };

        sendLog(`🚀 Iniciando automação do Oráculo: [${command}]`);
        sendLog(`📂 Script: ${scriptPath} ${args.join(' ')}`);

        const process = spawn(pythonPath, [scriptPath, ...args], {
          cwd: 'C:\\Users\\User\\Documents\\ORACULO - FIRMA ABACAXI'
        });

        process.stdout.on('data', (data) => {
          const lines = data.toString().split('\n');
          lines.forEach((line: string) => {
            const clean = line.replace(/[\r\n]/g, '').trim();
            if (clean) sendLog(clean);
          });
        });

        process.stderr.on('data', (data) => {
          const lines = data.toString().split('\n');
          lines.forEach((line: string) => {
            const clean = line.replace(/[\r\n]/g, '').trim();
            if (clean) sendLog(`⚠️ ${clean}`);
          });
        });

        process.on('close', (code) => {
          sendLog(`🏁 Processo concluído com código de saída: ${code}`);
          controller.close();
        });

        process.on('error', (err) => {
          sendLog(`❌ Falha crítica ao iniciar script: ${err.message}`);
          controller.close();
        });
      }
    });

    return new Response(responseStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Erro na API Agents SSE:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
