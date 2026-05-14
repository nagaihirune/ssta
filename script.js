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

const angelCursor = document.getElementById('angel-cursor');
const leftWing = document.querySelector('.wing.left');
const rightWing = document.querySelector('.wing.right');

let mouseX = 0;
let mouseY = 0;
let wingRotation = 0;
let lastTime = 0;

// マウス位置を記録
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateWing = (time) => {
    // 時間経過でパタパタさせる（サイン波を利用）
    const wingFlap = Math.sin(time * 0.01) * 30; // 30度くらいの範囲で動く
    
    // カーソル位置を更新（少し遅れてついてくるようにするとふわふわ感が出ます）
    angelCursor.style.left = `${mouseX}px`;
    angelCursor.style.top = `${mouseY}px`;
    
    // 羽根を回転させてパタパタを表現
    leftWing.style.transform = `rotate(${-wingFlap - 20}deg)`;
    rightWing.style.transform = `rotate(${wingFlap + 20}deg)`;
    
    requestAnimationFrame(animateWing);
};

requestAnimationFrame(animateWing);