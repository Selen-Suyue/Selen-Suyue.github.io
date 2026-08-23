(function () {
  "use strict";

  var carousels = document.querySelectorAll("[data-kindred-carousel]");

  carousels.forEach(function (carousel) {
    var track = carousel.querySelector("[data-kindred-track]");
    var cards = Array.prototype.slice.call(track.querySelectorAll(".kindred-card"));
    var previous = carousel.querySelector('[data-kindred-direction="-1"]');
    var next = carousel.querySelector('[data-kindred-direction="1"]');
    var status = carousel.querySelector("[data-kindred-status]");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var animationFrame = null;

    function nearestCardIndex() {
      var trackLeft = track.getBoundingClientRect().left;
      var closestIndex = 0;
      var closestDistance = Infinity;

      cards.forEach(function (card, index) {
        var distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    }

    function updateControls() {
      var index = nearestCardIndex();
      var atStart = track.scrollLeft <= 2;
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;

      previous.disabled = atStart;
      next.disabled = atEnd;
      status.textContent = String(index + 1).padStart(2, "0") + " / " + String(cards.length).padStart(2, "0");
    }

    function move(direction) {
      var currentIndex = nearestCardIndex();
      var targetIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction));
      var firstCardOffset = cards[0].offsetLeft;
      var targetOffset = cards[targetIndex].offsetLeft - firstCardOffset;

      track.scrollTo({
        left: targetOffset,
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });
    }

    previous.addEventListener("click", function () { move(-1); });
    next.addEventListener("click", function () { move(1); });

    track.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }
    });

    track.addEventListener("scroll", function () {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      animationFrame = window.requestAnimationFrame(updateControls);
    }, { passive: true });

    window.addEventListener("resize", updateControls);
    updateControls();
  });
}());
