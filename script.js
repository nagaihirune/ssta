// --- ローディング解除 ---
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  setTimeout(() => {
      loading.classList.add('hide');
  }, 1200);
});

// --- スクロールフェードイン ---
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

// --- 背景粒子（まどろみの光） ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

const initCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = Array.from({ length: 55 }, () => ({
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

// --- 天使の輪カーソル制御 ---
const angelCursor = document.getElementById('angel-cursor');
const halo = document.querySelector('.halo');

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateHalo = (time) => {
    // マウスに遅れてついてくる「慣性」の計算 (0.15は追従速度)
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;

    // 上下にふわふわ揺れる動き
    const floating = Math.sin(time * 0.003) * 6;
    
    // 位置更新
    angelCursor.style.left = `${currentX}px`;
    angelCursor.style.top = `${currentY + floating}px`;
    
    // 移動速度に合わせて少しだけ傾ける
    const tilt = (mouseX - currentX) * 0.6;
    if (halo) {
        halo.style.transform = `rotateX(45deg) rotateZ(${tilt}deg)`;
    }
    
    requestAnimationFrame(animateHalo);
};

requestAnimationFrame(animateHalo);