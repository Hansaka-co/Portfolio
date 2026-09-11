/* The synchronous head bootstrap selects a theme before styles paint. */
(() => {
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: light)');
  const toggles = [...document.querySelectorAll('.theme-toggle')];
  function apply(theme) {
    root.dataset.theme = theme;
    toggles.forEach(button => button.setAttribute('aria-pressed', String(theme === 'light')));
  }
  apply(root.dataset.theme || 'dark');
  toggles.forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      apply(theme);
      try { localStorage.setItem('portfolio-v2-theme', theme); } catch (_) { /* Session-only fallback. */ }
    });
  });
  system.addEventListener('change', event => {
    let saved;
    try { saved = localStorage.getItem('portfolio-v2-theme'); } catch (_) {}
    if (saved !== 'dark' && saved !== 'light') apply(event.matches ? 'light' : 'dark');
  });
  addEventListener('storage', event => {
    if (event.key === 'portfolio-v2-theme') apply(event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : system.matches ? 'light' : 'dark');
  });
  requestAnimationFrame(() => root.classList.add('theme-ready'));
})();
