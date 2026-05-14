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
  particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2.5,
    speedY: Math.random() * 0.15 + 0.05,
    opacity: Math.random() * 0.5
  }));
};

const animateParticles = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.y -= p.speedY;
    if (p.y < 0) p.y = canvas.height;
    p.x += Math.sin(p.y * 0.01) * 0.2;
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

// --- 天使の羽根（ハート型）カーソル制御 ---
const angelCursor = document.getElementById('angel-cursor');
const leftWing = document.querySelector('.wing.left');
const rightWing = document.querySelector('.wing.right');

let mouseX = 0;
let mouseY = 0;

// マウス位置を常に取得
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const animateWing = (time) => {
  // 羽ばたきの速度を少しゆっくり（0.006）、角度を上品に（15）調整
  const wingFlap = Math.sin(time * 0.006) * 15;
  
  // カーソル（angel-cursor）をマウス位置に移動
  angelCursor.style.left = `${mouseX}px`;
  angelCursor.style.top = `${mouseY}px`;
  
  // 羽根の回転を更新。初期角度（-15deg / 15deg）により、
  // 止まっているときもハートの形を維持しやすくなります。
  if (leftWing && rightWing) {
    leftWing.style.transform = `rotate(${-wingFlap - 15}deg)`;
    rightWing.style.transform = `rotate(${wingFlap + 15}deg)`;
  }
  
  requestAnimationFrame(animateWing);
};

// アニメーション開始
requestAnimationFrame(animateWing);