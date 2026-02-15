document.addEventListener("DOMContentLoaded", () => {
  // 1) Active nav link based on current page
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.setAttribute("aria-current", "page");
  });

  // 2) Reveal-on-scroll animations
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));

  // 3) Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;
  
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    
    lastScroll = currentScroll;
  });

  // 4) Video Hero Shrink Effect on Scroll
  const videoHeroWrapper = document.querySelector(".video-hero-wrapper");
  const muteButton = document.getElementById("muteButton");
  
  if (videoHeroWrapper) {
    window.addEventListener("scroll", () => {
      const scrollY = window.pageYOffset;
      const triggerPoint = window.innerHeight * 0.3; // Trigger at 30% scroll
      
      if (scrollY > triggerPoint) {
        videoHeroWrapper.classList.add("shrink");
        if (muteButton) muteButton.classList.add("hidden");
      } else {
        videoHeroWrapper.classList.remove("shrink");
        if (muteButton) muteButton.classList.remove("hidden");
      }
    });
  }

  // 5) Mute/Unmute Button
  const heroVideo = document.getElementById("heroVideo");
  const muteIcon = document.getElementById("muteIcon");
  const unmuteIcon = document.getElementById("unmuteIcon");

  if (heroVideo && muteButton) {
    // Start muted due to autoplay policies
    heroVideo.muted = true;
    muteIcon.style.display = "none";
    unmuteIcon.style.display = "block";

    muteButton.addEventListener("click", () => {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        muteIcon.style.display = "block";
        unmuteIcon.style.display = "none";
      } else {
        heroVideo.muted = true;
        muteIcon.style.display = "none";
        unmuteIcon.style.display = "block";
      }
    });
  }
});

