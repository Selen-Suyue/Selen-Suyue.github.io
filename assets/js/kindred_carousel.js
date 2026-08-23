(function () {
  "use strict";

  var carousels = document.querySelectorAll("[data-kindred-carousel]");

  carousels.forEach(function (carousel) {
    var track = carousel.querySelector("[data-kindred-track]");
    var slides = Array.prototype.slice.call(track.querySelectorAll(".kindred-slide"));
    var previous = carousel.querySelector('[data-kindred-direction="-1"]');
    var next = carousel.querySelector('[data-kindred-direction="1"]');
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var animationFrame = null;

    function nearestSlideIndex() {
      var trackLeft = track.getBoundingClientRect().left;
      var closestIndex = 0;
      var closestDistance = Infinity;

      slides.forEach(function (slide, index) {
        var distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    }

    function updateControls() {
      var atStart = track.scrollLeft <= 2;
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;

      previous.disabled = atStart;
      next.disabled = atEnd;
    }

    function move(direction) {
      var currentIndex = nearestSlideIndex();
      var targetIndex = Math.max(0, Math.min(slides.length - 1, currentIndex + direction));
      var firstSlideOffset = slides[0].offsetLeft;
      var targetOffset = slides[targetIndex].offsetLeft - firstSlideOffset;

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
