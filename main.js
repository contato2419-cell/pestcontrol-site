const WHATS = "553189250451";
const waLink = (txt) => `https://wa.me/${WHATS}?text=${encodeURIComponent(txt)}`;

// Troca o vídeo do hero se a tela mudar entre celular e PC (ex.: girar o tablet)
const heroVideo = document.querySelector(".hero__video");
matchMedia("(max-width: 899px)").addEventListener("change", () => heroVideo.load());

const heroPause = document.querySelector(".hero__pause");
heroPause.addEventListener("click", () => {
  if (heroVideo.paused) heroVideo.play();
  else heroVideo.pause();
});
const syncPause = () => {
  heroPause.classList.toggle("is-paused", heroVideo.paused);
  heroPause.setAttribute("aria-label", heroVideo.paused ? "Tocar vídeo" : "Pausar vídeo");
};
heroVideo.addEventListener("play", syncPause);
heroVideo.addEventListener("pause", syncPause);

// No PC, os botões fixos só aparecem depois do hero
const float = document.querySelector(".float");
new IntersectionObserver(([e]) => float.classList.toggle("is-on", !e.isIntersecting)).observe(document.querySelector(".hero"));

// Links de WhatsApp com a mensagem pronta
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});

// Menu do celular
const burger = document.querySelector(".burger");
const nav = document.getElementById("nav");
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
document.querySelectorAll("dialog").forEach((d) => {
  d.querySelector(".dlg__x").addEventListener("click", () => d.close());
  d.addEventListener("click", (e) => {
    const r = d.getBoundingClientRect();
    const fora = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    if (e.target === d && fora) d.close();
  });
});

const emergencia = document.getElementById("emergencia");
document.querySelectorAll("[data-emergencia]").forEach((b) => b.addEventListener("click", () => emergencia.showModal()));

// Galeria ampliada
const lb = document.getElementById("lb");
const lbImg = lb.querySelector("img");
document.querySelectorAll(".gal__i").forEach((b) =>
  b.addEventListener("click", () => {
    const img = b.querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lb.showModal();
  }),
);

// Formulário abre o WhatsApp com tudo preenchido
const cidades = [...document.querySelectorAll(".cities li")].map((li) => li.textContent);
const sel = document.getElementById("cidade");
cidades.forEach((c) => sel.add(new Option(c)));
sel.add(new Option("Outra cidade"));

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const txt = `Olá! Vim pelo site e gostaria de um orçamento.\n\nNome: ${f.get("nome")}\nCidade: ${f.get("cidade")}\nLocal: ${f.get("local")}\nPreciso de: ${f.get("msg")}`;
  window.open(waLink(txt), "_blank", "noopener");
});

document.getElementById("ano").textContent = new Date().getFullYear();
