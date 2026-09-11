/* The Island: visitor-controlled entry into one shared scene; native scroll. */
(() => {
  const hero = document.querySelector('.island-hero');
  if (!hero) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const small = matchMedia('(max-width: 700px)');
  const splash = hero.querySelector('.island-splash');
  const heading = hero.querySelector('h1');
  const nav = document.querySelector('.island-nav');
  const brand = nav.querySelector('.island-mark');
  function positionOpeningBrand() {
    brand.style.transform = 'none';
    const rect = brand.getBoundingClientRect();
    brand.style.setProperty('--brand-x', `${document.documentElement.clientWidth / 2 - rect.left - rect.width / 2}px`);
    brand.style.setProperty('--brand-y', `${Math.min(innerHeight, hero.offsetHeight) * .46 - rect.top - rect.height / 2}px`);
    brand.style.setProperty('--brand-scale', small.matches ? '1.9' : '2.7');
    brand.style.removeProperty('transform');
  }
  function finishIntro(focus = false) {
    if (!hero.classList.contains('is-intro')) {
      if (focus) heading.focus({ preventScroll: true });
      return;
    }
    hero.classList.remove('is-intro');
    nav.classList.remove('is-opening');
    if (!motion.matches) hero.classList.add('is-entering');
    splash.inert = true;
    if (motion.matches) splash.hidden = true;
    else setTimeout(() => { splash.hidden = true; }, 350);
    setTimeout(() => hero.classList.remove('is-entering'), 1000);
    if (focus) requestAnimationFrame(() => heading.focus({ preventScroll: true }));
  }
  splash.querySelector('.island-enter').addEventListener('click', () => finishIntro(true));
  splash.querySelector('.island-splash-skip').addEventListener('click', () => finishIntro(true));
  document.addEventListener('keydown', event => {
    if (!hero.classList.contains('is-intro')) return;
    if (event.key === 'Escape' || event.key === 'Enter') {
      event.preventDefault();
      finishIntro(true);
    }
  });
  nav.addEventListener('click', () => finishIntro());
  document.querySelector('.island-skip').addEventListener('click', () => finishIntro(true));
  if (!location.hash && scrollY < 20) {
    positionOpeningBrand();
    splash.hidden = false;
    hero.classList.add('is-intro');
    nav.classList.add('is-opening');
  }
  addEventListener('resize', () => {
    if (hero.classList.contains('is-intro')) positionOpeningBrand();
  }, { passive: true });

  const menu = nav.querySelector('.island-menu');
  const links = nav.querySelector('.island-links');
  nav.classList.add('is-enhanced');
  function closeMenu(returnFocus = false) {
    links.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    if (returnFocus) menu.focus();
  }
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  nav.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(true); });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) closeMenu(); });
  nav.addEventListener('focusout', e => { if (!nav.contains(e.relatedTarget)) closeMenu(); });
  small.addEventListener('change', () => closeMenu());

  const layers = [...hero.querySelectorAll('[data-depth]')];
  let frame = 0;
  function render() {
    frame = 0;
    const rect = hero.getBoundingClientRect();
    const distance = Math.min(Math.max(-rect.top, 0), rect.height);
    layers.forEach(layer => {
      const offset = motion.matches ? 0 : distance * Number(layer.dataset.depth) * (small.matches ? .2 : 1);
      layer.style.setProperty('--layer-y', `${offset.toFixed(2)}px`);
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(render); }
  addEventListener('scroll', () => {
    if (scrollY > 20) finishIntro();
    schedule();
  }, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  motion.addEventListener('change', () => { schedule(); });
  // Pause ambient CSS motion when the opening is offscreen or the tab is hidden.
  let inView = true;
  function pauseAtmosphere() {
    hero.classList.toggle('is-atmosphere-paused', !inView || document.hidden);
  }
  const visibilityObserver = new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    pauseAtmosphere();
  });
  visibilityObserver.observe(hero);
  document.addEventListener('visibilitychange', pauseAtmosphere);
  addEventListener('pagehide', () => finishIntro());
  render();
})();
