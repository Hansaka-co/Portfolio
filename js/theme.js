/* The synchronous head bootstrap selects a theme before styles paint. */
(() => {
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: light)');
  const toggles = [...document.querySelectorAll('.theme-toggle')];
  function apply(theme) {
    const isLight = theme === 'light';
    root.dataset.theme = theme;
    toggles.forEach(button => {
      button.setAttribute('aria-pressed', String(isLight));
      button.setAttribute('aria-label', isLight
        ? 'Switch to Into the Storm dark mode'
        : 'Switch to After the Storm light mode');
      const copy = button.querySelector('.theme-toggle-copy');
      if (copy) copy.textContent = isLight ? 'INTO THE STORM' : 'AFTER THE STORM';
      const shortCopy = button.querySelector('.theme-toggle-short');
      if (shortCopy) shortCopy.textContent = isLight ? 'DARK' : 'LIGHT';
    });
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
