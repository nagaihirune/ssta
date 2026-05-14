// 1. ローディング解除の処理[cite: 1]
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  setTimeout(() => {
      loading.classList.add('hide');
  }, 1200);
});

// 2. スクロールに応じたフェードイン演出 (Reveal効果)[cite: 1]
const revealSections = () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (sectionTop < windowHeight * 0.85) {
          section.classList.add('active');
      }
  });
};
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// 3. 背景の浮遊粒子アニメーション[cite: 1]
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

const initCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // 粒子の生成[cite: 1]
  particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speedY: Math.random() * 0.2 + 0.1,
      opacity: Math.random() * 0.4
  }));
};

const animateParticles = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
      p.y -= p.speedY; // 上へ昇る[cite: 1]
      if (p.y < 0) p.y = canvas.height;
      
      ctx.fillStyle = `rgba(194, 163, 121, ${p.opacity})`; // 金色の粒子[cite: 1]
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
  });
  requestAnimationFrame(animateParticles);
};

window.addEventListener('resize', initCanvas);
initCanvas();
animateParticles();