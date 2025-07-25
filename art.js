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

  // API SEARCH
document.getElementById("search-btn").addEventListener("click", async () => {
  const query = document.getElementById("search-input").value.trim();
  if (!query) return;

  // Show loading animation
  const loadingDots = document.querySelector('.loading-dots');
  const apiImage = document.getElementById('api-image');
  const apiCaption = document.getElementById('api-caption');
  const apiError = document.getElementById('api-error');
  
  apiImage.style.display = 'none';
  apiCaption.style.display = 'none';
  apiError.style.display = 'none';
  loadingDots.style.display = 'flex';

  // Harvard Art Museums API 
  const apiKey = 'd77f5245-7e57-4517-9b94-073985ffad6c'; 
  const apiURL = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&title=${encodeURIComponent(query)}&hasimage=1&size=1&sort=random`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();

    // Hide loading
    loadingDots.style.display = 'none';
    
    if (data.records && data.records.length > 0) {
      const artwork = data.records[0];
      // Get the largest available image
      const imageUrl = artwork.images && artwork.images[0] ? 
        artwork.images[0].baseimageurl : null;
      
      if (imageUrl) {
        apiImage.src = imageUrl;
        apiImage.alt = artwork.title || 'Artwork from Harvard Art Museums';
        
        // Build caption with available metadata
        let caption = '';
        if (artwork.title) caption += artwork.title;
        if (artwork.people && artwork.people[0]?.displayname) {
          caption += ` by ${artwork.people[0].displayname}`;
        }
        if (artwork.dated) caption += ` (${artwork.dated})`;
        
        apiCaption.textContent = caption || 'Artwork from Harvard Art Museums';
        apiImage.style.display = 'block';
        apiCaption.style.display = 'block';
      } else {
        apiError.textContent = "Artwork found but no image available.";
        apiError.style.display = 'block';
      }
    } else {
      apiError.textContent = "No artwork found matching your search.";
      apiError.style.display = 'block';
    }
  } catch (error) {
    console.error("API fetch error:", error);
    loadingDots.style.display = 'none';
    apiError.textContent = `Error fetching artwork: ${error.message}`;
    apiError.style.display = 'block';
  }
});