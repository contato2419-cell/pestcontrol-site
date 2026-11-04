// Gera as páginas de serviço, o sitemap e o robots.txt a partir do index.html.
// Rode na raiz do projeto depois de mudar o menu, o rodapé ou os textos abaixo:
//   node tools/gerar-paginas.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SITE = "https://pestcontrolmg.com.br";
// Endereço que já mostra este site. A capa do link (og:image) precisa abrir de verdade,
// então ela usa este endereço até o domínio pestcontrolmg.com.br apontar para a Vercel.
const ONLINE = "https://pestcontrol-flax.vercel.app";
const CIDADE = "Conceição do Mato Dentro";
const index = readFileSync("index.html", "utf8");
const trecho = (de, ate) => {
  const i = index.indexOf(de);
  return index.slice(i, index.indexOf(ate, i) + ate.length);
};
const topo = trecho('<header class="top">', "</header>");
const rodape = index.slice(index.indexOf('<footer class="foot">'), index.indexOf('<script src="/main.js"'));
const cidades = [...index.matchAll(/<li>([^<]+)<\/li>/g)].map((m) => m[1]).filter((c) => !c.includes(" foi "));

const servicos = [
  {
    slug: "dedetizacao",
    nome: "Dedetização",
    titulo: "Dedetização em Conceição do Mato Dentro",
    descricao: "Dedetização de baratas, formigas, aranhas e outras pragas em Conceição do Mato Dentro e região, para casas e empresas. Peça um orçamento.",
    lead: "Controle de baratas, formigas, aranhas e outras pragas, com produto e técnica escolhidos para cada ambiente.",
    img: "supermercado.webp",
    alt: "Técnico da PestControl fazendo dedetização em um supermercado",
    itens: ["Inspeção do local e identificação da praga", "Aplicação planejada para a rotina da casa ou da empresa", "Orientação para evitar novas infestações", "Atendimento para residências, condomínios, comércios e indústrias"],
  },
  {
    slug: "controle-de-escorpioes",
    nome: "Controle de escorpiões",
    titulo: "Controle de escorpiões em Conceição do Mato Dentro",
    descricao: "Inspeção com luz ultravioleta para localizar e capturar escorpiões em Conceição do Mato Dentro e região. Atendimento emergencial pelo WhatsApp.",
    lead: "Inspeção com luz ultravioleta para localizar e capturar os escorpiões, com orientação para evitar que voltem.",
    img: "escorpioes-uv.webp",
    alt: "Escorpiões capturados brilhando sob luz ultravioleta",
    itens: ["Inspeção com luz ultravioleta", "Captura dos escorpiões encontrados", "Identificação de frestas, entulho e pontos de abrigo", "Orientação para proteger a família e os pets"],
  },
  {
    slug: "desratizacao",
    nome: "Desratização",
    titulo: "Desratização em Conceição do Mato Dentro",
    descricao: "Controle de ratos em casas, condomínios e empresas de Conceição do Mato Dentro e região, com identificação de rotas e pontos de entrada.",
    lead: "Identificação das rotas e dos pontos de entrada dos ratos, com orientação de segurança para pessoas e pets.",
    img: "rato.webp",
    alt: "Rato saindo de um ralo",
    itens: ["Identificação das rotas e dos pontos de entrada", "Plano de controle para o local", "Orientação de segurança para pessoas e pets", "Recomendações para evitar que os ratos voltem"],
  },
  {
    slug: "limpeza-de-caixa-dagua",
    nome: "Higienização de caixa d'água",
    titulo: "Limpeza de caixa d'água em Conceição do Mato Dentro",
    descricao: "Limpeza, higienização e desinfecção de caixas d'água e reservatórios em Conceição do Mato Dentro e região. Solicite um orçamento.",
    lead: "Limpeza, higienização e desinfecção de caixas e reservatórios, para a água da sua casa ou empresa.",
    img: "limpeza-reservatorio.webp",
    alt: "Técnico com cinto de segurança limpando um reservatório de água",
    itens: ["Remoção de lodo, biofilme e impurezas", "Higienização para eliminar bactérias e microrganismos", "Desinfecção para deixar a água protegida", "Atendimento para residências, condomínios, empresas e escolas"],
  },
  {
    slug: "teste-de-potabilidade",
    nome: "Teste de potabilidade",
    titulo: "Teste de potabilidade da água em Conceição do Mato Dentro",
    descricao: "Teste de potabilidade da água em Conceição do Mato Dentro e região, para saber se a água está própria para o consumo. Solicite um orçamento.",
    lead: "Avaliação da qualidade da água para você saber se ela está própria para o consumo.",
    img: "potabilidade.webp",
    alt: "Técnico coletando amostra de água da torneira para o teste de potabilidade",
    itens: ["Avaliação da qualidade da água", "Atendimento para casas e empresas", "Orientação sobre os próximos passos"],
  },
  {
    slug: "analise-de-efluentes",
    nome: "Análise de efluentes",
    titulo: "Análise de efluentes em Conceição do Mato Dentro",
    descricao: "Análise de efluentes para empresas e instalações de Conceição do Mato Dentro e região que precisam acompanhar o que é descartado.",
    lead: "Para empresas e instalações que precisam acompanhar o que é descartado.",
    img: "efluentes.webp",
    alt: "Profissional analisando uma amostra de efluente em uma estação de tratamento",
    itens: ["Atendimento para empresas e instalações", "Serviço planejado para a rotina do local", "Orientação sobre os próximos passos"],
  },
];

