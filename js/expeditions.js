/* Progressive enhancement for the four approved sections only. */
(() => {
  const story = document.querySelector('.v2-story');
  if (!story) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 700px)');
  const desktop = matchMedia('(min-width: 901px)');
  const content = story.querySelector('.v2-story-content');
  const layers = [...story.querySelectorAll('.cinematic-story-stack [data-story-depth]')];
  let frame = 0;
  let visible = true;
  let releasedToChoreography = false;
  function choreographyOwnsScene() {
    return document.documentElement.classList.contains('choreography-enabled') && desktop.matches && !reduced.matches;
  }
  function paint() {
    frame = 0;
    if (choreographyOwnsScene()) {
      if (!releasedToChoreography) layers.forEach(layer => layer.style.removeProperty('transform'));
      releasedToChoreography = true;
      return;
    }
    releasedToChoreography = false;
    const rect = story.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
    content.style.setProperty('--story-progress', reduced.matches ? '1' : progress.toFixed(3));
    layers.forEach(layer => {
      const offset = reduced.matches ? 0 : (progress - .5) * rect.height * Number(layer.dataset.storyDepth) * (mobile.matches ? .2 : .5);
      layer.style.transform = `translate3d(0,${offset.toFixed(1)}px,0)`;
    });
  }
  function schedule() { if (!frame && visible && !document.hidden && !choreographyOwnsScene()) frame = requestAnimationFrame(paint); }
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    schedule();
  }).observe(story);
  story.classList.add('is-enhanced');
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  reduced.addEventListener('change', paint);
  desktop.addEventListener('change', paint);
  paint();
  // A remote project visual is optional; its labelled editorial placeholder stays underneath.
  document.querySelectorAll('.v2-project-image').forEach(image => {
    const fallback = () => { image.hidden = true; };
    image.addEventListener('error', fallback);
    if (image.complete && !image.naturalWidth) fallback();
  });
})();
