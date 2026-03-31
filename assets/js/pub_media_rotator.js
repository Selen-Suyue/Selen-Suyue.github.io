document.addEventListener('DOMContentLoaded', () => {
  const rotators = document.querySelectorAll('.pub-media-rotator');

  rotators.forEach((rotator) => {
    const intervalMs = Number.parseInt(rotator.dataset.interval || '4000', 10);
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

    const clearTimer = () => {
      if (!timerId) return;
      window.clearTimeout(timerId);
      timerId = null;
    };

    const advance = () => {
      idx = (idx + 1) % items.length;
      show(idx);
      scheduleNext();
    };

    const show = (newIdx) => {
      items.forEach((el, i) => {
        const active = i === newIdx;
        el.style.display = active ? 'block' : 'none';

        if (el.tagName === 'VIDEO') {
          if (active) {
            el.loop = false;
            el.removeAttribute('loop');
            el.currentTime = 0;
            const p = el.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          } else {
            el.pause();
            el.currentTime = 0;
          }
        }
      });
    };

    const scheduleNext = () => {
      clearTimer();

      const current = items[idx];
      if (!current) return;

      if (current.tagName === 'VIDEO') {
        current.addEventListener(
          'ended',
          () => {
            if (items[idx] !== current) return;
            advance();
          },
          { once: true }
        );

        let holdMs = Math.max(intervalMs, 12000);
        const durationSec = current.duration;
        if (Number.isFinite(durationSec) && durationSec > 0) {
          holdMs = Math.max(intervalMs, Math.ceil(durationSec * 1000) + 250);
        } else {
          current.addEventListener(
            'loadedmetadata',
            () => {
              if (items[idx] !== current) return;
              scheduleNext();
            },
            { once: true }
          );
        }

        timerId = window.setTimeout(() => {
          if (items[idx] !== current) return;
          advance();
        }, holdMs);

        return;
      }

      timerId = window.setTimeout(advance, intervalMs);
    };

    const fallbackToImage = () => {
      clearTimer();
      idx = 0;
      show(idx);
      scheduleNext();
    };

    items.forEach((el) => {
      if (el.tagName !== 'VIDEO') return;

      el.addEventListener('error', fallbackToImage, { once: true });
      const source = el.querySelector('source');
      if (source) source.addEventListener('error', fallbackToImage, { once: true });
    });

    show(idx);
    scheduleNext();
  });
});