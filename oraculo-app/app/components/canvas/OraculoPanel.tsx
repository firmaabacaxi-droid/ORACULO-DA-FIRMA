import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface OraculoPanelProps {
  projectContext: any;
  onRefreshCanvas: () => void;
}

export default function OraculoPanel({ projectContext, onRefreshCanvas }: OraculoPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o Oráculo, sócio de vocês. Como posso ajudar com a Direção de Arte, tarefas ou notas deste projeto?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll para o fim do chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending, isTranscribing]);

  // Iniciar gravação de voz
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleVoiceUpload(audioBlob);
        
        // Parar todos os tracks do stream para liberar o microfone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Erro ao acessar o microfone:', err);
      alert('Não foi possível acessar o microfone. Verifique as permissões do navegador.');
    }
  };

  // Parar gravação de voz
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Transcrever o áudio enviado
  const handleVoiceUpload = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'voice.webm');

      const response = await fetch('/api/chat/voice', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erro na transcrição de voz');

      const data = await response.json();
      if (data.text && data.text.trim()) {
        // Enviar o texto transcrito automaticamente para o chat
        await sendMessage(data.text);
      }
    } catch (err) {
      console.error('Erro na transcrição:', err);
      alert('Erro ao processar mensagem de voz. Tente digitar.');
    } finally {
      setIsTranscribing(false);
    }
  };

  // Enviar mensagem
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          projectContext
        })
      });

      if (!chatResponse.ok) throw new Error('Erro ao comunicar com o Oráculo');

      const chatData = await chatResponse.json();
      if (chatData.message) {
        setMessages(prev => [...prev, chatData.message]);
        
        // Se a IA disparou uma ação no backend (Notion, Drive ou Cérebro), recarrega o Canvas
        if (chatData.actionTriggered) {
          onRefreshCanvas();
        }
      }
    } catch (err) {
      console.error('Erro no chat:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, tive um problema ao processar seu pedido. Tente novamente.' }]);
    } finally {
      setIsSending(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
    }
  };

  return (
    <div style={{
      width: '320px',
      background: 'var(--surface)',
      borderLeft: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '20px' }}>🔮</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text)' }}>ORÁCULO CHAT</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Voz, Texto & Ações no Canvas</div>
        </div>
      </div>

      {/* Mensagens */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }} className="custom-scrollbar">
        {messages.map((m, idx) => {
          const isAI = m.role === 'assistant';
          return (
            <div 
              key={idx}
              style={{
                alignSelf: isAI ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                background: isAI ? 'var(--surface2)' : 'rgba(212,154,106,0.15)',
                border: isAI ? '1px solid var(--border)' : '1px solid rgba(212,154,106,0.3)',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '13px',
                lineHeight: '1.5',
                color: isAI ? 'var(--text-default)' : 'var(--text)',
                whiteSpace: 'pre-wrap'
              }}
            >
              {m.content}
            </div>
          );
        })}
        {isTranscribing && (
          <div style={{ alignSelf: 'flex-end', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-dim)' }}>
            🎙️ Transcrevendo mensagem de voz...
          </div>
        )}
        {isSending && (
          <div style={{ alignSelf: 'flex-start', background: 'var(--surface2)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-dim)' }}>
            🔮 Pensando nas conexões...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input de Mensagem */}
      <form onSubmit={handleFormSubmit} style={{
        padding: '12px',
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite ou clique no microfone..."
          disabled={isSending || isTranscribing}
          style={{
            flex: 1,
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            color: 'var(--text)',
            outline: 'none'
          }}
        />

        {/* Botão de Gravação de Voz */}
        <button
          type="button"
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          style={{
            background: isRecording ? 'var(--red)' : 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            color: isRecording ? '#fff' : 'var(--text)',
            transition: 'all 0.15s',
            userSelect: 'none'
          }}
          title="Segure para falar"
        >
          {isRecording ? '🛑' : '🎙️'}
        </button>

        <button
          type="submit"
          disabled={!inputValue.trim() || isSending || isTranscribing}
          style={{
            background: 'var(--gold)',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            opacity: (!inputValue.trim() || isSending || isTranscribing) ? 0.5 : 1
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
