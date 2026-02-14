document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealEls.forEach((el) => io.observe(el));
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

  // Premium cursor glow on cards (subtle, export-credible)
  const cards = Array.from(document.querySelectorAll(".pcard"));
  if (!prefersReduced) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 100;
        const my = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty("--mx", `${mx}%`);
        card.style.setProperty("--my", `${my}%`);
      });
    });
  }

  // Search filter
  const input = document.getElementById("productSearch");
  const empty = document.getElementById("productsEmpty");

  const filter = (q) => {
    const query = (q || "").trim().toLowerCase();
    let shown = 0;

    cards.forEach((card) => {
      const title = (card.dataset.title || "").toLowerCase();
      const tags = (card.dataset.tags || "").toLowerCase();
      const text = (card.innerText || "").toLowerCase();

      const match = !query || title.includes(query) || tags.includes(query) || text.includes(query);
      card.style.display = match ? "" : "none";
      if (match) shown += 1;
    });

    if (empty) empty.hidden = shown !== 0;
  };

  if (input) {
    input.addEventListener("input", () => filter(input.value));
  }
});