// Fotos do trabalho em cada página. Troque pelas fotos reais do serviço quando o cliente mandar.
const fotos = {"dedetizacao": [
    ["imperio","Técnico da PestControl dedetizando uma hamburgueria",720,1280],
    ["unificare","Dedetização na recepção de uma clínica odontológica",720,1280],
    ["boutique","Dedetização na entrada de um açougue",720,1280],
    ["aplicacao-casa","Dedetização ao redor de uma casa",640,800]],
  "controle-de-escorpioes": [
    ["escorpioes-mortos-2","Escorpiões mortos recolhidos em um copo depois da aplicação",720,984],
    ["escorpioes-mortos-1","Escorpiões mortos recolhidos depois da dedetização",720,632],
    ["escorpioes-mortos-3","Filhotes de escorpião mortos depois da aplicação",720,754],
    ["escorpioes","Escorpiões mortos sobre uma pedra",720,922]],
  "desratizacao": [
    ["aplicacao-caixa-gordura","Técnico aplicando produto em uma caixa de inspeção",720,1058],
    ["aplicacao-esgoto","Técnico trabalhando em uma tampa de esgoto",720,1280],
    ["aplicacao-externa","Aplicação na área externa de um alojamento",720,1280],
    ["aplicacao-pousada","Aplicação na área externa de um prédio residencial",640,796]],
  "limpeza-de-caixa-dagua": [
    ["caixa-antes","Caixa d'água suja antes da limpeza",720,960,"Antes"],
    ["caixa-depois","Caixa d'água limpa depois da higienização",720,1280,"Depois"],
    ["caixas-instalacao","Caixas d'água atendidas em uma instalação",640,854],
    ["potabilidade","Coleta de amostra de água depois da limpeza",800,600]],
  "teste-de-potabilidade": [
    ["caixas-instalacao","Caixas d'água de uma instalação atendida",640,854],
    ["caixa-depois","Caixa d'água limpa",720,1280],
    ["limpeza-reservatorio","Limpeza de um reservatório de água",640,854],
    ["caixa-antes","Caixa d'água suja antes da limpeza",720,960]],
  "analise-de-efluentes": [
    ["aplicacao-esgoto","Técnico trabalhando em uma tampa de esgoto",720,1280],
    ["aplicacao-caixa-gordura","Técnico em uma caixa de inspeção",720,1058],
    ["aplicacao-externa","Atendimento na área externa de um alojamento",720,1280],
    ["caixas-instalacao","Reservatórios de uma instalação atendida",640,854]]};

const etapas = [
  ["Diagnóstico", "Visitamos o local e identificamos o problema."],
  ["Plano", "Definimos o serviço certo para a sua rotina."],
  ["Execução", "Equipe certificada, uniformizada e com EPIs."],
  ["Acompanhamento", "Orientação para manter o local protegido."],
];

