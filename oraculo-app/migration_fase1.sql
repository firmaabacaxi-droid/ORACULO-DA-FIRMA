-- 1. NOVO ENUM PARA FLUXO DE TRABALHO (se ainda não existir)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'step_workflow') THEN
        CREATE TYPE step_workflow AS ENUM ('Prospecção', 'CRM', 'Proposta', 'Pré-Produção', 'Filmagem', 'Edição', 'Entrega');
    END IF;
END$$;

-- 2. ADICIONAR NOVAS COLUNAS NA TABELA DE PROJETOS E FINANCEIRO
ALTER TABLE projetos 
ADD COLUMN IF NOT EXISTS workflow_step step_workflow DEFAULT 'Prospecção',
ADD COLUMN IF NOT EXISTS diretor TEXT,
ADD COLUMN IF NOT EXISTS local_filmagem TEXT,
ADD COLUMN IF NOT EXISTS data_filmagem DATE;

ALTER TABLE financeiro_projeto
ADD COLUMN IF NOT EXISTS categoria TEXT;

-- 3. CRIAR TABELA DE ORÇAMENTOS (O Modelo de Budget Planner)
CREATE TABLE IF NOT EXISTS orcamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE,
    nome TEXT,
    status TEXT DEFAULT 'Aprovado', -- Rascunho, Aprovado, Rejeitado
    valor_total NUMERIC DEFAULT 0,  -- Valor vendido
    custo_previsto NUMERIC DEFAULT 0 -- Custo global estimado
);

-- 4. CRIAR TABELA DE CATEGORIAS DE ORÇAMENTO
CREATE TABLE IF NOT EXISTS orcamento_categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    orcamento_id UUID REFERENCES orcamentos(id) ON DELETE CASCADE,
    categoria TEXT NOT NULL,          -- Ex: 'Equipe de Set', 'Equipamentos', 'Pós-Produção'
    valor_alocado NUMERIC DEFAULT 0   -- Budget planejado
);

-- 5. CRIAR TABELA DE ANOTAÇÕES
CREATE TABLE IF NOT EXISTS anotacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    texto TEXT,
    autor TEXT,
    data DATE DEFAULT timezone('utc'::text, now())
);

-- 6. CRIAR TABELAS DE EQUIPAMENTOS
CREATE TABLE IF NOT EXISTS equipamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    nome TEXT NOT NULL,
    categoria TEXT,
    patrimonio TEXT UNIQUE,
    status TEXT DEFAULT 'Disponível' -- Disponível, Em Uso, Manutenção
);

CREATE TABLE IF NOT EXISTS alocacao_equipamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    equipamento_id UUID REFERENCES equipamentos(id) ON DELETE CASCADE,
    projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE,
    data_retirada DATE,
    data_devolucao DATE,
    status TEXT DEFAULT 'Reservado' -- Reservado, Retirado, Devolvido
);
