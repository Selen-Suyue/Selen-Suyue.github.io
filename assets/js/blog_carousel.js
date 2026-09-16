(function () {
  'use strict';
  const track = document.getElementById('blog-track');
  if (!track) return;
  const controls = track.parentElement.querySelector('.blog-controls');
  const previous = controls.querySelector('[data-blog-step="-1"]');
  const next = controls.querySelector('[data-blog-step="1"]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function update() {
    const max = track.scrollWidth - track.clientWidth;
    controls.hidden = max < 2;
    previous.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft >= max - 2;
  }
  function move(step) {
    const card = track.querySelector('.blog-card');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: step * (card.getBoundingClientRect().width + gap), behavior: reduced.matches ? 'auto' : 'smooth' });
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', update, { passive: true });
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  new ResizeObserver(update).observe(track);
  update();
})();
