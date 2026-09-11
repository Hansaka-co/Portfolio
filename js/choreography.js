/* Native-scroll choreography: sticky chapters and scrubbed transforms without scroll hijacking. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 901px)');
  const root = document.documentElement;
  const main = document.querySelector('main');
  const hero = document.querySelector('.island-hero');
  const story = document.querySelector('.v2-story');
  const work = document.querySelector('.v2-work');
  const about = document.querySelector('.v2-about');
  const trail = document.querySelector('.trail-list');
  const tools = document.querySelector('.v2-tools');
  const signal = document.querySelector('.v2-signal');
  const horizon = document.querySelector('.v2-horizon');
  if (!main || !hero || !story || !work) return;

  const chapter = document.createElement('div');
  const chapterStage = document.createElement('div');
  chapter.className = 'hero-story-chapter';
  chapterStage.className = 'hero-story-stage';
  main.insertBefore(chapter, hero);
  chapter.append(chapterStage);
  chapterStage.append(hero, story);

  const workContainer = work.querySelector('.v2-container');
  const projectTrack = document.createElement('div');
  const projects = [...workContainer.querySelectorAll(':scope > .v2-project')];
  projectTrack.className = 'expedition-track';
  projects[0].before(projectTrack);
  projects.forEach(project => {
    project.classList.add('is-visible');
    projectTrack.append(project);
  });
  work.classList.add('choreography-work');

  const projectProgress = document.createElement('div');
  projectProgress.className = 'expedition-progress';
  projectProgress.setAttribute('aria-hidden', 'true');
  projectProgress.innerHTML = '<b>01 / 03</b><span></span><span></span><span></span>';
  workContainer.append(projectProgress);

  story.querySelectorAll('.v2-waypoints span').forEach((word, index) => word.style.setProperty('--word-index', index));
  document.querySelectorAll('.v2-notes-body').forEach(body => {
    [...body.children].forEach((part, index) => part.style.setProperty('--record-index', index));
  });
  if (trail) {
    const marker = document.createElement('span');
    marker.className = 'trail-route-marker';
    marker.setAttribute('aria-hidden', 'true');
    trail.append(marker);
  }

  root.classList.add('choreography-enabled');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      hero.classList.toggle('choreography-paused', !entry.isIntersecting);
    }, { rootMargin: '20% 0px' }).observe(chapter);
  }
  let frame = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  const range = (value, start, end) => clamp((value - start) / (end - start));
  const mix = (from, to, amount) => from + (to - from) * amount;
  const set = (element, property, value) => element?.style.setProperty(property, value);

  function resetDesktopStyles() {
    chapterStage.removeAttribute('style');
    projectTrack.style.removeProperty('transform');
    chapterStage.classList.remove('story-active');
    projects.forEach(project => {
      project.style.removeProperty('--project-focus');
      project.style.removeProperty('--project-scale');
    });
    hero.querySelectorAll('.island-scene [data-depth]').forEach(layer => {
      layer.style.removeProperty('--choreo-x');
      layer.style.removeProperty('--choreo-y');
    });
    const heroExplorer = hero.querySelector('.island-explorer');
    heroExplorer?.style.removeProperty('--explorer-x');
    heroExplorer?.style.removeProperty('--explorer-y');
    heroExplorer?.style.removeProperty('--explorer-scale');
    story.querySelectorAll('[data-story-depth]').forEach(layer => layer.style.removeProperty('translate'));
    story.querySelector('.story-route')?.style.setProperty('stroke-dashoffset', '0');
    story.querySelector('.story-explorer')?.style.removeProperty('translate');
    story.querySelectorAll('.v2-waypoints span').forEach(word => word.classList.add('is-reached'));
    about?.style.removeProperty('--about-image-y');
    about?.style.removeProperty('--about-copy-y');
    tools?.style.removeProperty('--approach-signal');
    ['--signal-progress','--signal-copy-opacity','--signal-copy-y','--signal-copy-mask','--signal-form-progress','--signal-form-opacity','--signal-form-y','--signal-atmosphere-opacity']
      .forEach(property => signal?.style.removeProperty(property));
    ['--horizon-progress','--horizon-opacity','--horizon-y']
      .forEach(property => horizon?.style.removeProperty(property));
  }

  function renderHeroStory() {
    const travel = Math.max(chapter.offsetHeight - innerHeight, 1);
    const progress = clamp(-chapter.getBoundingClientRect().top / travel);
    const supportOut = range(progress, .1, .3);
    const headlineOut = range(progress, .25, .48);
    const storyIn = range(progress, .32, .58);
    const storyContent = range(progress, .48, .7);
    const storyProgress = range(progress, .55, .96);

    set(chapterStage, '--hero-support-opacity', String(1 - supportOut));
    set(chapterStage, '--hero-support-y', `${mix(0, -18, supportOut).toFixed(1)}px`);
    set(chapterStage, '--hero-content-opacity', String(1 - headlineOut));
    set(chapterStage, '--hero-content-x', `${mix(0, -34, headlineOut).toFixed(1)}px`);
    set(chapterStage, '--hero-content-y', `${mix(0, -20, headlineOut).toFixed(1)}px`);
    set(chapterStage, '--hero-content-mask', `${(headlineOut * 22).toFixed(1)}%`);
    set(chapterStage, '--hero-scene-scale', String(mix(1, 1.1, range(progress, .08, .58))));
    set(chapterStage, '--hero-scene-x', `${mix(0, -30, range(progress, .12, .58)).toFixed(1)}px`);
    set(chapterStage, '--hero-scene-y', `${mix(0, -10, range(progress, .12, .58)).toFixed(1)}px`);
    set(chapterStage, '--story-scene-opacity', storyIn.toFixed(3));
    set(chapterStage, '--story-scene-scale', String(mix(.94, 1.04, storyProgress)));
    set(chapterStage, '--story-content-opacity', storyContent.toFixed(3));
    set(chapterStage, '--story-content-y', `${mix(44, 0, storyContent).toFixed(1)}px`);
    set(chapterStage, '--story-next-opacity', range(progress, .82, .96).toFixed(3));
    chapterStage.classList.toggle('story-active', progress > .46);

    hero.querySelectorAll('.island-scene [data-depth]').forEach(layer => {
      const depth = Number(layer.dataset.depth || 0);
      set(layer, '--choreo-x', `${(-progress * depth * 125).toFixed(1)}px`);
      set(layer, '--choreo-y', `${(-progress * depth * 46).toFixed(1)}px`);
    });
    set(hero.querySelector('.island-explorer'), '--explorer-x', `${mix(0, 42, range(progress, .14, .54)).toFixed(1)}px`);
    set(hero.querySelector('.island-explorer'), '--explorer-y', `${mix(0, -24, range(progress, .14, .54)).toFixed(1)}px`);
    set(hero.querySelector('.island-explorer'), '--explorer-scale', String(mix(1, .91, range(progress, .14, .54))));

    story.querySelectorAll('[data-story-depth]').forEach(layer => {
      const depth = Number(layer.dataset.storyDepth || 0);
      layer.style.translate = `${(-storyProgress * depth * 70).toFixed(1)}px ${(-storyProgress * depth * 24).toFixed(1)}px`;
    });
    const route = story.querySelector('.story-route');
    if (route) route.style.strokeDashoffset = String(1 - storyProgress);
    const explorer = story.querySelector('.story-explorer');
    if (explorer) explorer.style.translate = `${mix(-72, 72, storyProgress).toFixed(1)}px ${mix(18, -12, storyProgress).toFixed(1)}px`;
    story.querySelectorAll('.v2-waypoints span').forEach((word, index, words) => {
      word.classList.toggle('is-reached', storyProgress >= (index + 1) / (words.length + .7));
    });
  }

  function renderProjects() {
    const travel = Math.max(work.offsetHeight - innerHeight, 1);
    const progress = clamp(-work.getBoundingClientRect().top / travel);
    projectTrack.style.transform = `translate3d(${(-progress * 200).toFixed(3)}%,0,0)`;
    const position = progress * (projects.length - 1);
    const active = Math.round(position);
    projects.forEach((project, index) => {
      const distance = Math.min(Math.abs(position - index), 1);
      set(project, '--project-focus', String(mix(1, .58, distance)));
      set(project, '--project-scale', String(mix(1, .96, distance)));
      set(project, '--project-progress', String(1 - distance));
    });
    projectProgress.querySelector('b').textContent = `${String(active + 1).padStart(2, '0')} / 03`;
    projectProgress.querySelectorAll('span').forEach((line, index) => line.classList.toggle('is-active', index === active));
  }

  function renderAbout() {
    if (!about) return;
    const rect = about.getBoundingClientRect();
    const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
    set(about, '--about-image-y', `${mix(22, -20, progress).toFixed(1)}px`);
    set(about, '--about-copy-y', `${mix(-8, 16, progress).toFixed(1)}px`);
  }

  function renderSignal() {
    if (!signal) return;
    const rect = signal.getBoundingClientRect();
    const progress = clamp((innerHeight * 1.18 - rect.top) / (innerHeight * 1.08));
    set(tools, '--approach-signal', progress.toFixed(3));
    set(signal, '--signal-progress', progress.toFixed(3));
    set(signal, '--signal-copy-opacity', mix(.28, 1, progress).toFixed(3));
    set(signal, '--signal-copy-y', `${mix(26, 0, progress).toFixed(1)}px`);
    set(signal, '--signal-copy-mask', `${mix(18, 0, progress).toFixed(1)}%`);
    const formProgress = range(progress, .28, .82);
    set(signal, '--signal-form-progress', formProgress.toFixed(3));
    set(signal, '--signal-form-opacity', mix(.2, 1, formProgress).toFixed(3));
    set(signal, '--signal-form-y', `${mix(30, 0, formProgress).toFixed(1)}px`);
    set(signal, '--signal-atmosphere-opacity', mix(.25, 1, progress).toFixed(3));
    if (horizon) {
      const horizonRect = horizon.getBoundingClientRect();
      const horizonProgress = clamp((innerHeight - horizonRect.top) / (innerHeight * .75));
      set(horizon, '--horizon-progress', horizonProgress.toFixed(3));
      set(horizon, '--horizon-opacity', mix(.35, 1, horizonProgress).toFixed(3));
      set(horizon, '--horizon-y', `${mix(18, 0, horizonProgress).toFixed(1)}px`);
    }
  }

  function render() {
    frame = 0;
    if (reduced.matches || !desktop.matches) {
      resetDesktopStyles();
      return;
    }
    renderHeroStory();
    renderProjects();
    renderAbout();
    renderSignal();
  }
  function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(render); }

  const storyLink = document.querySelector('.island-scroll[href="#journey"]');
  storyLink?.addEventListener('click', event => {
    if (reduced.matches || !desktop.matches) return;
    event.preventDefault();
    const destination = chapter.offsetTop + (chapter.offsetHeight - innerHeight) * .68;
    scrollTo({ top: destination, behavior: 'smooth' });
    history.replaceState(null, '', '#journey');
  });

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  reduced.addEventListener('change', schedule);
  desktop.addEventListener('change', schedule);
  document.addEventListener('visibilitychange', schedule);
  render();
})();
