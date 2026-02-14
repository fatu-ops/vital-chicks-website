document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (revealEls.length) {
    const rio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            rio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealEls.forEach((el) => rio.observe(el));
  }

  // Scroll progress under navbar
  const setProgress = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const max = (doc.scrollHeight || 1) - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
    document.documentElement.style.setProperty("--scroll-progress", `${(ratio * 100).toFixed(2)}%`);
  };
  setProgress();
  window.addEventListener("scroll", setProgress, { passive: true });
  window.addEventListener("resize", setProgress);

  // Sticky-navbar-safe scroll helper
  const nav = document.querySelector(".navbar");
  const navOffset = () => (nav ? nav.getBoundingClientRect().height : 72) + 14;

  const scrollToEl = (el) => {
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset();
    window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  };

  // Accordion: only one open at a time
  const accs = Array.from(document.querySelectorAll(".mfg-acc"));
  const openOnly = (id) => {
    accs.forEach((d) => {
      if (d.id === id) d.setAttribute("open", "");
      else d.removeAttribute("open");
    });
  };

  // Ensure only one open on load
  const initiallyOpen = accs.find((d) => d.hasAttribute("open")) || accs[0];
  if (initiallyOpen) openOnly(initiallyOpen.id);

  // Enforce single-open when toggled
  accs.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open) openOnly(d.id);
    });
  });

  // If URL has hash (#s-qa etc.), open it and scroll with offset
  const hash = window.location.hash?.slice(1);
  if (hash) {
    const target = document.getElementById(hash);
    if (target && target.classList.contains("mfg-acc")) {
      openOnly(hash);
      setTimeout(() => scrollToEl(target), 0);
    }
  }

  // Optional micro-polish: tiny lift on hover (safe, not gimmicky)
  // Comment out if you don’t want it.
  if (!prefersReduced) {
    accs.forEach((acc) => {
      acc.addEventListener("mouseenter", () => {
        acc.style.transform = "translateY(-2px)";
        acc.style.transition = "transform .22s var(--ease)";
      });
      acc.addEventListener("mouseleave", () => {
        acc.style.transform = "";
      });
    });
  }
});
