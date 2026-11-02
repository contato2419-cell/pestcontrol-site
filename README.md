# PestControl

Site institucional da PestControl, dedetizadora em Conceição do Mato Dentro (MG).

HTML, CSS e JavaScript puros, sem build e sem dependências.

## Rodar na máquina

```bash
npx http-server . -p 4173
```

## Onde mexer

- `index.html`: textos e seções.
- `style.css`: visual. As cores e fontes ficam em `:root`, no início do arquivo.
- `main.js`: menu, janelas, formulário e WhatsApp. O número fica em `WHATS`, na primeira linha.
- `assets/video/`: vídeo do fundo do hero. `hero-desktop.mp4` é o de PC e `hero-mobile.mp4` é o de celular.
- `assets/img/`: fotos e logo.
- `tools/gerar-paginas.mjs`: gera `servicos/`, `sitemap.xml` e `robots.txt`. Depois de mudar o menu, o rodapé ou um serviço, rode `node tools/gerar-paginas.mjs`.

## Publicação

O projeto está ligado à Vercel: todo envio para a branch `main` publica sozinho.
