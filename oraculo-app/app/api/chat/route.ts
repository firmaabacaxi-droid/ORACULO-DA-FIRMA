import { NextResponse } from 'next/server';
import { createTask, updateProjectStatus } from '@/lib/notion';
import fs from 'fs';
import path from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const VAULT_PATH = 'C:\\Users\\User\\Documents\\ORACULO - FIRMA ABACAXI\\cerebro\\CEREBRO-ORACULO\\04-PROJETOS-ATIVOS';

// Auxiliar para slugificar o título do projeto
function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Encontra a pasta do projeto
function getProjectFolderPath(projectNumber: string | number, projectTitle: string): string {
  const prefix = `FIRMA-${String(projectNumber).padStart(2, '0')}`;
  const folderName = `${prefix}-${slugify(projectTitle)}`;
  return path.join(VAULT_PATH, folderName);
}

// Definição dos schemas das ferramentas que a IA pode chamar
const TOOLS = [
  {
    type: "function",
    function: {
      name: "create_project_task",
      description: "Cria uma nova tarefa para o projeto atual no Notion.",
      parameters: {
        type: "object",
        properties: {
          titulo: { type: "string", description: "Título da tarefa (ex: 'Fazer decupagem técnica')" },
          prioridade: { type: "string", enum: ["Urgente", "Alta", "Média", "Baixa"], description: "Prioridade da tarefa" },
          prazo: { type: "string", description: "Data de entrega (formato AAAA-MM-DD)" }
        },
        required: ["titulo"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "update_project_status",
      description: "Atualiza o status operacional do projeto atual no Notion.",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string", enum: ["Prospecção", "Briefing", "Proposta", "Aprovado", "Pré-produção", "Em produção", "Edição", "Entrega", "Concluído", "Cancelado"] },
          etapa: { type: "string", description: "Etapa de 1 a 13 do fluxo de trabalho" }
        },
        required: ["status"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "write_cerebro_note",
      description: "Escreve ou atualiza uma nota markdown (.md) local do projeto no Cérebro (Obsidian).",
      parameters: {
        type: "object",
        properties: {
          fileName: { type: "string", description: "Nome do arquivo (ex: 'decupagem_luzes')" },
          content: { type: "string", description: "Conteúdo completo da nota em formato Markdown" }
        },
        required: ["fileName", "content"]
      }
    }
  }
];

export async function POST(request: Request) {
  try {
    const { messages, projectContext } = await request.json();

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY não configurada' }, { status: 500 });
    }

    const { id: projectId, titulo: projectTitle, auto_id: projectNumber } = projectContext || {};

    // Prompt do sistema contendo a personalidade do Oráculo e o contexto do projeto
    const systemPrompt = `Você é o Oráculo, o terceiro sócio digital de Lipe e Jaya na Firma Abacaxi.
Seu tom é profissional, acolhedor e focado. Você fala como Lipe ou Jaya (caloroso e autêntico), NUNCA como IA genérica.
Você está prestando assistência no Canvas do projeto "${projectTitle}" (Número: ${projectNumber}, ID Notion: ${projectId}).

Você tem acesso a ferramentas para manipular este projeto em tempo real:
1. Criar tarefas no Notion ligadas a esta obra.
2. Atualizar o status ou etapa do projeto.
3. Escrever notas locais (.md) na pasta do projeto no Cérebro (Obsidian).

Use essas ferramentas de forma proativa sempre que o usuário solicitar uma ação relacionada.`;

    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    // Chamar API da OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: fullMessages,
        tools: TOOLS,
        tool_choice: 'auto'
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Erro na chamada do chat OpenAI:', errText);
      return NextResponse.json({ error: 'Erro de resposta da OpenAI' }, { status: 500 });
    }

    const result = await response.json();
    const assistantMessage = result.choices[0].message;

    // Se a IA solicitou chamadas de funções/ferramentas
    if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
      const toolCall = assistantMessage.tool_calls[0];
      const name = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);

      let actionSummary = '';

      if (name === 'create_project_task') {
        await createTask({
          projetoId: projectId,
          titulo: args.titulo,
          prioridade: args.prioridade,
          prazo: args.prazo
        });
        actionSummary = `Tarefa "${args.titulo}" criada com sucesso no Notion!`;
      } else if (name === 'update_project_status') {
        await updateProjectStatus(projectId, args.status, args.etapa);
        actionSummary = `Status do projeto atualizado para "${args.status}" no Notion!`;
      } else if (name === 'write_cerebro_note') {
        const folderPath = getProjectFolderPath(projectNumber, projectTitle);
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }
        fs.writeFileSync(path.join(folderPath, `${args.fileName}.md`), args.content, 'utf-8');
        actionSummary = `Nota "${args.fileName}.md" salva localmente na pasta do projeto no Cérebro!`;
      }

      // Responder de volta à interface informando a ação executada e a fala da IA
      return NextResponse.json({
        message: {
          role: 'assistant',
          content: `${assistantMessage.content || ''}\n\n[Ação Executada: ${actionSummary}]`
        },
        actionTriggered: true,
        actionName: name
      });
    }

    return NextResponse.json({
      message: assistantMessage
    });
  } catch (error: any) {
    console.error('Erro na API Chat:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
