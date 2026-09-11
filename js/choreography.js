/* Native-scroll choreography: one measured, visibility-gated frame for the desktop story. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 901px)');
  const root = document.documentElement;
  const main = document.querySelector('main');
  const nav = document.querySelector('.island-nav');
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

  const storyWords = [...story.querySelectorAll('.v2-waypoints span')];
  storyWords.forEach((word, index) => word.style.setProperty('--word-index', index));
  document.querySelectorAll('.v2-notes-body').forEach(body => [...body.children].forEach((part, index) => part.style.setProperty('--record-index', index)));
  let trailMarker = null;
  const trailItems = trail ? [...trail.querySelectorAll(':scope > li')] : [];
  if (trail) {
    trailMarker = document.createElement('span');
    trailMarker.className = 'trail-route-marker';
    trailMarker.setAttribute('aria-hidden', 'true');
    trail.append(trailMarker);
  }

  const heroLayers = [...hero.querySelectorAll('.cinematic-world [data-depth]')];
  const storyLayers = [...story.querySelectorAll('.cinematic-story-stack [data-story-depth]')];
  const heroExplorer = hero.querySelector('.cinematic-explorer');
  const storyExplorer = story.querySelector('.cinematic-story-explorer');
  const storyRoute = story.querySelector('.story-route');
  const projectLines = [...projectProgress.querySelectorAll('span')];
  const atmosphericSections = [...document.querySelectorAll('.v2-work,.v2-capabilities,.v2-trail,.v2-tools,.v2-signal,.v2-horizon')];
  const visibleAtmosphere = new Set();

  root.classList.add('choreography-enabled');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      const paused = !entry.isIntersecting || document.hidden;
      hero.classList.toggle('choreography-paused', paused);
      chapter.classList.toggle('choreography-paused', paused);
    }, { rootMargin: '20% 0px' }).observe(chapter);
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('choreography-paused', !entry.isIntersecting);
        entry.isIntersecting ? visibleAtmosphere.add(entry.target) : visibleAtmosphere.delete(entry.target);
      });
    }, { rootMargin: '20% 0px' });
    atmosphericSections.forEach(section => sectionObserver.observe(section));
  }

  let frame = 0;
  let viewportHeight = innerHeight;
  let chapterTravel = 1;
  let workTravel = 1;
  let trailHeight = 0;
  let activeProject = -1;
  let activeTrail = null;
  let desktopWasReset = false;
  const clamp = value => Math.max(0, Math.min(1, value));
  const range = (value, start, end) => clamp((value - start) / (end - start));
  const mix = (from, to, amount) => from + (to - from) * amount;
  const set = (element, property, value) => {
    if (element && element.style.getPropertyValue(property) !== value) element.style.setProperty(property, value);
  };
  const nearViewport = rect => rect.top < viewportHeight * 1.25 && rect.bottom > -viewportHeight * .25;

  function measure() {
    viewportHeight = innerHeight;
    chapterTravel = Math.max(chapter.offsetHeight - viewportHeight, 1);
    workTravel = Math.max(work.offsetHeight - viewportHeight, 1);
    trailHeight = trail?.offsetHeight || 0;
  }

  function resetDesktopStyles() {
    if (desktopWasReset) return;
    desktopWasReset = true;
    chapterStage.removeAttribute('style');
    projectTrack.style.removeProperty('transform');
    chapterStage.classList.remove('story-active');
    projects.forEach(project => ['--project-focus','--project-scale','--project-progress'].forEach(property => project.style.removeProperty(property)));
    heroLayers.forEach(layer => ['--choreo-x','--choreo-y'].forEach(property => layer.style.removeProperty(property)));
    ['--explorer-x','--explorer-y','--explorer-scale'].forEach(property => heroExplorer?.style.removeProperty(property));
    storyLayers.forEach(layer => layer.style.removeProperty('translate'));
    if (storyRoute) storyRoute.style.strokeDashoffset = '0';
    storyExplorer?.style.removeProperty('translate');
    storyWords.forEach(word => word.classList.add('is-reached'));
    ['--about-image-y','--about-copy-y'].forEach(property => about?.style.removeProperty(property));
    tools?.style.removeProperty('--approach-signal');
    ['--signal-progress','--signal-copy-opacity','--signal-copy-y','--signal-copy-mask','--signal-form-progress','--signal-form-opacity','--signal-form-y','--signal-atmosphere-opacity'].forEach(property => signal?.style.removeProperty(property));
    ['--horizon-progress','--horizon-opacity','--horizon-y'].forEach(property => horizon?.style.removeProperty(property));
    trail?.style.removeProperty('--trail-progress');
    trailMarker?.style.removeProperty('--trail-y');
  }

  function renderHeroStory(rect) {
    const progress = clamp(-rect.top / chapterTravel);
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
    heroLayers.forEach(layer => {
      const depth = Number(layer.dataset.depth || 0);
      set(layer, '--choreo-x', `${(-progress * depth * 125).toFixed(1)}px`);
      set(layer, '--choreo-y', `${(-progress * depth * 46).toFixed(1)}px`);
    });
    set(heroExplorer, '--explorer-x', `${mix(0, 42, range(progress, .14, .54)).toFixed(1)}px`);
    set(heroExplorer, '--explorer-y', `${mix(0, -24, range(progress, .14, .54)).toFixed(1)}px`);
    set(heroExplorer, '--explorer-scale', String(mix(1, .91, range(progress, .14, .54))));
    storyLayers.forEach(layer => {
      const depth = Number(layer.dataset.storyDepth || 0);
      layer.style.translate = `${(-storyProgress * depth * 70).toFixed(1)}px ${(-storyProgress * depth * 24).toFixed(1)}px`;
    });
    if (storyRoute) storyRoute.style.strokeDashoffset = String(1 - storyProgress);
    if (storyExplorer) storyExplorer.style.translate = `${mix(-72, 72, storyProgress).toFixed(1)}px ${mix(18, -12, storyProgress).toFixed(1)}px`;
    storyWords.forEach((word, index) => word.classList.toggle('is-reached', storyProgress >= (index + 1) / (storyWords.length + .7)));
  }

  function renderProjects(rect) {
    const progress = clamp(-rect.top / workTravel);
    projectTrack.style.transform = `translate3d(${(-progress * 200).toFixed(3)}%,0,0)`;
    const position = progress * (projects.length - 1);
    const active = Math.round(position);
    projects.forEach((project, index) => {
      const distance = Math.min(Math.abs(position - index), 1);
      set(project, '--project-focus', String(mix(1, .58, distance)));
      set(project, '--project-scale', String(mix(1, .96, distance)));
      set(project, '--project-progress', String(1 - distance));
    });
    if (active !== activeProject) {
      activeProject = active;
      projectProgress.querySelector('b').textContent = `${String(active + 1).padStart(2, '0')} / 03`;
      projectLines.forEach((line, index) => line.classList.toggle('is-active', index === active));
    }
  }

  function renderAbout(rect) {
    const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height));
    set(about, '--about-image-y', `${mix(22, -20, progress).toFixed(1)}px`);
    set(about, '--about-copy-y', `${mix(-8, 16, progress).toFixed(1)}px`);
  }

  function renderTrail(rect) {
    const progress = clamp((viewportHeight * .55 - rect.top) / Math.max(rect.height, 1));
    set(trail, '--trail-progress', progress.toFixed(3));
    set(trailMarker, '--trail-y', `${(progress * trailHeight).toFixed(1)}px`);
    const focusLine = viewportHeight * .52;
    let closest = null;
    let distance = Infinity;
    trailItems.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const nextDistance = Math.abs(itemRect.top + itemRect.height / 2 - focusLine);
      if (nextDistance < distance) { closest = item; distance = nextDistance; }
    });
    const nextActive = rect.top < viewportHeight && rect.bottom > 0 ? closest : null;
    if (nextActive !== activeTrail) {
      activeTrail = nextActive;
      trailItems.forEach(item => item.classList.toggle('is-active', item === activeTrail));
    }
  }

  function renderSignal(rect) {
    const progress = clamp((viewportHeight * 1.18 - rect.top) / (viewportHeight * 1.08));
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
  }

  function render() {
    frame = 0;
    nav?.classList.toggle('is-scrolled', scrollY > 48);
    if (reduced.matches || !desktop.matches) {
      resetDesktopStyles();
      return;
    }
    desktopWasReset = false;
    const chapterRect = chapter.getBoundingClientRect();
    if (nearViewport(chapterRect)) renderHeroStory(chapterRect);
    const workRect = work.getBoundingClientRect();
    if (nearViewport(workRect)) renderProjects(workRect);
    if (about) {
      const rect = about.getBoundingClientRect();
      if (nearViewport(rect)) renderAbout(rect);
    }
    if (trail) {
      const rect = trail.getBoundingClientRect();
      if (nearViewport(rect)) renderTrail(rect);
    }
    if (signal) {
      const rect = signal.getBoundingClientRect();
      if (nearViewport(rect)) renderSignal(rect);
    }
    if (horizon) {
      const rect = horizon.getBoundingClientRect();
      if (nearViewport(rect)) {
        const progress = clamp((viewportHeight - rect.top) / (viewportHeight * .75));
        set(horizon, '--horizon-progress', progress.toFixed(3));
        set(horizon, '--horizon-opacity', mix(.35, 1, progress).toFixed(3));
        set(horizon, '--horizon-y', `${mix(18, 0, progress).toFixed(1)}px`);
      }
    }
    visibleAtmosphere.forEach(section => {
      const rect = section.getBoundingClientRect();
      const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height));
      set(section, '--world-shift', `${((progress - .5) * 24).toFixed(1)}px`);
    });
  }

  function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(render); }
  function resize() {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => { frame = 0; measure(); render(); });
  }

  const storyLink = document.querySelector('.island-scroll[href="#journey"]');
  storyLink?.addEventListener('click', event => {
    if (reduced.matches || !desktop.matches) return;
    event.preventDefault();
    scrollTo({ top: chapter.offsetTop + chapterTravel * .68, behavior: 'smooth' });
    history.replaceState(null, '', '#journey');
  });

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', resize, { passive: true });
  reduced.addEventListener('change', resize);
  desktop.addEventListener('change', resize);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hero.classList.add('choreography-paused');
      chapter.classList.add('choreography-paused');
    }
    else { measure(); schedule(); }
  });
  measure();
  render();
})();
