const fs = require('fs');
const path = require('path');

// Diretório do cérebro
const braindDir = __dirname;

// Função para normalizar nomes de arquivo
function normalizeFilename(name) {
  return name.replace(/\.md$/, '').toLowerCase();
}

// Função para extrair links do Obsidian
function extractLinks(content) {
  const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
  const links = [];
  let match;

  while ((match = wikiLinkRegex.exec(content)) !== null) {
    links.push(match[1].trim());
  }

  return links;
}

// Função para processar todos os arquivos markdown
function processMarkdownFiles(dir, nodes = new Set(), edges = new Map()) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach(file => {
    if (file.isDirectory()) {
      processMarkdownFiles(path.join(dir, file.name), nodes, edges);
    } else if (file.name.endsWith('.md') && file.name !== 'gerar-grafo.js') {
      const filePath = path.join(dir, file.name);
      const relativePath = path.relative(braindDir, filePath);
      const fileName = normalizeFilename(file.name);
      const displayName = file.name.replace(/\.md$/, '');

      // Adicionar nó
      nodes.add(JSON.stringify({
        id: fileName,
        label: displayName,
        path: relativePath
      }));

      // Ler conteúdo e extrair links
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const links = extractLinks(content);

        links.forEach(link => {
          const normalizedLink = normalizeFilename(link);
          const key = `${fileName}|${normalizedLink}`;
          edges.set(key, {
            from: fileName,
            to: normalizedLink,
            label: link
          });
        });
      } catch (err) {
        console.error(`Erro lendo ${filePath}:`, err.message);
      }
    }
  });

  return { nodes, edges };
}

// Processar todos os arquivos
console.log('📊 Processando arquivos do cérebro...');
const { nodes, edges } = processMarkdownFiles(braindDir);

const nodesArray = Array.from(nodes).map(n => JSON.parse(n));
const edgesArray = Array.from(edges.values());

// Criar estrutura de grafo
const graph = {
  nodes: nodesArray,
  edges: edgesArray,
  metadata: {
    total_nodes: nodesArray.length,
    total_edges: edgesArray.length,
    generated_at: new Date().toISOString()
  }
};

// Salvar em JSON
const outputPath = path.join(braindDir, 'cerebro-grafo.json');
fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2));

console.log(`✅ Grafo gerado com sucesso!`);
console.log(`📁 Arquivo: ${outputPath}`);
console.log(`📊 Estatísticas:`);
console.log(`   - Nós (arquivos): ${graph.metadata.total_nodes}`);
console.log(`   - Arestas (conexões): ${graph.metadata.total_edges}`);

// Criar arquivo HTML para visualizar com Graphify
const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grafo - Cérebro Oráculo</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #0f0f0f;
      color: #fff;
    }
    #graph {
      width: 100%;
      height: 100vh;
      background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
    }
    .info {
      position: absolute;
      top: 20px;
      left: 20px;
      background: rgba(0,0,0,0.8);
      padding: 20px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 100;
    }
    .info h2 {
      margin: 0 0 10px 0;
      font-size: 18px;
    }
    .stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 10px;
    }
    .stat-item {
      background: rgba(255,255,255,0.1);
      padding: 8px;
      border-radius: 4px;
    }
    .stat-label {
      font-size: 11px;
      opacity: 0.7;
    }
    .stat-value {
      font-size: 16px;
      font-weight: bold;
      color: #4ade80;
    }
    .tooltip {
      position: absolute;
      background: rgba(0,0,0,0.9);
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      z-index: 101;
    }
  </style>
</head>
<body>
  <div id="graph"></div>
  <div class="info">
    <h2>🧠 Cérebro Oráculo</h2>
    <p>Visualização das conexões entre notas</p>
    <div class="stats">
      <div class="stat-item">
        <div class="stat-label">Nós</div>
        <div class="stat-value">${graph.metadata.total_nodes}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Conexões</div>
        <div class="stat-value">${graph.metadata.total_edges}</div>
      </div>
    </div>
  </div>

  <script>
    const graphData = ${JSON.stringify(graph)};

    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select("#graph").append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g");

    // Zoom
    const zoom = d3.zoom()
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);

    // Simulação de força
    const simulation = d3.forceSimulation(graphData.nodes)
      .force("link", d3.forceLink(graphData.edges)
        .id(d => d.id)
        .distance(100)
        .strength(0.3))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    // Links
    const link = g.selectAll("line")
      .data(graphData.edges)
      .enter()
      .append("line")
      .attr("stroke", "#444")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.6);

    // Nós
    const node = g.selectAll("circle")
      .data(graphData.nodes)
      .enter()
      .append("circle")
      .attr("r", 8)
      .attr("fill", () => {
        const hue = Math.random() * 360;
        return \`hsl(\${hue}, 70%, 50%)\`;
      })
      .attr("opacity", 0.8)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget).transition().attr("r", 12);
        link.attr("stroke", l => (l.from === d.id || l.to === d.id) ? "#4ade80" : "#444");
      })
      .on("mouseout", (event, d) => {
        d3.select(event.currentTarget).transition().attr("r", 8);
        link.attr("stroke", "#444");
      });

    // Labels
    const labels = g.selectAll("text")
      .data(graphData.nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("font-size", "10px")
      .attr("fill", "#ccc")
      .text(d => d.label.substring(0, 15))
      .style("pointer-events", "none")
      .style("text-shadow", "0 0 3px rgba(0,0,0,0.8)");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      labels
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  </script>
</body>
</html>`;

const htmlPath = path.join(braindDir, 'cerebro-grafo.html');
fs.writeFileSync(htmlPath, htmlContent);

console.log(`\n🌐 Visualização HTML criada: ${htmlPath}`);
console.log(`\n💡 Para visualizar:`);
console.log(`   1. Abra: ${htmlPath}`);
console.log(`   2. Ou use: npx http-server ${braindDir} --open`);
