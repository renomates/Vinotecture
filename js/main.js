/* ============================================================
   Vinotecture — site config. EDIT THESE before going live.
   ============================================================ */
const CONFIG = {
  // Stripe Payment Links (Stripe Dashboard → Payment Links → New). Paste the https://buy.stripe.com/... URLs.
  checkout: {
    single: "STRIPE_LINK_SINGLE",   // The Gallery 100 × 1 — A$649
    pair:   "STRIPE_LINK_PAIR"      // The Gallery 100 × 2 — A$1,199
  },
  // Update by hand as you sell (or leave at 50 until you have real numbers — never fake scarcity).
  racksLeft: 50,
  contactEmail: "hello@vinotecture.com.au"
};

/* ---------- Buy buttons ---------- */
document.querySelectorAll("[data-buy]").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.buy;
    const url = CONFIG.checkout[key];
    if (typeof gtag === "function") gtag("event", "begin_checkout", { item_id: "VT-G100", bundle: key });
    if (url && url.startsWith("https://")) {
      window.location.href = url;
    } else {
      const subject = encodeURIComponent(`Order: Gallery 100 (${key})`);
      window.location.href = `mailto:${CONFIG.contactEmail}?subject=${subject}`;
    }
  });
});

/* ---------- Founding-50 counter ---------- */
document.querySelectorAll("[data-left]").forEach(el => el.textContent = CONFIG.racksLeft);
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

/* ---------- Audience tabs ---------- */
const tabs = document.querySelectorAll('[role="tab"]');
tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(t => {
    const sel = t === tab;
    t.setAttribute("aria-selected", sel);
    const panel = document.getElementById(t.getAttribute("aria-controls"));
    panel.hidden = !sel;
    panel.classList.toggle("active", sel);
    if (sel) panel.classList.add("in");
  });
}));

/* ---------- Mobile menu ---------- */
const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
}

/* ---------- Reveal on scroll ---------- */
const io = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 }) : null;
document.querySelectorAll(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));

/* ---------- Sticky mobile buy bar ---------- */
const bar = document.querySelector(".buybar");
const hero = document.querySelector(".hero");
if (bar && hero) {
  new IntersectionObserver(([e]) => bar.classList.toggle("show", !e.isIntersecting)).observe(hero);
}

/* ---------- Trade form (Formspree or mailto fallback) ---------- */
const form = document.getElementById("trade-form");
if (form) {
  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    const msg = form.querySelector(".form-msg");
    const endpoint = form.dataset.endpoint;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    if (typeof gtag === "function") gtag("event", "generate_lead", { form: "trade" });
    if (!endpoint.startsWith("https://")) {
      const body = [...data.entries()].filter(([k]) => k !== "_gotcha").map(([k, v]) => `${k}: ${v}`).join("\n");
      window.location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent("Trade enquiry")}&body=${encodeURIComponent(body)}`;
      return;
    }
    msg.textContent = "Sending…";
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error();
      form.reset();
      msg.textContent = "Thanks — we'll send trade pricing within one business day.";
    } catch {
      msg.textContent = `Something went wrong. Email us at ${CONFIG.contactEmail}.`;
    }
  });
}

/* ---------- Product photo thumbnails ---------- */
const heroImg = document.getElementById("hero-img");
document.querySelectorAll(".thumb").forEach(t => t.addEventListener("click", () => {
  heroImg.src = t.dataset.src;
  heroImg.alt = t.dataset.alt;
  document.querySelectorAll(".thumb").forEach(o => o.setAttribute("aria-pressed", o === t));
}));
