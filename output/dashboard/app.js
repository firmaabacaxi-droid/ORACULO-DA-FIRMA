// --- Dados Reais Extraídos do Notion da Firma Abacaxi (Junho 2026) ---
const projectsData = [
    { id: "PRJ-2026-001", name: "Maranha — Gravação 28-29/05", client: "Maranhã", stage: "Produção", status: "Em andamento", tag: "Fase 3" },
    { id: "PRJ-2026-002", name: "BONITO CINE SUR", client: "Andrea - Cine Sur", stage: "Edição", status: "Edição", tag: "Fase 2" },
    { id: "PRJ-2026-003", name: "Comunicação Simbiose", client: "SIMBIOSE", stage: "Acompanhamento", status: "Edição", tag: "Fase 2" },
    { id: "PRJ-2026-004", name: "RNP Ailton Krenak", client: "Órgão Público", stage: "Pré-produção", status: "Aprovado", tag: "Fase 2" },
    { id: "PRJ-2026-005", name: "AGO", client: "AGÔ ANCESTRALIDADE", stage: "Edição Final", status: "Edição", tag: "Fase 1" },
    { id: "PRJ-2026-006", name: "Oficinas de Documentário", client: "Cultural", stage: "Pré-produção", status: "Aprovado", tag: "Fase 2" },
    { id: "PRJ-2026-007", name: "Visite mon Agencé", client: "AFD", stage: "Orçamento", status: "Proposta", tag: "Fase 1" }
];

const tasksData = [
    { id: "TAR-FIR-01", name: "Lista de equipamentos (inventário)", status: "Em andamento", project: "Geral Firma" },
    { id: "TAR-FIR-02", name: "DOCUMENTOS JAYA ENAP", status: "A fazer", project: "Administrativo" },
    { id: "TAR-FIR-03", name: "Novo Portfólio — ORGANIZAR VIDEOS", status: "Em andamento", project: "Marketing" },
    { id: "TAR-FIR-04", name: "Implementação do plano estratégico", status: "A fazer", project: "Estratégico" },
    { id: "TAR-FIR-05", name: "Cadastrar CEAC da firma", status: "A fazer", project: "Legal" },
    { id: "TAR-FIR-06", name: "Fotos JAYA", status: "A fazer", project: "Produção" },
    { id: "TAR-FIR-07", name: "Corrigir erro do pagamento Facebook Business", status: "Urgente", project: "Financeiro" },
    { id: "TAR-FIR-08", name: "Organização financeira", status: "Em andamento", project: "Financeiro" },
    { id: "TAR-FIR-09", name: "Vender equipamentos não utilizados", status: "A fazer", project: "Geral Firma" },
    { id: "TAR-FIR-10", name: "Lista de compras (empresa)", status: "A fazer", project: "Firma" }
];

const editionsData = [
    { id: "EDI-01", name: "FINALIZAÇÃO CINE SUR", progress: 85, editor: "Jaya Barretto", software: "DaVinci Resolve", status: "Corte Fino" },
    { id: "EDI-02", name: "FINALIZAÇÃO AGO", progress: 95, editor: "Lipe Duque", software: "DaVinci Resolve", status: "Edição Final" },
    { id: "EDI-03", name: "SIMBIOSE — Vídeo 1min30s", progress: 60, editor: "Editor Freelancer", software: "Premiere Pro", status: "Corte Bruto" }
];

const budgetData = [
    { item: "Diretor / Câmera (Lipe)", category: "Equipe", unitValue: 1200, qty: 5, total: 6000 },
    { item: "Diretor de Fotografia (Jaya)", category: "Equipe", unitValue: 1200, qty: 5, total: 6000 },
    { item: "Videomaker 1 (Freelancer)", category: "Equipe", unitValue: 800, qty: 5, total: 4000 },
    { item: "Op. de Som com Equipamentos", category: "Equipe", unitValue: 900, qty: 5, total: 4500 },
    { item: "Equipamentos de Iluminação (Kit Aputure/Nanlite)", category: "Equipamentos", unitValue: 800, qty: 5, total: 4000 },
    { item: "Kit de Lentes Cinematográficas", category: "Equipamentos", unitValue: 600, qty: 5, total: 3000 },
    { item: "Produção (Alimentação e Combustível)", category: "Transporte/Alimentação", unitValue: 500, qty: 5, total: 2500 },
    { item: "Imposto NF (7.24%)", category: "Imposto", unitValue: 2461.6, qty: 1, total: 2461.6 }
];

// --- Lógica de Controle do Dashboard ---
document.addEventListener("DOMContentLoaded", () => {
    // Configura o menu de navegação lateral (Tabs)
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetTab = item.getAttribute("data-tab");
            switchTab(targetTab);
        });
    });

    // Injeta os dados nas tabelas e contêineres do HTML
    loadDashboardData();
});

