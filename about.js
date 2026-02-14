document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll(".tlong-item"));
  if (!items.length) return;

  const setActive = (activeEl) => {
    items.forEach((el) => el.classList.toggle("is-active", el === activeEl));
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

      if (!visible?.target) return;

      setActive(visible.target);
    },
    { threshold: [0.25, 0.4, 0.55] }
  );

  items.forEach((el) => io.observe(el));

  // optional: set the first item active initially
  setActive(items[0]);
});
const images = document.querySelectorAll(".tlong-image");

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

images.forEach(img => io.observe(img));
