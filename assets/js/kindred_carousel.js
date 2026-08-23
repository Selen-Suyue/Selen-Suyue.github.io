(function () {
  "use strict";

  var carousels = document.querySelectorAll("[data-kindred-carousel]");

  carousels.forEach(function (carousel) {
    var track = carousel.querySelector("[data-kindred-track]");
    var slides = Array.prototype.slice.call(track.querySelectorAll(".kindred-slide"));
    var previous = carousel.querySelector('[data-kindred-direction="-1"]');
    var next = carousel.querySelector('[data-kindred-direction="1"]');
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var autoplayDelay = Number(carousel.getAttribute("data-autoplay")) || 0;
    var animationFrame = null;
    var autoplayTimer = null;
    var isHovered = false;
    var hasFocus = false;

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

    function move(direction, wrap) {
      var currentIndex = nearestSlideIndex();
      var targetIndex = currentIndex + direction;

      if (wrap) {
        if (targetIndex >= slides.length) targetIndex = 0;
        if (targetIndex < 0) targetIndex = slides.length - 1;
      } else {
        targetIndex = Math.max(0, Math.min(slides.length - 1, targetIndex));
      }

      var firstSlideOffset = slides[0].offsetLeft;
      var targetOffset = slides[targetIndex].offsetLeft - firstSlideOffset;

      track.scrollTo({
        left: targetOffset,
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });
    }

    function stopAutoplay() {
      if (autoplayTimer !== null) {
        window.clearTimeout(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function scheduleAutoplay() {
      stopAutoplay();
      if (!autoplayDelay || reducedMotion.matches || document.hidden || isHovered || hasFocus) return;

      autoplayTimer = window.setTimeout(function () {
        move(1, true);
        scheduleAutoplay();
      }, autoplayDelay);
    }

    function moveManually(direction) {
      move(direction, false);
      scheduleAutoplay();
    }

    previous.addEventListener("click", function () { moveManually(-1); });
    next.addEventListener("click", function () { moveManually(1); });

    track.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        moveManually(event.key === "ArrowLeft" ? -1 : 1);
      }
    });

    carousel.addEventListener("mouseenter", function () {
      isHovered = true;
      stopAutoplay();
    });
    carousel.addEventListener("mouseleave", function () {
      isHovered = false;
      scheduleAutoplay();
    });
    carousel.addEventListener("focusin", function () {
      hasFocus = true;
      stopAutoplay();
    });
    carousel.addEventListener("focusout", function () {
      hasFocus = false;
      scheduleAutoplay();
    });
    document.addEventListener("visibilitychange", scheduleAutoplay);
    if (reducedMotion.addEventListener) {
      reducedMotion.addEventListener("change", scheduleAutoplay);
    }

    track.addEventListener("scroll", function () {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      animationFrame = window.requestAnimationFrame(updateControls);
    }, { passive: true });

    window.addEventListener("resize", updateControls);
    updateControls();
    scheduleAutoplay();
  });
}());
