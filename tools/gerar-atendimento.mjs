// Gera atendimento/index.html: a página que o WhatsApp manda no primeiro contato.
// Rode na raiz do projeto: node tools/gerar-atendimento.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ONLINE = "https://pestcontrol-flax.vercel.app";
const index = readFileSync("index.html", "utf8");
const trecho = (de, ate) => {
  const i = index.indexOf(de);
  return index.slice(i, index.indexOf(ate, i) + ate.length);
};
const G = trecho('<svg class="gl"', "</svg>");
const emergencia = trecho('<dialog data-lenis-prevent class="dlg" id="emergencia"', "</dialog>");
const lb = trecho('<dialog data-lenis-prevent class="lb" id="lb"', "</dialog>");
const zap = trecho('<svg viewBox="0 0 24 24" width="30" height="30"', "</svg>");
const est = '<span class="stars" aria-label="5 estrelas">★★★★★</span>';
const instagram = "https://instagram.com/pestcontrol_cmd";

const pragas = [
  ["escorpiao", "Escorpiões", "controle-de-escorpioes"], ["barata", "Baratas", "dedetizacao"], ["rato", "Ratos", "desratizacao"], ["formiga", "Formigas", "dedetizacao"], ["aranha", "Aranhas", "dedetizacao"],
  ["cupim", "Cupins", "dedetizacao"], ["pulga", "Pulgas e carrapatos", "dedetizacao"], ["traca", "Traças", "dedetizacao"], ["lacraia", "Lacraias", "dedetizacao"], ["percevejo", "Percevejos de cama", "dedetizacao"],
];
const agua = [
  ["caixas-instalacao", "limpeza-de-caixa-dagua", "Limpeza de caixa d'água", "Limpeza, higienização e desinfecção de caixas e reservatórios.", "Caixas d'água atendidas pela PestControl", 640, 854],
  ["potabilidade", "teste-de-potabilidade", "Teste de potabilidade", "Saiba se a água está própria para o consumo.", "Coleta de amostra de água para o teste de potabilidade", 800, 600],
  ["efluentes", "analise-de-efluentes", "Análise de efluentes", "Para empresas que precisam acompanhar o que é descartado.", "Análise de uma amostra de efluente", 547, 366],
];
const avaliacoes = [
  ["Julia Lessa", "#d93025", "Ótimo serviço, depois que vieram aqui em casa eu não achei mais nenhum escorpião"],
  ["Victor Hugo Sousa", "#e37400", "A qualidade do serviço e atendimento foram maravilhosos. Resolveram o problema que tínhamos com formigas e insetos. Super recomendo!!!!"],
  ["Hudson Ribeiro", "#00796b", "Recomendo 100% serviço excelente, fomos atendidos a uns 6 meses e até hj nenhum inseto, que no nosso caso é fundamental."],
];
const provas = [
  ["escorpioes-mortos-2", "Escorpiões mortos recolhidos depois da aplicação", 720, 984],
  ["escorpioes-mortos-3", "Filhotes de escorpião mortos depois da aplicação", 720, 754],
  ["caixa-antes", "Caixa d'água suja antes da limpeza", 720, 960, "Antes"],
  ["caixa-depois", "Caixa d'água limpa depois da higienização", 720, 1280, "Depois"],
  ["imperio", "Dedetização em uma hamburgueria", 720, 1280],
  ["unificare", "Dedetização em uma clínica odontológica", 720, 1280],
];

const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script>document.documentElement.classList.add("js")</script>
  <title>Atendimento PestControl | Escolha o serviço</title>
  <meta name="description" content="Escolha o serviço e fale com a PestControl pelo WhatsApp. Dedetizadora mais bem avaliada de Conceição do Mato Dentro." />
  <meta name="robots" content="noindex" />
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#0b0b0c" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:site_name" content="PestControl" />
  <meta property="og:title" content="Atendimento PestControl: escolha o serviço" />
  <meta property="og:description" content="Toque no serviço que você precisa e fale com a gente pelo WhatsApp." />
  <meta property="og:url" content="${ONLINE}/atendimento/" />
  <meta property="og:image" content="${ONLINE}/assets/img/capa.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="PestControl, dedetizadora em Conceição do Mato Dentro" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preload" href="/assets/fonts/inter-tight-500.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/style.css" />
