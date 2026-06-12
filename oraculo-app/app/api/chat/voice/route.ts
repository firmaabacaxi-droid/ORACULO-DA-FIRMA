import { NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  try {
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY não configurada' }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Arquivo de áudio ausente' }, { status: 400 });
    }

    // Criar um FormData para submeter à OpenAI
    const openAIFormData = new FormData();
    openAIFormData.append('file', file);
    openAIFormData.append('model', 'whisper-1');
    openAIFormData.append('language', 'pt');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: openAIFormData
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Erro na transcrição Whisper OpenAI:', errText);
      return NextResponse.json({ error: 'Erro de resposta na API de Transcrição' }, { status: 500 });
    }

    const result = await response.json();
    return NextResponse.json({ text: result.text });
  } catch (error: any) {
    console.error('Erro na API de Voz/Transcrição:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
