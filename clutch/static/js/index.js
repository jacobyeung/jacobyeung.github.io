// Based on the Nerfies project page (https://github.com/nerfies/nerfies.github.io).

$(document).ready(function() {
  // Mobile menu.
  function toggleMenu() {
    var active = $(".navbar-burger").toggleClass("is-active").hasClass("is-active");
    $(".navbar-menu").toggleClass("is-active", active);
    $(".navbar-burger").attr("aria-expanded", String(active));
  }
  $(".navbar-burger").on("click", toggleMenu).on("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });
  $(".navbar-menu .navbar-item").click(function() {
    $(".navbar-burger").removeClass("is-active").attr("aria-expanded", "false");
    $(".navbar-menu").removeClass("is-active");
  });

  // One drive per slide: each clip shows three panels side by side.
  bulmaCarousel.attach('.carousel', {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: false,
    autoplay: false,
    pagination: true,
    navigation: true,
  });

  // Play a video from its start while it is on screen and pause it otherwise.
  // Runs after the carousel is attached, so that the slides it adds are covered too.
  var videos = document.querySelectorAll('video.inview');
  if (!('IntersectionObserver' in window)) {
    videos.forEach(function(video) { video.setAttribute('controls', ''); });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      var video = entry.target;
      if (entry.isIntersecting) {
        if (video.paused) {
          video.currentTime = 0;
          var started = video.play();
          if (started && started.catch) {
            started.catch(function() { video.setAttribute('controls', ''); });
          }
        }
      } else if (!video.paused) {
        video.pause();
      }
    });
  }, {threshold: 0.25});
  videos.forEach(function(video) { observer.observe(video); });
});
