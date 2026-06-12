const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== 1. Preloader ===== */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('done'), reduceMotion ? 0 : 900);
});

/* ===== 2. Build the hero spider web + self-drawing animation ===== */
(function buildWeb() {
  const g = document.getElementById('web-lines');
  if (!g) return;
  const cx = 300, cy = 300, R = 282, SPOKES = 14, RINGS = 9;
  const ns = 'http://www.w3.org/2000/svg';
  const angles = [];

  for (let i = 0; i < SPOKES; i++) {
    const a = (i / SPOKES) * Math.PI * 2 - Math.PI / 2;
    angles.push(a);
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', cx); line.setAttribute('y1', cy);
    line.setAttribute('x2', (cx + R * Math.cos(a)).toFixed(1));
    line.setAttribute('y2', (cy + R * Math.sin(a)).toFixed(1));
    g.appendChild(line);
  }
  for (let r = 1; r <= RINGS; r++) {
    const rad = (r / RINGS) * R * 0.97;
    let d = '';
    for (let i = 0; i <= SPOKES; i++) {
      const a1 = angles[i % SPOKES];
      const x1 = cx + rad * Math.cos(a1), y1 = cy + rad * Math.sin(a1);
      if (i === 0) { d += `M ${x1.toFixed(1)} ${y1.toFixed(1)} `; continue; }
      const amid = angles[(i - 1) % SPOKES] + (Math.PI / SPOKES);
      const sag = rad * 0.93;
      d += `Q ${(cx + sag * Math.cos(amid)).toFixed(1)} ${(cy + sag * Math.sin(amid)).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)} `;
    }
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', d);
    path.setAttribute('opacity', (0.35 + r / RINGS * 0.5).toFixed(2));
    g.appendChild(path);
  }

  if (!reduceMotion) {
    [...g.children].forEach((el, i) => {
      const len = el.getTotalLength();
      el.style.setProperty('--len', len.toFixed(0));
      el.style.setProperty('--d', (0.35 + i * 0.05).toFixed(2) + 's');
    });
    g.classList.add('draw-in');
  }
})();

/* ===== 3. Letter-stagger hero name ===== */
document.querySelectorAll('[data-splittext]').forEach(el => {
  const text = el.textContent.trim();
  el.textContent = '';
  [...text].forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = 'ch';
    s.style.setProperty('--i', i);
    s.textContent = ch;
    el.appendChild(s);
  });
});

/* ===== 4. Particle web background (mouse-reactive) ===== */
(function webfield() {
  const canvas = document.getElementById('webfield');
  if (!canvas || reduceMotion) { canvas?.remove(); return; }
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  const mouse = { x: -9999, y: -9999 };
  const COUNT = window.innerWidth < 820 ? 36 : 80;
  const LINK = 130;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < COUNT; i++) {
    pts.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.6 + .6
    });
  }
  window.addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });

  let running = true;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) tick(); });

  function tick() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(180,170,255,.8)';
      ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(139,92,246,${(1 - d / LINK) * .35})`;
          ctx.lineWidth = .7;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      // threads to the cursor — the visitor becomes part of the web
      const dm = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
      if (dm < LINK * 1.4) {
        ctx.strokeStyle = `rgba(199,202,255,${(1 - dm / (LINK * 1.4)) * .5})`;
        ctx.lineWidth = .8;
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ===== 5. Scroll-progress spider ===== */
(function scrollSpider() {
  const wrap = document.getElementById('scroll-spider');
  if (!wrap || reduceMotion) { wrap?.remove(); return; }
  const thread = wrap.querySelector('.ss-thread');
  let ticking = false;
  function update() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    thread.style.height = (60 + p * (innerHeight - 170)) + 'px';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* ===== 6. Mobile nav toggle ===== */
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

/* ===== 7. Active nav link on scroll ===== */
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const setActive = id => navLinks.forEach(l =>
  l.classList.toggle('active', l.getAttribute('href') === '#' + id)
);
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

/* ===== 8. Scroll reveal (with chip stagger) ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      if (e.target.classList.contains('skill-chips')) {
        [...e.target.children].forEach((li, i) => li.style.setProperty('--i', i));
      }
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== 9. 3D tilt on hex cards ===== */
if (!reduceMotion && matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.tilt').forEach(card => {
    const frame = card.querySelector('.hex-frame');
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      frame.style.transform = `rotateY(${px * 16}deg) rotateX(${-py * 16}deg) translateY(-8px)`;
    });
    card.addEventListener('pointerleave', () => { frame.style.transform = ''; });
  });

  /* ===== 10. Magnetic buttons ===== */
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * .18}px, ${y * .3}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });

  /* ===== 11. Custom cursor ===== */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let rx = innerWidth / 2, ry = innerHeight / 2, tx = rx, ty = ry;
  window.addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left = tx + 'px'; dot.style.top = ty + 'px';
  });
  (function followRing() {
    rx += (tx - rx) * .16; ry += (ty - ry) * .16;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(followRing);
  })();
  document.querySelectorAll('a, button, .skill-chips li, .hex-card').forEach(el => {
    el.addEventListener('pointerenter', () => ring.classList.add('hovering'));
    el.addEventListener('pointerleave', () => ring.classList.remove('hovering'));
  });
}

/* ===== 12. Footer year ===== */
document.getElementById('year').textContent = new Date().getFullYear();
