document.addEventListener('DOMContentLoaded', () => {
  const cover = document.querySelector('.onewm-cover');
  if (!cover) return;
  const image = cover.querySelector('img');
  const video = cover.querySelector('video');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let showingVideo = false;
  let visible = false;
  let failed = false;
  let timer;

  const clearTimer = () => window.clearTimeout(timer);
  const schedule = () => {
    clearTimer();
    if (visible && !document.hidden && !failed && !reducedMotion.matches && !showingVideo) {
      timer = window.setTimeout(() => show(true), 3000);
    }
  };
  const show = (play) => {
    clearTimer();
    showingVideo = play;
    image.hidden = play;
    video.hidden = !play;
    if (play) {
      const promise = video.play();
      if (promise) promise.catch(() => { failed = true; show(false); });
    } else {
      video.pause();
      video.currentTime = 0;
      schedule();
    }
  };
  video.addEventListener('ended', () => show(false));
  video.addEventListener('error', () => { failed = true; show(false); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimer(); video.pause(); }
    else if (visible && showingVideo) video.play().catch(() => show(false));
    else schedule();
  });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) show(false); schedule(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { clearTimer(); video.pause(); }
      else if (showingVideo) video.play().catch(() => show(false));
      else schedule();
    }, { threshold: 0.15 }).observe(cover);
  } else { visible = true; schedule(); }
});
