// ===== ローディング解除 =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hide');
    reveal(); // 初回チェック
    highlightToday(); // 曜日ハイライト
  }, 2200);
});

// ===== 星空アニメーション =====
(function initStars() {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 150;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.1 + 0.02,
      flicker: Math.random() * 0.01
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.y -= s.speed;
      if (s.y < 0) s.y = canvas.height;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 190, 255, ${0.3 + Math.abs(Math.sin(Date.now() * s.flicker))})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

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

// ===== スクロール表示（reveal） =====
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add('active');
    }
  });
}
window.addEventListener('scroll', reveal);

// ===== 曜日ハイライト =====
function highlightToday() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const todayName = days[new Date().getDay()];
  const scheduleDays = document.querySelectorAll('.schedule-day');

  scheduleDays.forEach(day => {
    if (day.querySelector('.day-name').textContent === todayName) {
      day.classList.add('active-day');
    }
  });
}

// ===== 時刻表示 =====
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();