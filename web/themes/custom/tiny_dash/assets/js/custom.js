document.addEventListener("DOMContentLoaded", function () {
  // Get all carousel instances
  var carousels = document.querySelectorAll(".carousel");

  // Loop through each carousel and activate
  carousels.forEach(function (carousel) {
    var carouselInstance = new bootstrap.Carousel(carousel, {
      interval: 2000, // Change the interval time in milliseconds (e.g., 2000 for 2 seconds)
    });
  });
});
