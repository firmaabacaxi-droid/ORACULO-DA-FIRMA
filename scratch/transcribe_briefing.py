import os
import time
import whisper

audio_dir = r"C:\Users\User\Documents\ORACULO _ DOCUMENTOS SOLTOS\AUDIOS BRIEFING BRASIL PARTICIPATIVO"
files = [f for f in os.listdir(audio_dir) if f.endswith(".ogg")]
files.sort()  # Sort chronologically by date/time in the filename

print(f"Encontrados {len(files)} arquivos de áudio para transcrição.")

print("Carregando modelo Whisper 'base'...")
t0 = time.time()
model = whisper.load_model("base")
print(f"Modelo carregado em {time.time() - t0:.2f} segundos.")

output_file = os.path.join(audio_dir, "transcricao_briefing.md")

with open(output_file, "w", encoding="utf-8") as out:
    out.write("# Transcrição dos Áudios de Briefing — Brasil Participativo\n")
    out.write(f"*Gerado automaticamente pelo Oráculo em {time.strftime('%Y-%m-%d %H:%M:%S')}*\n\n")
    out.write("---\n\n")
    
    for i, file_name in enumerate(files, 1):
        file_path = os.path.join(audio_dir, file_name)
        print(f"\n[{i}/{len(files)}] Transcrevendo {file_name}...")
        t_start = time.time()
        
        try:
            result = model.transcribe(file_path, language="pt")
            text = result["text"].strip()
            duration = time.time() - t_start
            
            print(f"Concluído em {duration:.2f}s.")
            print(f"Snippet: {text[:100]}...")
            
            out.write(f"## Áudio {i}: `{file_name}`\n")
            out.write(f"**Tempo de processamento:** {duration:.2f}s\n\n")
            out.write(f"{text}\n\n")
            out.write("---\n\n")
            
        except Exception as e:
            print(f"Erro ao transcrever {file_name}: {e}")
            out.write(f"## Áudio {i}: `{file_name}`\n")
            out.write(f"**Erro no processamento:** {e}\n\n")
            out.write("---\n\n")

print(f"\nTranscrição concluída! Resultados salvos em: {output_file}")
