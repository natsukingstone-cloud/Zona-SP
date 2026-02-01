// ================================
// 0) 共通：DOM取得
// ================================
const heroImage = document.getElementById("heroImage");
const hasHero = !!heroImage;

const DEFAULT_SRC = "images/hero/hero-default.jpeg";

const navLinks = document.querySelectorAll(".nav a[data-image]");
const btn = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

// ================================
// 1) ハンバーガーメニュー開閉
// ================================
if (btn && nav) {
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

// ================================
// 2) Hero画像差し替え
// ================================
if (hasHero) {
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      if (!window.matchMedia("(hover: hover)").matches) return;
      const img = link.dataset.image;
      if (!img) return;
      heroImage.src = `images/hero/${img}`;
    });

    link.addEventListener("mouseleave", () => {
      if (!window.matchMedia("(hover: hover)").matches) return;
      heroImage.src = DEFAULT_SRC;
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (!window.matchMedia("(hover: none)").matches) return;
      const img = link.dataset.image;
      if (!img) return;
      e.preventDefault();
      heroImage.src = `images/hero/${img}`;
    });
  });

  document.addEventListener("click", (e) => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (!nav) return;
    const target = e.target;
    if (target instanceof Element && !nav.contains(target)) {
      heroImage.src = DEFAULT_SRC;
    }
  });

  window.addEventListener("hashchange", () => {
    if (location.hash === "" || location.hash === "#home") {
      heroImage.src = DEFAULT_SRC;
    }
  });
}

// ================================
// 3) Animation: reveal on scroll
// ================================
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach((el) => io.observe(el));
}
