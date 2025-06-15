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