document.addEventListener('DOMContentLoaded', () => {
  const cover = document.querySelector('.onewm-cover');
  if (!cover) return;
  const image = cover.querySelector('img');
  const video = cover.querySelector('video');
  const toggle = cover.querySelector('[data-onewm-toggle]');
  const expand = cover.querySelector('[data-onewm-expand]');
  const viewer = document.querySelector('.onewm-viewer');
  const largeVideo = viewer.querySelector('video');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let showingVideo = false;
  let visible = false;
  let manual = false;
  let failed = false;
  let timer;

  const clearTimer = () => window.clearTimeout(timer);
  const schedule = () => {
    clearTimer();
    if (visible && !document.hidden && !manual && !failed && !reducedMotion.matches && !showingVideo) {
      timer = window.setTimeout(() => show(true), 3000);
    }
  };
  const show = (play) => {
    clearTimer();
    showingVideo = play;
    image.hidden = play;
    video.hidden = !play;
    toggle.textContent = play ? '▧' : '▶';
    toggle.setAttribute('aria-label', play ? 'Show OneWM cover image' : 'Play OneWM demo video');
    toggle.title = play ? 'Cover image' : 'Play 27-second demo';
    toggle.setAttribute('aria-pressed', String(play));
    if (play) {
      const promise = video.play();
      if (promise) promise.catch(() => { failed = true; show(false); });
    } else {
      video.pause();
      video.currentTime = 0;
      schedule();
    }
  };
  toggle.addEventListener('click', () => { manual = true; show(!showingVideo); });
  video.addEventListener('ended', () => show(false));
  video.addEventListener('error', () => { failed = true; show(false); });
  expand.addEventListener('click', () => {
    manual = true;
    const position = showingVideo ? video.currentTime : 0;
    show(false);
    viewer.showModal();
    largeVideo.currentTime = position;
    largeVideo.play().catch(() => {});
  });
  viewer.querySelector('button').addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => { largeVideo.pause(); expand.focus(); });
  viewer.addEventListener('click', (event) => { if (event.target === viewer) viewer.close(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimer(); video.pause(); }
    else if (visible && showingVideo) video.play().catch(() => show(false));
    else schedule();
  });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches && !manual) show(false); schedule(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { clearTimer(); video.pause(); }
      else if (showingVideo) video.play().catch(() => show(false));
      else schedule();
    }, { threshold: 0.15 }).observe(cover);
  } else { visible = true; schedule(); }
});