const pagina = (s) => {
  const url = `${SITE}/servicos/${s.slug}/`;
  const titulo = s.titulo.length > 50 ? s.titulo : `${s.titulo} | PestControl`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.nome,
        url,
        description: s.descricao,
        provider: { "@id": `${SITE}/#empresa`, "@type": "LocalBusiness", name: "PestControl Dedetizadora" },
        areaServed: cidades,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: s.nome, item: url },
        ],
      },
    ],
  };
  const outros = servicos.filter((o) => o !== s).map((o) => `<a href="/servicos/${o.slug}/">${o.nome}</a>`).join("\n          ");
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script>document.documentElement.classList.add("js")</script>
  <title>${titulo}</title>
  <meta name="description" content="${s.descricao}" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#0b0b0c" />
  <meta name="geo.region" content="BR-MG" />
  <meta name="geo.placename" content="${CIDADE}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:site_name" content="PestControl" />
  <meta property="og:title" content="${titulo}" />
  <meta property="og:description" content="${s.descricao}" />
  <meta property="og:url" content="${url.replace(SITE, ONLINE)}" />
  <meta property="og:image" content="${ONLINE}/assets/img/capa.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="PestControl, dedetizadora em Conceição do Mato Dentro" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preload" href="/assets/fonts/inter-tight-500.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/style.css" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <a class="skip" href="#conteudo">Pular para o conteúdo</a>

  ${topo}

  <main id="conteudo">
    <section class="page-hero">
      <div class="wrap">
        <nav aria-label="Você está aqui"><ol class="crumbs" style="list-style:none;padding:0;margin-top:0"><li><a href="/">Início</a></li><li>${s.nome}</li></ol></nav>
        <div class="page-hero__in">
          <div>
            <h1 data-words data-now>${s.titulo}</h1>
            <p data-r>${s.lead}</p>
            <div class="hero__btns" data-r>
              <a class="btn btn--main" data-wa="Olá! Gostaria de um orçamento de ${s.nome.toLowerCase()}." href="https://wa.me/553189250451">Solicitar orçamento</a>
              <button class="btn btn--white" type="button" data-emergencia><span class="dot"></span>Atendimento emergencial</button>
            </div>
          </div>
          <img src="/assets/img/${s.img}" alt="${s.alt}" fetchpriority="high" />
        </div>
      </div>
    </section>

    <section class="sec">
      <div class="wrap split2">
        <h2 data-words>O que está <mark class="hl">incluído</mark></h2>
        <ul class="list-check">
          ${s.itens.map((i) => `<li data-r>${i}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="sec sec--tint">
      <div class="wrap">
        <header class="head"><h2 data-words>Fotos do <mark class="hl">trabalho</mark></h2></header>
        <div class="gal gal--svc">
          ${fotos[s.slug].map(([f, alt, w, a, tag]) => `<button class="gal__i" type="button" data-clip><img src="/assets/img/${f}.webp" alt="${alt}" width="${w}" height="${a}" loading="lazy" />${tag ? `<span class="tag">${tag}</span>` : ""}</button>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="sec">
      <div class="wrap">
        <header class="head"><h2 data-words>Como <mark class="hl">funciona</mark></h2></header>
        <ol class="steps" style="list-style:none;padding:0;margin:0">
          ${etapas.map(([t, d]) => `<li data-r><h3>${t}</h3><p>${d}</p></li>`).join("\n          ")}
        </ol>
      </div>
    </section>

    <section class="sec sec--tint">
      <div class="wrap split2">
        <h2 data-words>Onde <mark class="hl">atendemos</mark></h2>
        <p data-r>${s.nome} em ${cidades.slice(0, -1).join(", ")} e ${cidades.at(-1)}.</p>
      </div>
    </section>

    <section class="sec sec--black">
      <div class="wrap">
        <h2 data-words>Solicite um <mark class="hl">orçamento</mark></h2>
        <div class="hero__btns" data-r>
          <a class="btn btn--main" data-wa="Olá! Gostaria de um orçamento de ${s.nome.toLowerCase()}." href="https://wa.me/553189250451">Falar no WhatsApp</a>
        </div>
        <div class="others" data-r>
          ${outros}
        </div>
      </div>
    </section>
  </main>

  ${rodape}
  <script src="/main.js" defer></script>
</body>
</html>
`;
};

for (const s of servicos) {
  mkdirSync(`servicos/${s.slug}`, { recursive: true });
  writeFileSync(`servicos/${s.slug}/index.html`, pagina(s));
}

const hoje = new Date().toISOString().slice(0, 10);
const urls = ["/", ...servicos.map((s) => `/servicos/${s.slug}/`)];
writeFileSync(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${hoje}</lastmod></url>`).join("\n")}
</urlset>
`,
);
writeFileSync("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`${servicos.length} páginas de serviço, sitemap e robots gerados. Cidades: ${cidades.length}`);
