#!/usr/bin/env python3
"""
Servidor local para visualizar o Graphify interativamente.
Roda em http://localhost:8000
"""

import http.server
import socketserver
import os
import json
from pathlib import Path

PORT = 8000
GRAPH_DIR = Path(__file__).parent / "CEREBRO-ORACULO" / "graphify-out"

class GraphifyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            self.path = "/graph.html"

        # Servir arquivos do graphify-out
        file_path = GRAPH_DIR / self.path.lstrip('/')

        if file_path.exists() and file_path.is_file():
            with open(file_path, 'rb') as f:
                self.send_response(200)

                # Content-Type apropriado
                if self.path.endswith('.json'):
                    self.send_header('Content-type', 'application/json')
                elif self.path.endswith('.html'):
                    self.send_header('Content-type', 'text/html')
                elif self.path.endswith('.md'):
                    self.send_header('Content-type', 'text/markdown')
                else:
                    self.send_header('Content-type', 'text/plain')

                content = f.read()
                self.send_header('Content-Length', len(content))
                self.end_headers()
                self.wfile.write(content)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Arquivo nao encontrado")

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {format % args}")

if __name__ == "__main__":
    os.chdir(GRAPH_DIR)

    with socketserver.TCPServer(("", PORT), GraphifyHandler) as httpd:
        print(f"""
=== CEREBRO GRAPHIFY - SERVIDOR ATIVO ===

URL: http://localhost:{PORT}
Grafo: {GRAPH_DIR / 'graph.html'}
Relatorio: {GRAPH_DIR / 'GRAPH_REPORT.md'}

Controles:
  - Zoom: scroll do mouse
  - Pan: clique + arraste
  - Filtro: clique em nos
  - Busca: ctrl+f (browser)

Pressione Ctrl+C para parar
        """)

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n✋ Servidor parado.")
