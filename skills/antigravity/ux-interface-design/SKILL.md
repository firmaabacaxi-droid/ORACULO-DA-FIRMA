---
name: "UX Interface Design — Design Interativo & Humanizado"
category: "antigravity"
mode:
  - agent
dependencies: []
routes_to: ["antigravity/llm-council", "antigravity/marketing-psychology"]
oraculo_endpoint: ""
---

# SKILL — UX Interface Design
## Design Interativo, Humanizado e Cinemático para o Oráculo
*Baseado em pesquisa de 2024/2026: Linear, Notion, Vercel + Princípios de Don Norman + Micro-interactions*

---

## 🧠 Os 3 Níveis do Design Emocional (Don Norman)

Aplique sempre que projetar ou criticar uma interface:

| Nível | O que é | Como aplicar no Oráculo |
|---|---|---|
| **Visceral** | Primeira impressão — cores, tipografia, espaço | Paleta Cine Terroso (`#0f0d0b`, `#d49a6a`, `#e6dfd3`) + espaçamento 8px base + tipografia Inter |
| **Comportamental** | Usabilidade — o usuário consegue fazer o que quer? | Cada campo de dados DEVE ser editável inline. Se o usuário precisa abrir outro app para editar, **falhou** |
| **Reflexivo** | Identidade — o app faz o usuário se sentir capaz e poderoso? | Tom de linguagem caloroso, feedback que confirma ações ("Salvo no Notion ✓"), ícones com personalidade |

---

## ✏️ Padrão de Campo Editável Inline

### Regra de ouro
> **"Se vem do Notion, é editável."** Todo campo de dados deve ter modo view → modo edit sem navegação.

### Anatomia do campo editável

```
Estado VIEW (padrão):
┌─────────────────────────────────────┐
│ 🏷️ Status do Projeto     [Em produção ▼]  ✏️  │  ← ícone edit aparece no hover
└─────────────────────────────────────┘

Estado EDIT (ao clicar):
┌─────────────────────────────────────┐
│ 🏷️ Status    [dropdown aberto       ]  ✓ ✕  │  ← confirmar ou cancelar
└─────────────────────────────────────┘

Estado SAVING:
┌─────────────────────────────────────┐
│ 🏷️ Status    Em produção  ⟳ salvando...   │  ← spinner sutil
└─────────────────────────────────────┘

Estado SAVED:
┌─────────────────────────────────────┐
│ 🏷️ Status    Em produção  ✓ salvo        │  ← fade out em 2s
└─────────────────────────────────────┘
```

### CSS: Efeito hover que revela editabilidade
```css
.field-editable {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  cursor: text;
}

.field-editable:hover {
  background: rgba(212, 154, 106, 0.06);  /* gold sutil */
  border-color: rgba(212, 154, 106, 0.25);
}

.field-editable:hover::after {
  content: '✏️';
  font-size: 10px;
  margin-left: 6px;
  opacity: 0.5;
}

.field-editable:focus-within {
  background: rgba(212, 154, 106, 0.10);
  border-color: var(--gold);
  box-shadow: 0 0 0 2px rgba(212, 154, 106, 0.15);
  outline: none;
}
```

### Hook React: `useInlineEdit`
```tsx
function useInlineEdit<T>(initialValue: T, onSave: (val: T) => Promise<void>) {
  const [value, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const startEdit = () => setEditing(true);
  
  const save = async () => {
    setSaving(true);
    setEditing(false);
    try {
      await onSave(value);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000); // fade out após 2s
    } catch {
      setValue(initialValue); // revert se falhou
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => {
    setValue(initialValue);
    setEditing(false);
  };

  return { value, setValue, editing, saving, saved, startEdit, save, cancel };
}
```

---

## 🔔 Sistema de Toast (substituir alert())

### Biblioteca recomendada: **react-hot-toast** (< 5KB)
```bash
npm install react-hot-toast
```

### Setup global (em `layout.tsx`)
```tsx
import { Toaster } from 'react-hot-toast';

// No JSX do layout:
<Toaster
  position="bottom-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: '#1a1714',  // surface Cine Terroso
      color: '#e6dfd3',
      border: '1px solid rgba(212,154,106,0.3)',
      borderRadius: '8px',
      fontSize: '13px',
    },
    success: {
      iconTheme: { primary: '#d49a6a', secondary: '#0f0d0b' }
    },
    error: {
      iconTheme: { primary: '#e05c5c', secondary: '#0f0d0b' }
    }
  }}
/>
```

### Uso em qualquer componente
```tsx
import toast from 'react-hot-toast';

// ✅ Sucesso
toast.success('Salvo no Notion');

// ❌ Erro  
toast.error('Erro ao salvar. Tente novamente.');

// ⏳ Loading com promise
toast.promise(saveToNotion(), {
  loading: 'Salvando...',
  success: 'Salvo com sucesso!',
  error: 'Erro ao salvar'
});
```