// Alterna entre abas
function switchTab(tabId) {
    // Atualiza navegação lateral
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        if (item.getAttribute("data-tab") === tabId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Atualiza visualização de blocos
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach(content => {
        if (content.getAttribute("id") === tabId) {
            content.classList.add("active");
        } else {
            content.classList.remove("active");
        }
    });
}

// Injeção dinâmica dos dados reais
function loadDashboardData() {
    // 1. KPI counters
    document.getElementById("kpi-projetos-ativos").innerText = projectsData.length;
    document.getElementById("kpi-tarefas-pendentes").innerText = tasksData.length;
    document.getElementById("kpi-edicoes-ativas").innerText = editionsData.length;

    // 2. Projetos Recentes (Visão Geral)
    const recentProjectsContainer = document.getElementById("recent-projects-list");
    recentProjectsContainer.innerHTML = "";
    // Pega os 4 primeiros projetos
    projectsData.slice(0, 4).forEach(proj => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${proj.name}</strong></td>
            <td>${proj.client}</td>
            <td>${proj.stage}</td>
            <td><span class="status-pill ${proj.status.toLowerCase().replace(" ", "-")}">${proj.status}</span></td>
            <td><button class="btn btn-secondary" onclick="switchTab('projetos')">Detalhes</button></td>
        `;
        recentProjectsContainer.appendChild(row);
    });

    // 3. Próximas Ações (Visão Geral - Checklist de Tarefas)
    const recentTasksContainer = document.getElementById("recent-tasks-list");
    recentTasksContainer.innerHTML = "";
    // Pega as 4 primeiras tarefas
    tasksData.slice(0, 5).forEach(task => {
        const isUrgent = task.status === "Urgente";
        const li = document.createElement("li");
        li.className = "task-item";
        if (isUrgent) li.style.borderLeftColor = "var(--accent-orange)";
        
        li.innerHTML = `
            <div class="task-checkbox ${task.status === 'Concluída' ? 'checked' : ''}">
                ${task.status === 'Concluída' ? '✓' : ''}
            </div>
            <div class="task-info">
                <span class="task-name">${task.name}</span>
                <span class="task-meta">${task.project} · <strong style="color: ${isUrgent ? 'var(--accent-orange)' : 'var(--text-muted)'}">${task.status}</strong></span>
            </div>
        `;
        recentTasksContainer.appendChild(li);
    });

    // 4. Grid de Projetos Completo (Aba Projetos)
    const fullProjectsGrid = document.getElementById("full-projects-grid");
    fullProjectsGrid.innerHTML = "";
    projectsData.forEach(proj => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <div class="project-card-header">
                <h3>${proj.name}</h3>
                <p class="project-card-meta">Cliente: <strong>${proj.client}</strong></p>
            </div>
            <div class="project-card-footer">
                <span class="project-tag">${proj.tag}</span>
                <span class="status-pill ${proj.status.toLowerCase().replace(" ", "-")}">${proj.stage}</span>
            </div>
        `;
        fullProjectsGrid.appendChild(card);
    });

    // 5. Tabela de Tarefas da Firma (Aba Tarefas)
    const tasksTable = document.getElementById("firma-tasks-table");
    tasksTable.innerHTML = "";
    tasksData.forEach(task => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${task.name}</strong></td>
            <td><span class="status-pill ${task.status === 'Concluída' ? 'concluido' : task.status === 'Urgente' ? 'producao' : 'crm'}">${task.status}</span></td>
            <td><code style="color: var(--accent-orange);">${task.id}</code></td>
        `;
        tasksTable.appendChild(row);
    });

    // 6. Mesa de Pós-Produção (Aba Edição)
    const editionsGrid = document.getElementById("editions-grid");
    editionsGrid.innerHTML = "";
    editionsData.forEach(ed => {
        const card = document.createElement("div");
        card.className = "edition-card";
        card.innerHTML = `
            <div class="edition-title">${ed.name}</div>
            <div class="edition-meta">
                <span>Editor: <strong>${ed.editor}</strong></span>
                <span>Software: <strong>${ed.software}</strong></span>
            </div>
            <div class="timeline-track">
                <div class="timeline-progress" style="width: ${ed.progress}%"></div>
            </div>
            <div class="edition-meta" style="margin-top: 0.5rem;">
                <span>Progresso: <strong>${ed.progress}%</strong></span>
                <span class="status-pill edicao">${ed.status}</span>
            </div>
        `;
        editionsGrid.appendChild(card);
    });

    // 7. Tabela de Orçamento de Lançamentos (Aba Financeiro)
    const budgetTable = document.getElementById("budget-items-table");
    budgetTable.innerHTML = "";
    budgetData.forEach(b => {
        const row = document.createElement("tr");
        const formattedVal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(b.unitValue);
        const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(b.total);
        row.innerHTML = `
            <td><strong>${b.item}</strong></td>
            <td><span class="status-pill crm">${b.category}</span></td>
            <td>${formattedVal}</td>
            <td>${b.qty}</td>
            <td><strong style="color: var(--accent-green);">${formattedTotal}</strong></td>
        `;
        budgetTable.appendChild(row);
    });
}
