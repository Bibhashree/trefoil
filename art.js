// SLIDER
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
setInterval(nextSlide, 4000);

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".gallery-img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});
window.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.style.display = "none";
});

// WIKIPEDIA IMAGE SEARCH
document.getElementById("search-btn").addEventListener("click", async () => {
  const query = document.getElementById("search-input").value.trim();
  if (!query) return;

  const apiURL = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&titles=${encodeURIComponent(query)}&piprop=original`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    const pages = data.query.pages;
    const page = Object.values(pages)[0];

    if (page.original && page.original.source) {
      document.getElementById("api-image").src = page.original.source;
    } else {
      document.getElementById("api-image").src = "";
      alert("No image found on Wikipedia.");
    }
  } catch (error) {
    console.error("Wikipedia fetch error:", error);
  }
});