---

## ⚡ Auto-Save com Debounce (para textareas)

```tsx
function useAutoSave(value: string, saveFn: (v: string) => Promise<void>, delay = 1500) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  useEffect(() => {
    if (value === undefined) return;
    setStatus('saving');
    
    const timer = setTimeout(async () => {
      try {
        await saveFn(value);
        setStatus('saved');
        setTimeout(() => setStatus('idle'), 2000);
      } catch {
        setStatus('error');
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value]);

  const indicator = {
    idle: null,
    saving: <span style={{color:'var(--text-muted)', fontSize:'11px'}}>⟳ Salvando...</span>,
    saved:  <span style={{color:'var(--green)', fontSize:'11px'}}>✓ Salvo</span>,
    error:  <span style={{color:'var(--red)', fontSize:'11px'}}>✕ Erro ao salvar</span>,
  }[status];

  return { status, indicator };
}
```

---

## 🎨 Micro-animações Essenciais (CSS puro, 60fps)

Usar sempre `opacity` + `transform` — nunca `width`/`height` para animações (pesado).

```css
/* Fade-in de elementos que aparecem */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Pulse sutil para confirmar ação */
@keyframes pulse-gold {
  0%, 100% { box-shadow: 0 0 0 0 rgba(212,154,106,0); }
  50%       { box-shadow: 0 0 0 4px rgba(212,154,106,0.2); }
}

/* Skeleton loading */
@keyframes skeleton-wave {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, var(--surface) 25%, rgba(212,154,106,0.05) 50%, var(--surface) 75%);
  background-size: 200% 100%;
  animation: skeleton-wave 1.5s infinite;
  border-radius: 4px;
}

/* Cards com hover elevação */
.card-interactive {
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(212,154,106,0.15);
  border-color: rgba(212,154,106,0.3);
}
```

---

## 📐 Princípios de Hierarquia Visual (Bento Grid)

### Regra dos 3 pesos
```
PRIMÁRIO   → O dado mais importante do contexto (título, valor, status)
            Peso: font-size 20-28px, font-weight 700-800, cor var(--text)

SECUNDÁRIO → Contexto de suporte (cliente, datas, responsável)
            Peso: font-size 13-14px, font-weight 400-500, cor var(--text-dim)

TERCIÁRIO  → Metadados, labels, etiquetas
            Peso: font-size 10-12px, font-weight 400, cor var(--text-muted)
            UPPERCASE + letter-spacing: 1.5px
```

### Espaçamento (escala de 8px)
```
Dentro de um card:      padding 16-24px
Entre seções:           gap 16px
Entre cards:            gap 12px
Entre grupos de cards:  gap 24px
```

---

## 🔍 Jakob's Law — Use padrões conhecidos

> "Usuários passam a maior parte do tempo em outros apps. Eles preferem que o seu app funcione como os outros que já conhecem."

**Aplicações no Oráculo:**
- Click no título → edita (como Notion)
- `Esc` → cancela edição (universal)
- `Enter` → salva edição em campos de uma linha (universal)
- `Ctrl+K` → busca global (Linear, Notion, GitHub)
- Status com cores → verde=ok, laranja=em progresso, vermelho=urgente (universal)
- Hover em linha da tabela → revela ações (Linear)

---

## 🚫 Anti-padrões a evitar

| ❌ Não fazer | ✅ Fazer |
|---|---|
| `alert()` para feedback | Toast no canto da tela |
| Navegar para outra página para editar | Inline edit no lugar |
| Campos sem indicação de que são editáveis | Hover effect + ícone ✏️ |
| Botão "Salvar" que bloqueia tudo | Auto-save + indicador sutil |
| Animações em `width`/`height` | Animações em `opacity`/`transform` |
| Texto branco (#fff) em fundo preto (#000) | `#e6dfd3` em `#0f0d0b` (Cine Terroso) |
| Erro só no console | Toast de erro + retry |
| Loading sem feedback | Skeleton screen ou spinner |

---

## 📋 Checklist antes de entregar qualquer feature

- [ ] Campos de dados são editáveis inline?
- [ ] Alert() foi substituído por toast?
- [ ] Há feedback visual durante loading/saving?
- [ ] Hover effects indicam o que é clicável?
- [ ] Animações usam opacity/transform?
- [ ] Erros são comunicados ao usuário?
- [ ] Hierarquia visual: primário/secundário/terciário clara?
- [ ] Espaçamento segue escala de 8px?

---

*Fontes: UX Design CC, NN Group, Don Norman "Design of Everyday Things", Linear Design System, Vercel Design, react-hot-toast docs, Figma Design Tokens*
