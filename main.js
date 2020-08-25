(function ($) {
  var SliceSlider = {
    /**
     * Settings Object
     */
    settings: {
      delta: 0,
      currentSlideIndex: 0,
      scrollThreshold: 40,
      slides: $(".slide"),
      numSlides: $(".slide").length,
      navPrev: $(".js-prev"),
      navNext: $(".js-next"),
    },

    /**
     * Init
     */
    init: function () {
      s = this.settings;
      this.bindEvents();
    },

    /**
     * Bind our click, scroll, key events
     */
    bindEvents: function () {
      // Scrollwheel & trackpad
      s.slides.on({
        "DOMMouseScroll mousewheel": SliceSlider.handleScroll,
      });
      // On click prev
      s.navPrev.on({
        click: SliceSlider.prevSlide,
      });
      // On click next
      s.navNext.on({
        click: SliceSlider.nextSlide,
      });
      // On Arrow keys
      $(document).keyup(function (e) {
        // Left or back arrows
        if (e.which === 37 || e.which === 38) {
          SliceSlider.prevSlide();
        }
        // Down or right
        if (e.which === 39 || e.which === 40) {
          SliceSlider.nextSlide();
        }
      });
    },

    /**
     * Interept scroll direction
     */
    handleScroll: function (e) {
      // Scrolling up
      if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
        s.delta--;

        if (Math.abs(s.delta) >= s.scrollThreshold) {
          SliceSlider.prevSlide();
        }
      }

      // Scrolling Down
      else {
        s.delta++;

        if (s.delta >= s.scrollThreshold) {
          SliceSlider.nextSlide();
        }
      }

      // Prevent page from scrolling
      return false;
    },

    /**
     * Show Slide
     */
    showSlide: function () {
      // reset
      s.delta = 0;
      // Bail if we're already sliding
      if ($("body").hasClass("is-sliding")) {
        return;
      }
      // Loop through our slides
      s.slides.each(function (i, slide) {
        // Toggle the is-active class to show slide
        $(slide).toggleClass("is-active", i === s.currentSlideIndex);
        $(slide).toggleClass("is-prev", i === s.currentSlideIndex - 1);
        $(slide).toggleClass("is-next", i === s.currentSlideIndex + 1);

        // Add and remove is-sliding class
        $("body").addClass("is-sliding");

        setTimeout(function () {
          $("body").removeClass("is-sliding");
        }, 1000);
      });
    },

    /**
     * Previous Slide
     */
    prevSlide: function () {
      // If on first slide, loop to last
      if (s.currentSlideIndex <= 0) {
        s.currentSlideIndex = s.numSlides;
      }
      s.currentSlideIndex--;

      SliceSlider.showSlide();
    },

    /**
     * Next Slide
     */
    nextSlide: function () {
      s.currentSlideIndex++;

      // If on last slide, loop to first
      if (s.currentSlideIndex >= s.numSlides) {
        s.currentSlideIndex = 0;
      }

      SliceSlider.showSlide();
    },
  };
  SliceSlider.init();
})(jQuery);

function parallax(element, distance, speed) {
  const item = document.querySelector(element);
  item.style.transform = `translateY(${distance * speed}px)`;
}

// window.addEventListener("scroll", function () {
//   parallax("header", window.scrollY, 1);
//   parallax(".logo", window.scrollY, 0.7);
// });

let viewHeight = window.innerHeight;
let viewWidth = window.innerWidth;

let textContainers = document.querySelectorAll(".text-container");

textContainers.forEach((element, index) => {
  let top = element.getBoundingClientRect().top;
  let start = viewHeight - top;

  let firstText = element.querySelector(".parallax-text:first-child");
  let secondText = element.querySelector(".parallax-text:last-child");

  gsap.to(firstText, {
    scrollTrigger: {
      trigger: element,
      scrub: true,
      start: start + "px bottom",
      end: "bottom top",
    },
    x: "-54vw",
    transformOrigin: "left center",
    ease: "none",
  });
  gsap.to(secondText, {
    scrollTrigger: {
      trigger: element,
      scrub: true,
      start: start + "px bottom",
      end: "bottom top",
    },
    x: "32vw",
    transformOrigin: "left center",
    ease: "none",
  });
});

// // for presentation
// let tl = gsap.timeline({
//   repeat: -1
// });

// tl.set({}, {}, 0.6);
// tl.to(window, {
//   duration: 4,
//   scrollTo: {
//     y:"max"
//   },
//   ease: Power2.easeInOut
// });
// tl.to(window, {
//   delay: 0.6,
//   duration: 4,
//   scrollTo: 0,
//   ease: Power2.easeInOut
// });
