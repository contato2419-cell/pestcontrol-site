const WHATS = "553189250451";
const waLink = (txt) => `https://wa.me/${WHATS}?text=${encodeURIComponent(txt)}`;
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// Troca o vídeo do hero se a tela mudar entre celular e PC (ex.: girar o tablet)
const heroVideo = $(".hero__video");
if (heroVideo) matchMedia("(max-width: 899px)").addEventListener("change", () => heroVideo.load());

// WordsStagger (Spell UI): separa o texto em palavras que entram uma a uma
$$("[data-words]").forEach((el) => {
  const stagger = el.hasAttribute("data-fast") ? 0.035 : 0.09;
  let i = 0;
  const palavra = (node) => {
    const s = document.createElement("span");
    s.className = "w";
    s.style.setProperty("--d", `${i++ * stagger}s`);
    s.append(node);
    return s;
  };
  [...el.childNodes].forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) {
      const partes = n.textContent.split(/(\s+)/).filter(Boolean);
      n.replaceWith(...partes.map((p) => (p.trim() ? palavra(p) : document.createTextNode(" "))));
    } else {
      // HighlightedText: o fundo sobe depois que a palavra aparece
      n.innerHTML = `<span>${n.innerHTML}</span>`;
      const atraso = i * stagger + 0.35;
      n.style.setProperty("--hd", `${atraso}s`);
      n.replaceWith(palavra(n.cloneNode(true)));
    }
  });
});

// Atraso em cascata para itens vizinhos
$$("[data-r], [data-clip]").forEach((el) => {
  const irmaos = [...el.parentElement.children].filter((c) => c.matches("[data-r], [data-clip]"));
  const n = irmaos.indexOf(el);
  if (n > 0) el.style.setProperty("--d", `${Math.min(n, 6) * 0.07}s`);
});

// Revela cada elemento quando entra na tela
const revela = new IntersectionObserver(
  (itens) => {
    itens.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      revela.unobserve(e.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
);
$$("[data-words], [data-r], [data-clip]").forEach((el) => {
  if (el.hasAttribute("data-now")) requestAnimationFrame(() => el.classList.add("in"));
  else revela.observe(el);
});

// Serviços: a foto ao lado acompanha a linha em destaque
const fotos = $$(".svc__preview img");
const linhas = $$(".row");
const mostra = (n) => fotos.forEach((f, i) => f.classList.toggle("is-on", i === n));
linhas.forEach((l, n) => {
  l.addEventListener("mouseenter", () => mostra(n));
  l.addEventListener("focus", () => mostra(n));
});
if (fotos.length) {
  const meio = new IntersectionObserver(
    (itens) => itens.forEach((e) => e.isIntersecting && mostra(linhas.indexOf(e.target))),
    { rootMargin: "-45% 0px -45% 0px" },
  );
  linhas.forEach((l) => meio.observe(l));
}

// Links de WhatsApp com a mensagem pronta
$$("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});

// Menu do celular
const burger = $(".burger");
const nav = $("#nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", false);
  }
});

// Janelas: fecham no X e clicando fora
$$("dialog").forEach((d) => {
  d.querySelector(".dlg__x").addEventListener("click", () => d.close());
  d.addEventListener("click", (e) => {
    const r = d.getBoundingClientRect();
    const fora = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    if (e.target === d && fora) d.close();
  });
});

const emergencia = $("#emergencia");
$$("[data-emergencia]").forEach((b) => b.addEventListener("click", () => emergencia.showModal()));

// Galeria ampliada
const lb = $("#lb");
const lbImg = lb.querySelector("img");
$$(".gal__i").forEach((b) =>
  b.addEventListener("click", () => {
    const img = b.querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lb.showModal();
  }),
);

// Formulário abre o WhatsApp com tudo preenchido
const form = $("#form");
if (form) {
  const sel = $("#cidade");
  $$(".cities li").forEach((li) => sel.add(new Option(li.textContent)));
  sel.add(new Option("Outra cidade"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const txt = `Olá! Vim pelo site e gostaria de um orçamento.\n\nNome: ${f.get("nome")}\nCidade: ${f.get("cidade")}\nLocal: ${f.get("local")}\nPreciso de: ${f.get("msg")}`;
    window.open(waLink(txt), "_blank", "noopener");
  });
}

$("#ano").textContent = new Date().getFullYear();
