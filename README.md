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
- `main.js`: rolagem suave (Lenis, em `assets/js/lenis.min.js`), menu, janelas, formulário e WhatsApp. O número fica em `WHATS`, na primeira linha.
- `assets/video/`: vídeo do fundo do hero. `hero-desktop.mp4` é o de PC e `hero-mobile.mp4` é o de celular.
- `assets/img/`: fotos e logo.
- `tools/gerar-paginas.mjs`: gera `servicos/`, `sitemap.xml` e `robots.txt`. Depois de mudar o menu, o rodapé ou um serviço, rode `node tools/gerar-paginas.mjs`.

## Publicação

O projeto está ligado à Vercel: todo envio para a branch `main` publica sozinho.

## Ícone e capa do link

- `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest` e `assets/img/icon-*.png`: ícone da aba e do celular.
- `assets/img/capa.jpg` (1200x630): imagem que aparece ao compartilhar o link no WhatsApp, Instagram e Facebook.
- A capa usa o endereço da Vercel (`ONLINE` em `tools/gerar-paginas.mjs` e o `og:image` do `index.html`). Quando o domínio pestcontrolmg.com.br apontar para a Vercel, troque esse endereço pelo domínio e rode o gerador de novo.
