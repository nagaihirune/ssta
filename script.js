// --- ローディング解除 ---
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  setTimeout(() => { loading.classList.add('hide'); }, 1200);
});

// --- スクロールフェードイン ---
const revealSections = () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight * 0.85) { section.classList.add('active'); }
  });
};
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// --- 背景粒子（微睡みの光） ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const initCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speedY: Math.random() * 0.15 + 0.05,
      opacity: Math.random() * 0.3
  }));
};
const animateParticles = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
      p.y -= p.speedY;
      if (p.y < 0) p.y = canvas.height;
      ctx.fillStyle = `rgba(194, 163, 121, ${p.opacity})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
  });
  requestAnimationFrame(animateParticles);
};
window.addEventListener('resize', initCanvas);
initCanvas(); animateParticles();

// --- カスタムカーソル & 羽根の軌跡制御 ---
const angelCursor = document.getElementById('angel-cursor');
let lastX = 0;
let lastY = 0;
let distanceTraveled = 0;

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // ポインターを移動
  angelCursor.style.left = `${mouseX}px`;
  angelCursor.style.top = `${mouseY}px`;

  // 前回位置からの移動距離を計算
  const dist = Math.hypot(mouseX - lastX, mouseY - lastY);
  distanceTraveled += dist;

  // 一定距離（25px）動くごとに羽根を1枚生成
  if (distanceTraveled > 25) {
      createFeather(mouseX, mouseY);
      distanceTraveled = 0;
  }

  lastX = mouseX;
  lastY = mouseY;
});

function createFeather(x, y) {
  const feather = document.createElement('div');
  feather.className = 'trail-feather';
  
  // ランダムな大きさと角度を設定
  const size = Math.random() * 8 + 6;
  const rotation = Math.random() * 360;
  
  feather.style.left = `${x}px`;
  feather.style.top = `${y}px`;
  feather.style.width = `${size}px`;
  feather.style.height = `${size * 0.7}px`;
  feather.style.transform = `rotate(${rotation}deg)`;

  document.body.appendChild(feather);

  // 1.5秒後に要素を消去してメモリを節約
  setTimeout(() => {
      feather.remove();
  }, 1500);
}