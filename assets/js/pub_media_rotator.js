document.addEventListener('DOMContentLoaded', () => {
  const rotators = document.querySelectorAll('.pub-media-rotator');

  rotators.forEach((rotator) => {
    const intervalMs = Number.parseInt(rotator.dataset.interval || '12000', 10);
    let items = Array.from(rotator.children).filter(
      (el) => el && (el.tagName === 'IMG' || el.tagName === 'VIDEO')
    );

    items = items.filter((el) => {
      if (el.tagName !== 'VIDEO') return true;
      const source = el.querySelector('source');
      const src = source ? source.getAttribute('src') : '';
      return Boolean(src && src.trim());
    });

    if (items.length <= 1) return;

    let idx = 0;
    let timerId = null;

    const show = (newIdx) => {
      items.forEach((el, i) => {
        const active = i === newIdx;
        el.style.display = active ? 'block' : 'none';

        if (el.tagName === 'VIDEO') {
          if (active) {
            const p = el.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          } else {
            el.pause();
            el.currentTime = 0;
          }
        }
      });
    };

    const fallbackToImage = () => {
      if (timerId) window.clearInterval(timerId);
      idx = 0;
      show(idx);
    };

    items.forEach((el) => {
      if (el.tagName !== 'VIDEO') return;

      el.addEventListener('error', fallbackToImage, { once: true });
      const source = el.querySelector('source');
      if (source) source.addEventListener('error', fallbackToImage, { once: true });
    });

    show(idx);
    timerId = window.setInterval(() => {
      idx = (idx + 1) % items.length;
      show(idx);
    }, intervalMs);
  });
});