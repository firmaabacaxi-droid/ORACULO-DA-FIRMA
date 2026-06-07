#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAC 2026 — Painel de Estudo Visual
Gerador de 9 imagens via OpenAI DALL·E 3 API
Projeto: Todas as Histórias do Mundo

Fluxo:
1. Lê os 9 prompts do dicionário abaixo (ajustados após análise das referências)
2. Para cada prompt, gera 3 variações
3. Salva em output/fac2026/painel-visual/ com nomes padronizados
4. Retorna lista de arquivos gerados para curadoria manual
"""

import os
import json
from pathlib import Path
from typing import List, Dict
import time
from openai import OpenAI

# Carregar API key do ANTIGRAVITY/.env
ANTIGRAVITY_ENV = Path("C:/Users/User/Documents/ANTIGRAVITY/.env")
if ANTIGRAVITY_ENV.exists():
    with open(ANTIGRAVITY_ENV, "r") as f:
        for line in f:
            if line.startswith("OPENAI_API_KEY"):
                key = line.split("=")[1].strip()
                os.environ["OPENAI_API_KEY"] = key
                break

# Inicializar cliente OpenAI
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("[ERRO] OPENAI_API_KEY nao encontrada!")
    exit(1)

client = OpenAI(api_key=api_key)

# Diretório de saída
OUTPUT_DIR = Path(__file__).parent / "painel-visual"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ============================================================================
# PROMPTS BASE — Ajustar conforme decisões das referências visuais (Fase 2)
# ============================================================================

PROMPTS = {
    "01_Sael_apresentacao": {
        "titulo": "Sael: apresentação do personagem",
        "prompt": """A barefoot male circus performer standing alone on a bare stage. Dark-haired man with a full, dense beard, intense contemplative gaze, defined facial features carrying depth and weight. Athletic build with confident posture yet vulnerable presence. Wide linen white-cream trousers, simple linen shirt open at the chest, a worn rope tied as a belt at the waist. The rope prominently visible — central object of his journey. Soft blue-indigo projected light washing over him. Contemporary circus aesthetic, dramatic theatrical lighting, cinematic quality, moody atmosphere.""",
    },
    "02_Cenografia_palco": {
        "titulo": "A Cenografia: o palco vivo",
        "prompt": """A theater stage with multiple large white linen fabric panels suspended at different heights by ropes and pulleys that allow rapid transformation. The space is empty yet full of possibility — pure white textiles in geometric and organic configurations (some triangular, some wavy, some flat), before any projection. The pulley system visible, suggesting the mechanism for rapid scene changes. Theatrical lighting from above and sides, ethereal and atmospheric, dramatic shadows and light playing on fabric surfaces. Colors will come exclusively from projected light mapping. Contemporary circus theater, minimalist set design.""",
    },
    "03_Aderecos_flat_lay": {
        "titulo": "Os Adereços: objetos de cena",
        "prompt": """Artistic flat-lay composition of theatrical props arranged on white fabric: a vintage lit oil lantern, a delicate white veil with a floral tiara, a worn leather hat beside a pipe, a folding knife, a bird feather, a dark shawl. A long worn rope coiled at the center connecting them all. Soft dramatic lighting, theatrical still-life photography style.""",
    },
    "04_Prologo_lar": {
        "titulo": "Prólogo: O Lar",
        "prompt": """Video projection mapping on suspended white fabric panels in a theater — projecting the interior of a fisherman's wooden cabin at night. Warm amber and ochre lantern light flickering on rough wooden walls, the dark sea visible through a gap with stars reflected on the water. Slow ocean waves. The fabric glows from the warm amber projection. Intimate, warm, like a childhood memory. Mapped projection on moving fabric, contemporary circus theater aesthetic, light source from below creating dramatic shadows.""",
    },
    "05_Elara_torre_vidro": {
        "titulo": "Elara: a torre de vidro",
        "prompt": """Video projection mapping on suspended white fabric panels — projecting a European stone tower covered in blooming flowers and hanging gardens. Soft rose-pink and lavender light projected across the fabric surfaces, creating a dreamy atmosphere. Constellations of light dissolving through the tower walls. Delicate, diffuse light as if filtering through glass. The white fabric glows with rose and lavender tones. Projection mapping on fabric, ethereal theater aesthetic, lateral light source.""",
    },
    "06_Moacir_floresta_pedra": {
        "titulo": "Moacir: a floresta e a pedra",
        "prompt": """Video projection mapping on suspended white fabric panels — projecting a dense dark night forest. Deep jungle greens, dark ochre earth, black night sky projected onto the white fabric. The silhouette of an indigenous warrior slowly turning to stone, permanent and guardian, his posture defiant and powerful. A distant village with a small light at the far edge. The white fabric is illuminated from below with green and dark tones. Mapped projection on fabric, dramatic low-angle light, theatrical shadows.""",
    },
    "07_Isola_fios_destino": {
        "titulo": "Ísola: os fios do destino",
        "prompt": """Video projection mapping on suspended white fabric panels — golden and amber threads of light crossing the fabric surfaces in every direction, a glowing web of destiny made visible. A female figure in a dark shawl reaching her hands into the projected light threads as if reading them. Deep purple, burgundy and shadow tones in the projection. Theater of shadows, the figure's silhouette part of the composition. The white fabric glows with golden and purple light. Mysterious, fate-like atmosphere, lateral lighting.""",
    },
    "08_Crise_colapso_visual": {
        "titulo": "A Crise: o colapso visual",
        "prompt": """Video projection mapping on suspended white fabric panels — fragments of multiple environments layered and spinning simultaneously projected onto white fabric: cabin warm amber light, pink and lavender flowers, dark jungle greens, dark forest, golden threads of destiny, cosmic stardust — all fragmented and colliding. A figure's shadow multiplied across the fabrics, surrounded by versions of itself. The white fabric glows with chaotic, saturated colors fighting for space, unstable flickering light creating visual vertigo and disorientation. Total collapse of coherence, theatrical chaos.""",
    },
    "09_Revelacao_branco_absoluto": {
        "titulo": "A Revelação: o branco absoluto",
        "prompt": """A theater stage with pure white linen fabric backdrop and suspended panels — immaculate, absolute, no projection. A single barefoot male figure in repose at center stage, in white-cream linen trousers and simple open shirt, dark-haired with full beard. No color in projection. Minimal warm golden-amber light directly on the figure only, nothing else lit — the rest is darkness. A worn rope lies on the floor beside him, abandoned. Profound stillness, theatrical minimalism, after the storm. The absence of movement and color as the image itself. Peace after chaos.""",
    },
}

