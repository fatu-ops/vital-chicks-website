document.addEventListener("DOMContentLoaded", () => {
  // footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // reveal elements (make visible on scroll)
  const revealEls = Array.from(document.querySelectorAll(".reveal"));

  // If user prefers reduced motion, show immediately
  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
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
  } else {
    // Fallback: if IntersectionObserver not supported
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // scroll progress bar under nav
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
});
