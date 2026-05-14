// ローディング解除
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  setTimeout(() => {
      loading.classList.add('hide');
  }, 1200);
});

// スクロールフェードイン
const revealSections = () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight * 0.85) {
          section.classList.add('active');
      }
  });
};
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// 背景粒子
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

const initCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
      p.y -= p.speedY;
      if (p.y < 0) p.y = canvas.height;
      ctx.fillStyle = `rgba(194, 163, 121, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
  });
  requestAnimationFrame(animateParticles);
};

window.addEventListener('resize', initCanvas);
initCanvas();
animateParticles();

// --- 片羽のカーソル制御 ---
const angelCursor = document.getElementById('angel-cursor');
const leftWing = document.querySelector('.wing.left');

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateWing = (time) => {
    // 呼吸するようにゆらゆら揺れる
    const wingSwing = Math.sin(time * 0.003) * 8;
    
    // マウス位置に追従
    angelCursor.style.left = `${mouseX}px`;
    angelCursor.style.top = `${mouseY}px`;
    
    // ペンのように少し斜めを向かせる
    if (leftWing) {
        leftWing.style.transform = `rotate(${wingSwing - 15}deg)`;
    }
    
    requestAnimationFrame(animateWing);
};

requestAnimationFrame(animateWing);