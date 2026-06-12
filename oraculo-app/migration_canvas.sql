-- 1. TABELA DE LAYOUT DOS NÓS DO CANVAS
CREATE TABLE IF NOT EXISTS canvas_nodes_layout (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    projeto_id TEXT NOT NULL,
    node_id TEXT NOT NULL,
    x NUMERIC NOT NULL,
    y NUMERIC NOT NULL,
    node_type TEXT DEFAULT 'standard', -- 'notion', 'media', 'doc', 'art_study', 'ai_generation'
    data JSONB DEFAULT '{}'::jsonb,     -- Armazena metadados flexíveis (prompts, URLs de arquivos, configurações)
    UNIQUE(projeto_id, node_id)
);

-- 2. TABELA DE CONEXÕES PERSONALIZADAS DO CANVAS
CREATE TABLE IF NOT EXISTS canvas_custom_edges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    projeto_id TEXT NOT NULL,
    source_id TEXT NOT NULL,
    target_id TEXT NOT NULL,
    label TEXT,
    data JSONB DEFAULT '{}'::jsonb,
    UNIQUE(projeto_id, source_id, target_id)
);