# ============================================================================
# FUNÇÃO DE GERAÇÃO
# ============================================================================

def generate_images(num_variations: int = 3) -> Dict[str, List[str]]:
    """
    Gera imagens para cada prompt.

    Args:
        num_variations: número de variações por imagem (padrão: 3)

    Returns:
        Dicionário {prompt_id: [lista de caminhos de arquivo gerados]}
    """
    results = {}
    total_requests = len(PROMPTS) * num_variations
    completed = 0

    print(f"\n{'='*70}")
    print(f"FAC 2026 — Painel de Estudo Visual — Geração via DALL·E 3")
    print(f"{'='*70}")
    print(f"Total de imagens: {len(PROMPTS)} × {num_variations} variações = {total_requests} requests")
    print(f"Output: {OUTPUT_DIR}")
    print(f"{'='*70}\n")

    for prompt_id, prompt_data in PROMPTS.items():
        titulo = prompt_data["titulo"]
        prompt_text = prompt_data["prompt"]

        print(f"[{prompt_id}] {titulo}")
        print(f"  Gerando {num_variations} variações...", end=" ", flush=True)

        generated_files = []

        for variation in range(1, num_variations + 1):
            try:
                # Fazer request à API DALL·E 3
                response = client.images.generate(
                    model="gpt-image-2-2026-04-21",
                    prompt=prompt_text,
                    n=1,
                    size="1024x1024",
                    quality="high"
                )

                # Salvar imagem (base64 ou URL)
                import base64
                filename = f"{prompt_id}_var{variation}.png"
                filepath = OUTPUT_DIR / filename

                if hasattr(response.data[0], 'b64_json') and response.data[0].b64_json:
                    # Salvar base64
                    image_bytes = base64.b64decode(response.data[0].b64_json)
                    with open(filepath, "wb") as f:
                        f.write(image_bytes)
                    generated_files.append(str(filepath))
                elif hasattr(response.data[0], 'url') and response.data[0].url:
                    # Salvar via URL
                    import urllib.request
                    urllib.request.urlretrieve(response.data[0].url, filepath)
                    generated_files.append(str(filepath))
                else:
                    raise ValueError("Nao encontrou URL ou base64 na resposta")

                print(".", end="", flush=True)

                # Pequeno delay para não sobrecarregar API
                if variation < num_variations:
                    time.sleep(1)

            except Exception as e:
                print(f"\n  [ERRO] Erro na variacao {variation}: {e}")
                continue

        results[prompt_id] = generated_files
        completed += len(generated_files)
        print(f" [OK] ({len(generated_files)}/{num_variations})")

    return results

# ============================================================================
# FUNÇÃO DE RELATÓRIO
# ============================================================================

def generate_report(results: Dict[str, List[str]]) -> str:
    """Gera relatório de curadoria com lista de imagens geradas."""

    report = []
    report.append("\n" + "="*70)
    report.append("[OK] RELATORIO DE GERACAO - FAC 2026 PAINEL VISUAL")
    report.append("="*70 + "\n")

    total_generated = sum(len(files) for files in results.values())
    report.append(f"Total gerado: {total_generated} imagens\n")

    report.append("[CURADORIA] Selecione 1 por cena:\n")

    for prompt_id, files in results.items():
        prompt_data = PROMPTS[prompt_id]
        titulo = prompt_data["titulo"]
        report.append(f"\n[{prompt_id}] {titulo}")
        report.append(f"  Arquivos: {len(files)} variações")
        for file in files:
            report.append(f"    → {Path(file).name}")

    report.append("\n" + "="*70)
    report.append("Próximo passo: Selecione a melhor variação de cada cena")
    report.append("Renomear para: THM_img01_Sael.jpg, THM_img02_Cenografia.jpg, etc.")
    report.append("="*70 + "\n")

    return "\n".join(report)

# ============================================================================
# MAIN
# ============================================================================

if __name__ == "__main__":
    try:
        # Verificar API key
        if not os.getenv("OPENAI_API_KEY"):
            raise ValueError("OPENAI_API_KEY não configurada. Configure antes de rodar.")

        # Gerar imagens
        results = generate_images(num_variations=3)

        # Gerar relatório
        report = generate_report(results)
        print(report)

        # Salvar relatório em arquivo
        report_file = OUTPUT_DIR / "RELATORIO_GERACAO.txt"
        with open(report_file, "w", encoding="utf-8") as f:
            f.write(report)

        print(f"\n📋 Relatório salvo em: {report_file}")
        print(f"✅ Geração concluída!\n")

    except Exception as e:
        print(f"\n❌ Erro fatal: {e}")
        exit(1)
