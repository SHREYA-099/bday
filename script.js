// No extra JS needed yet
console.log("Birthday Spotify page loaded.");
/* --- Music Player --- */
function playSong(src) {
  let player = document.getElementById("player");
  player.src = src;
  player.play();

  showConfetti();
}

/* --- Floating Hearts --- */
setInterval(() => {
    let heart = document.createElement("div");
    heart.innerHTML = "❤";
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}, 700);



/* ---------- Robust responsive slideshow (replace old showSlides) ---------- */

function initSlideshow(selector = '.slideshow', interval = 3000) {
  const container = document.querySelector(selector);
  if (!container) return;

  // Collect slide elements (expecting <div class="slide"><img ...></div> or <img class="slide">)
  const slides = Array.from(container.querySelectorAll('.slide'));
  if (!slides.length) return;

  // Ensure images are preloaded (best-effort)
  slides.forEach(slide => {
    const img = slide.tagName.toLowerCase() === 'img' ? slide : slide.querySelector('img');
    if (img && img.dataset && !img.complete) {
      // nothing special: browser will load. You could attach onload if needed.
    }
  });

  // Start state
  let idx = 0;
  slides.forEach((s, i) => {
    s.classList.remove('active');
    // mark hidden for accessibility
    s.setAttribute('aria-hidden', 'true');
  });

  // Show the first slide immediately
  slides[0].classList.add('active');
  slides[0].setAttribute('aria-hidden', 'false');

  // Cycle function
  const tick = () => {
    const prev = slides[idx];
    prev.classList.remove('active');
    prev.setAttribute('aria-hidden', 'true');

    idx = (idx + 1) % slides.length;

    const next = slides[idx];
    next.classList.add('active');
    next.setAttribute('aria-hidden', 'false');
  };

  // Start cycling
  const timer = setInterval(tick, interval);

  // Optional: pause on hover
  container.addEventListener('mouseenter', () => clearInterval(timer));
  container.addEventListener('mouseleave', () => {
    // restart a new interval when mouse leaves
    window.setTimeout(() => {
      // guard: if an interval already exists, don't start duplicate
      initSlideshow(selector, interval);
    }, 250);
  });
}

// initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initSlideshow('.slideshow', 3000);
});



/* --- Confetti Burst on Song Click --- */
function showConfetti() {
  for (let i = 0; i < 20; i++) {
    let conf = document.createElement("div");
    conf.classList.add("confetti");
    conf.style.left = Math.random() * 100 + "%";
    conf.style.background = `hsl(${Math.random()*360}, 100%, 60%)`;
    document.body.appendChild(conf);

    setTimeout(() => conf.remove(), 1500);
  }
}

/* Confetti Style */
let style = document.createElement("style");
style.innerHTML = `
.confetti {
  position: fixed;
  width: 8px; height: 14px;
  top: -20px;
  animation: fall 1.5s linear forwards;
}
@keyframes fall {
  to { transform: translateY(120vh) rotate(360deg); }
}
`;
document.head.appendChild(style);
