// ====== Configurações (WhatsApp e e-mail) ======
const WHATS_NUMBER = "553399052245"; // +55 33 9905-2245 (somente números)
const EMAIL = "alekvania@guerrasilva.com.br";

// ====== Menu Mobile ======
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  // Fecha menu ao clicar em um item
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}

// ====== WhatsApp ======
function makeWhatsLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATS_NUMBER}?text=${text}`;
}

function openWhats(message) {
  window.location.href = makeWhatsLink(message);
}

// Botões WhatsApp (topo, hero, contato, flutuante, mobile)
const whatsButtonsIds = [
  "btnWhatsTop",
  "btnWhatsHero",
  "btnWhatsContato",
  "btnWhatsFloat",
  "btnWhatsMobile",
];

whatsButtonsIds.forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("click", (e) => {
    e.preventDefault();
    openWhats("Olá! Gostaria de fazer uma cotação. Pode me ajudar?");
  });
});

// ====== Formulário (cotação rápida) ======
const form = document.getElementById("formCotacao");
const statusForm = document.getElementById("statusForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome")?.value?.trim() || "";
    const tipo = document.getElementById("tipo")?.value?.trim() || "";
    const msg = document.getElementById("msg")?.value?.trim() || "";

    if (!nome || !tipo) {
      if (statusForm) statusForm.textContent = "Preencha nome e tipo de seguro.";
      return;
    }

    const message =
      `Olá! Meu nome é ${nome}. ` +
      `Quero cotar: ${tipo}. ` +
      (msg ? `Detalhes: ${msg}` : "");

    if (statusForm) statusForm.textContent = "Abrindo WhatsApp...";
    openWhats(message);
  });
}

// ====== Copiar e-mail ======
const btnCopiarEmail = document.getElementById("btnCopiarEmail");
const statusContato = document.getElementById("statusContato");

if (btnCopiarEmail) {
  btnCopiarEmail.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      if (statusContato) statusContato.textContent = "E-mail copiado!";
    } catch {
      if (statusContato) statusContato.textContent = `Copie manualmente: ${EMAIL}`;
    }
  });
}

// ====== Reveal animation ======
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((el) => observer.observe(el));
