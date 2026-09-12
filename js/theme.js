/* The synchronous head bootstrap selects a theme before styles paint. */
(() => {
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: light)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const toggles = [...document.querySelectorAll('.theme-toggle')];
  const sceneAssets = {
    dark: {
      splash: 'assets/world/island-storm', hero: 'assets/world/island-storm',
      story: 'assets/scenes/story-storm', explorer: 'assets/scenes/explorer-storm',
      signal: 'assets/scenes/signal-storm', horizon: 'assets/scenes/horizon-storm'
    },
    light: {
      splash: 'assets/world/island-dawn', hero: 'assets/world/island-dawn',
      story: 'assets/scenes/story-dawn', explorer: 'assets/scenes/explorer-dawn',
      signal: 'assets/scenes/signal-dawn', horizon: 'assets/scenes/horizon-dawn'
    }
  };
  let themeSwitching = false;
  function apply(theme) {
    const isLight = theme === 'light';
    root.dataset.theme = theme;
    const themeColor = document.getElementById('theme-color');
    if (themeColor) themeColor.content = isLight ? '#D8D1C3' : '#06131E';
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
  function currentScene() {
    const hero = document.getElementById('home');
    if (hero?.classList.contains('is-intro')) return 'splash';
    const scenes = [
      ['home', 'hero'], ['journey', 'story'], ['work', 'story'], ['field-notes', 'story'],
      ['about', 'explorer'], ['capabilities', 'story'], ['trail', 'story'], ['tools', 'story'],
      ['contact', 'signal'], ['horizon', 'horizon']
    ];
    const focusLine = innerHeight * .5;
    return scenes.find(([id]) => {
      const rect = document.getElementById(id)?.getBoundingClientRect();
      return rect && rect.top <= focusLine && rect.bottom >= focusLine;
    })?.[1] || 'hero';
  }
  function sceneUrl(theme, scene) {
    const suffix = innerWidth <= 700 ? '-768' : innerWidth > 1400 ? '' : '-1280';
    return new URL(`${sceneAssets[theme][scene]}${suffix}.webp`, document.baseURI).href;
  }
  function preload(url) {
    return new Promise(resolve => {
      const image = new Image();
      const done = () => resolve();
      image.onload = done;
      image.onerror = done;
      image.src = url;
      if (image.complete) done();
    });
  }
  async function switchTheme(theme) {
    if (themeSwitching || theme === root.dataset.theme) return;
    themeSwitching = true;
    const scene = currentScene();
    const incoming = sceneUrl(theme, scene);
    const commit = async () => {
      await Promise.race([preload(incoming), new Promise(resolve => setTimeout(resolve, 900))]);
      apply(theme);
    };
    try {
      if (reducedMotion.matches) {
        apply(theme);
      } else if (document.startViewTransition) {
        await document.startViewTransition(commit).finished;
      } else {
        const overlay = document.createElement('span');
        overlay.className = 'theme-scene-fallback';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.style.setProperty('--theme-scene-leaving', getComputedStyle(root).getPropertyValue(`--scene-${scene}`));
        document.body.append(overlay);
        await commit();
        requestAnimationFrame(() => overlay.classList.add('is-fading'));
        setTimeout(() => overlay.remove(), 760);
      }
      try { localStorage.setItem('portfolio-v2-theme', theme); } catch (_) { /* Session-only fallback. */ }
    } finally {
      themeSwitching = false;
    }
  }
  apply(root.dataset.theme || 'dark');
  toggles.forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      switchTheme(theme);
    });
  });
  const sceneSections = [...document.querySelectorAll('#journey,#work,#field-notes,#about,#capabilities,#trail,#tools,#contact,#horizon')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('scene-ready', entry.isIntersecting));
    }, { rootMargin: '90% 0px' });
    sceneSections.forEach(section => sceneObserver.observe(section));
  } else {
    sceneSections.forEach(section => section.classList.add('scene-ready'));
  }
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
