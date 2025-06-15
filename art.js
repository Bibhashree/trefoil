const cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const name = event.target.dataset.name;
        const price = parseFloat(event.target.dataset.price);
        
        cart.push({ name, price });
        updateCart();
    });
});
function updateCart() {
    const cartList = document.getElementById('cart-list');
    const total = document.getElementById('total');
    
    cartList.innerHTML = '';
    let sum = 0;
    
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
        sum += item.price;
    });
    
    total.textContent = sum;
}

  let currentSlide = 0;

  function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;
    slides.style.transform = 'translateX(' + (-currentSlide * 100) + '%)';
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  setInterval(() => {
    nextSlide();
  }, 4000); // change slide every 4 seconds
