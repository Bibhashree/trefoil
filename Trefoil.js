document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "slider/hom1.jpg",
    "slider/hom2.jpg",
    "slider/hom3.jpg",
    "slider/hom4.jpg",
    "slider/hom5.jpg"
  ];

  let index = 0;
  const sliderImage = document.querySelector(".slider-image");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  function showImage(i) {
    sliderImage.src = images[i];
  }

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    showImage(index);
  });

  // Autoplay
  setInterval(() => {
    index = (index + 1) % images.length;
    showImage(index);
  }, 4000); // 4 seconds interval
});
