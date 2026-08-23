(function () {
  "use strict";

  var carousels = document.querySelectorAll("[data-kindred-carousel]");

  carousels.forEach(function (carousel) {
    var track = carousel.querySelector("[data-kindred-track]");
    if (!track) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll(".kindred-slide"));
    var previous = carousel.querySelector('[data-kindred-direction="-1"]');
    var next = carousel.querySelector('[data-kindred-direction="1"]');
    var pagination = carousel.querySelector("[data-kindred-pagination]");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var autoplayDelay = Number(carousel.getAttribute("data-autoplay")) || 0;
    var allSlides = [];
    var dots = [];
    var cloneCount = 0;
    var activeIndex = 0;
    var visualIndex = 0;
    var autoplayTimer = null;
    var resizeTimer = null;
    var pointerStartX = null;
    var suppressClick = false;
    var isAnimating = false;
    var isHovered = false;
    var hasFocus = false;

    if (slides.length === 0 || !previous || !next || !pagination) return;

    function modulo(value, divisor) {
      return ((value % divisor) + divisor) % divisor;
    }

    function itemsPerView() {
      var value = parseInt(window.getComputedStyle(carousel).getPropertyValue("--kindred-items"), 10);
      return Math.max(1, Math.min(slides.length, value || 1));
    }

    function cloneForLoop(slide) {
      var clone = slide.cloneNode(true);
      clone.classList.add("kindred-slide--clone");
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("tabindex", "-1");
      return clone;
    }

    function setPosition(animate) {
      var target = allSlides[visualIndex];
      if (!target) return;

      if (!animate || reducedMotion.matches) track.style.transition = "none";
      track.style.transform = "translate3d(" + (-target.offsetLeft) + "px, 0, 0)";

      if (!animate || reducedMotion.matches) {
        track.offsetHeight;
        track.style.transition = "";
      }
    }

    function updatePagination() {
      dots.forEach(function (dot, index) {
        if (index === activeIndex) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    }

    function updateAccessibility() {
      var visible = {};
      var count = itemsPerView();

      for (var offset = 0; offset < count; offset += 1) {
        visible[modulo(activeIndex + offset, slides.length)] = true;
      }

      slides.forEach(function (slide, index) {
        slide.setAttribute("aria-roledescription", "slide");
        slide.setAttribute("aria-setsize", String(slides.length));
        slide.setAttribute("aria-posinset", String(index + 1));

        if (visible[index]) {
          slide.removeAttribute("aria-hidden");
          slide.setAttribute("tabindex", "0");
        } else {
          slide.setAttribute("aria-hidden", "true");
          slide.setAttribute("tabindex", "-1");
        }
      });
    }

    function updateState() {
      activeIndex = modulo(visualIndex - cloneCount, slides.length);
      updatePagination();
      updateAccessibility();
    }

    function rebuildTrack() {
      var prefix;
      var suffix;

      cloneCount = itemsPerView();
      prefix = slides.slice(-cloneCount).map(cloneForLoop);
      suffix = slides.slice(0, cloneCount).map(cloneForLoop);
      track.textContent = "";

      prefix.concat(slides, suffix).forEach(function (slide) {
        track.appendChild(slide);
      });

      allSlides = Array.prototype.slice.call(track.children);
      visualIndex = cloneCount + activeIndex;
      isAnimating = false;
      setPosition(false);
      updateState();
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
        move(1);
        scheduleAutoplay();
      }, autoplayDelay);
    }

    function move(direction) {
      if (isAnimating) return;
      visualIndex += direction;
      isAnimating = !reducedMotion.matches;
      updateState();
      setPosition(true);

      if (reducedMotion.matches) normalizeLoopPosition();
    }

    function moveManually(direction) {
      move(direction);
      scheduleAutoplay();
    }

    function goTo(index) {
      if (isAnimating || index === activeIndex) return;
      visualIndex = cloneCount + index;
      isAnimating = !reducedMotion.matches;
      updateState();
      setPosition(true);

      if (reducedMotion.matches) normalizeLoopPosition();
      scheduleAutoplay();
    }

    function normalizeLoopPosition() {
      if (visualIndex >= cloneCount + slides.length) {
        visualIndex -= slides.length;
        setPosition(false);
      } else if (visualIndex < cloneCount) {
        visualIndex += slides.length;
        setPosition(false);
      }

      isAnimating = false;
      updateState();
    }

    slides.forEach(function (_slide, index) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "kindred-slideshow__dot";
      dot.setAttribute("aria-label", "Show Kindred illustration " + (index + 1) + " of " + slides.length);
      dot.addEventListener("click", function () { goTo(index); });
      pagination.appendChild(dot);
      dots.push(dot);
    });

    previous.addEventListener("click", function () { moveManually(-1); });
    next.addEventListener("click", function () { moveManually(1); });

    track.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        moveManually(event.key === "ArrowLeft" ? -1 : 1);
      }
    });

    track.addEventListener("transitionend", function (event) {
      if (event.target === track && event.propertyName === "transform") normalizeLoopPosition();
    });

    track.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "touch" || event.pointerType === "pen") {
        pointerStartX = event.clientX;
        stopAutoplay();
      }
    });

    track.addEventListener("pointerup", function (event) {
      if (pointerStartX === null) return;

      var distance = event.clientX - pointerStartX;
      pointerStartX = null;

      if (Math.abs(distance) >= 36) {
        suppressClick = true;
        moveManually(distance > 0 ? -1 : 1);
        window.setTimeout(function () { suppressClick = false; }, 0);
      } else {
        scheduleAutoplay();
      }
    });

    track.addEventListener("pointercancel", function () {
      pointerStartX = null;
      scheduleAutoplay();
    });

    track.addEventListener("click", function (event) {
      if (suppressClick) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);

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
      reducedMotion.addEventListener("change", function () {
        isAnimating = false;
        normalizeLoopPosition();
        scheduleAutoplay();
      });
    }

    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(rebuildTrack, 120);
    });

    rebuildTrack();
    scheduleAutoplay();
  });
}());
