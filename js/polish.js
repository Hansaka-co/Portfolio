/* Final progressive enhancement: native scroll remains authoritative. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 700px)');
  const nav = document.querySelector('.island-nav');
  const story = document.querySelector('.v2-story');
  const trail = document.querySelector('.trail-list');
  const projects = [...document.querySelectorAll('.v2-project')];
  const atmosphericSections = [...document.querySelectorAll('.v2-work,.v2-capabilities,.v2-trail,.v2-tools,.v2-signal,.v2-horizon')];
  const revealTargets = [
    ...document.querySelectorAll('.v2-section-header,.v2-project,.v2-notes-section .v2-field-notes,.v2-about-grid,.capability-list>div,.trail-list>li,.tool-groups>section,.signal-grid>*,.horizon-top,.horizon-bottom')
  ];
  let frame = 0;

  revealTargets.forEach((element, index) => {
    element.classList.add('polish-reveal');
    element.style.setProperty('--reveal-index', String(index % 4));
  });

  if ('IntersectionObserver' in window && !reduced.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    revealTargets.forEach(element => revealObserver.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add('is-visible'));
  }
  document.documentElement.classList.add('polish-ready');

  function clamp(value) { return Math.max(0, Math.min(1, value)); }
  function update() {
    frame = 0;
    nav?.classList.toggle('is-scrolled', scrollY > 48);
    if (reduced.matches) return;

    if (story) {
      const rect = story.getBoundingClientRect();
      const progress = clamp((innerHeight * .78 - rect.top) / Math.max(rect.height, 1));
      story.querySelectorAll('.v2-waypoints span').forEach((word, index, words) => {
        word.classList.toggle('is-reached', progress >= (index + 1) / (words.length + 1));
      });
    }

    projects.forEach(project => {
      const rect = project.getBoundingClientRect();
      const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
      project.style.setProperty('--project-progress', progress.toFixed(3));
    });

    if (trail) {
      const rect = trail.getBoundingClientRect();
      const progress = clamp((innerHeight * .55 - rect.top) / Math.max(rect.height, 1));
      trail.style.setProperty('--trail-progress', progress.toFixed(3));
      const focusLine = innerHeight * .52;
      let closest = null;
      let closestDistance = Infinity;
      trail.querySelectorAll(':scope > li').forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const distance = Math.abs(itemRect.top + itemRect.height / 2 - focusLine);
        if (distance < closestDistance) { closest = item; closestDistance = distance; }
      });
      trail.querySelectorAll(':scope > li').forEach(item => item.classList.toggle('is-active', item === closest && rect.top < innerHeight && rect.bottom > 0));
    }

    if (!compact.matches) {
      atmosphericSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const shift = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
        section.style.setProperty('--world-shift', `${((shift - .5) * 24).toFixed(1)}px`);
      });
    }
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  reduced.addEventListener('change', () => {
    if (reduced.matches) revealTargets.forEach(element => element.classList.add('is-visible'));
    schedule();
  });
  compact.addEventListener('change', schedule);
  document.addEventListener('visibilitychange', () => document.documentElement.classList.toggle('polish-paused', document.hidden));
  update();
})();