</head>
<body class="zap">
  <main>
    <section class="zap__top">
      <div class="zap__in">
        <a href="/" aria-label="PestControl, ver o site"><img class="zap__logo" src="/assets/img/logo.png" alt="PestControl" width="440" height="75" /></a>
        <h1 data-words data-now>Seja <mark class="hl">bem-vindo</mark>!</h1>
        <p data-r>Para agilizar o seu atendimento, toque no serviço que você precisa e veja como trabalhamos. De lá você já fala com a gente pelo WhatsApp.</p>
        <a class="zap__badge" href="#avaliacoes" data-r>${G}<span>${est}<b>A mais bem avaliada de Conceição do Mato Dentro</b><small>5,0 com 40 avaliações no Google</small></span></a>
      </div>
    </section>

    <section class="zap__sec">
      <div class="zap__in">
        <h2 data-words>Controle de <mark class="hl">pragas</mark></h2>
        <ul class="pests zap__pests">${pragas.map(([k, n, p]) => `
          <li data-r><a class="pest" href="/servicos/${p}/"><img src="/assets/img/pragas/${k}.webp" alt="${n}" loading="lazy" width="400" height="300" /><span>${n}</span></a></li>`).join("")}
        </ul>
      </div>
    </section>

    <section class="zap__sec zap__sec--tint">
      <div class="zap__in">
        <h2 data-words>Água e <mark class="hl">efluentes</mark></h2>
        <ul class="zap__agua">${agua.map(([f, p, n, d, alt, w, a]) => `
          <li data-r><a class="zap__svc" href="/servicos/${p}/"><img src="/assets/img/${f}.webp" alt="${alt}" loading="lazy" width="${w}" height="${a}" /><span><b>${n}</b><small>${d}</small></span></a></li>`).join("")}
        </ul>
        <a class="zap__outro" data-wa="Olá! Vim pelo link de atendimento e tenho outra dúvida." href="https://wa.me/553189250451" data-r>Não achou o que precisa? Fale com a gente</a>
      </div>
    </section>

    <section class="zap__sec zap__sec--black" id="avaliacoes">
      <div class="zap__in">
        <p class="eyebrow" data-r>A mais bem avaliada de Conceição do Mato Dentro</p>
        <h2 data-words>Nota <mark class="hl">5,0</mark> no Google</h2>
        <div class="zap__revs">${avaliacoes.map(([n, cor, t]) => `
          <article class="rev" data-r>
            <header class="rev__top"><span class="rev__av" style="background:${cor}">${n[0]}</span><span class="rev__who"><b>${n}</b><small>Avaliação no Google</small></span>${G}</header>
            ${est}
            <p>${t}</p>
          </article>`).join("")}
        </div>
      </div>
    </section>

    <section class="zap__sec">
      <div class="zap__in">
        <h2 data-words>Nosso trabalho em <mark class="hl">fotos</mark></h2>
        <div class="zap__provas">${provas.map(([f, alt, w, a, tag]) => `
          <button class="gal__i" type="button" data-clip><img src="/assets/img/${f}.webp" alt="${alt}" width="${w}" height="${a}" loading="lazy" />${tag ? `<span class="tag">${tag}</span>` : ""}</button>`).join("")}
        </div>
      </div>
    </section>

    <section class="zap__sec zap__sec--tint">
      <div class="zap__in">
        <h2 data-words>Ainda não <mark class="hl">conhece</mark> a gente?</h2>
        <p class="zap__txt" data-r>Veja nossos serviços do dia a dia no Instagram ou conheça o site completo.</p>
        <div class="zap__links" data-r>
          <a class="btn btn--black btn--full" href="${instagram}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>Instagram @pestcontrol_cmd</a>
          <a class="btn btn--white btn--full" href="/">Ver o site completo</a>
          <button class="btn btn--main btn--full" type="button" data-emergencia><span class="dot"></span>Atendimento emergencial</button>
        </div>
      </div>
    </section>
  </main>

  <footer class="zap__foot">
    <p>PestControl · R. Olinto Carlota, 15, Conceição do Mato Dentro, MG</p>
    <p>Segunda a sexta 8h às 17h · Sábado 8h às 12h</p>
  </footer>

  <a class="wa" data-wa="Olá! Vim pelo link de atendimento." href="https://wa.me/553189250451" aria-label="Falar no WhatsApp">
    ${zap}
  </a>

  ${emergencia}

  ${lb}

  <script src="/assets/js/lenis.min.js" defer></script>
  <script src="/main.js" defer></script>
</body>
</html>
`;

mkdirSync("atendimento", { recursive: true });
writeFileSync("atendimento/index.html", html);
console.log("atendimento/index.html gerado");
