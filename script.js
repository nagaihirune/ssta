// ===== ローディング画面 =====
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');

  setTimeout(() => {
    loading.classList.add('hide');
  }, 1200);
});

// ===== ハンバーガーメニュー =====
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('nav-overlay');
const navLinks = document.querySelectorAll('.nav-overlay a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navOverlay.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navOverlay.classList.remove('active');
  });
});

// ===== スクロール表示アニメーション =====
function reveal() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 60) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ===== 時計表示 =====
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();

  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');

  clock.textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();

// ===== 今日の曜日をハイライト =====
const days = document.querySelectorAll('.schedule-day');
const today = new Date().getDay();

if (days[today === 0 ? 6 : today - 1]) {
  days[today === 0 ? 6 : today - 1].classList.add('active-day');
}

// ===== 星空背景 =====
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    speed: Math.random() * 0.3 + 0.05
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fill();

    star.y += star.speed;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawStars);
}

drawStars();
