(function () {
  'use strict';

  document.querySelectorAll('.experience-container').forEach(function (container) {
    var cards = Array.from(container.querySelectorAll('.experience-card'));
    var frame = null;

    function layout() {
      frame = null;
      var styles = window.getComputedStyle(container);
      var columns = parseInt(styles.getPropertyValue('--experience-columns'), 10) || 1;
      var gap = parseFloat(styles.getPropertyValue('--experience-row-gap')) || 20;

      // Leave mobile in normal document flow, and retain the CSS grid fallback.
      if (columns < 2) {
        container.classList.remove('experience-container--masonry');
        cards.forEach(function (card) {
          card.style.removeProperty('grid-column');
          card.style.removeProperty('grid-row');
        });
        return;
      }

      var heights = cards.map(function (card) {
        return Math.ceil(card.getBoundingClientRect().height);
      });
      var bottoms = Array(columns).fill(0);
      container.classList.add('experience-container--masonry');

      cards.forEach(function (card, index) {
        // Keep chronological left-to-right column order without moving DOM nodes.
        var column = index % columns;
        card.style.gridColumn = String(column + 1);
        card.style.gridRow = (bottoms[column] + 1) + ' / span ' + heights[index];
        bottoms[column] += heights[index] + gap;
      });
    }

    function scheduleLayout() {
      if (frame === null) frame = window.requestAnimationFrame(layout);
    }

    // Recalculate for viewport changes, text wrapping, images and late web fonts.
    if ('ResizeObserver' in window) {
      var observer = new ResizeObserver(scheduleLayout);
      observer.observe(container);
      cards.forEach(function (card) { observer.observe(card); });
    }
    window.addEventListener('resize', scheduleLayout);
    container.addEventListener('load', scheduleLayout, true);
    if (document.fonts) document.fonts.ready.then(scheduleLayout);
    layout();
  });
})();
