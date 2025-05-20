// --- Логика корзины ---
function updateCartTotal() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;
    cartItems.forEach(item => {
        total += parseFloat(item.price);
    });
    document.getElementById('cart-total').textContent = 'Итого: ' + total.toFixed(2) + ' руб.';
}

function loadCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // Очищаем список

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name + ' - ' + item.price + ' руб.';
        cartItemsList.appendChild(listItem);
    });
}

function addToCart(event) {
    const button = event.target;
    const serviceItem = button.closest('.service-item');
    const id = serviceItem.dataset.id;
    const name = serviceItem.dataset.name;
    const price = serviceItem.dataset.price;

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({
        id: id,
        name: name,
        price: price
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    loadCartItems();
    updateCartTotal();
}

function clearCart() {
    localStorage.removeItem('cartItems');
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
    updateCartTotal();
}

document.addEventListener('DOMContentLoaded', function() {
    // Загружаем товары из корзины при загрузке страницы
    loadCartItems();
    // Обновляем итоговую сумму при загрузке страницы
    updateCartTotal();

    // Привязываем функцию addToCart к кнопкам "В корзину"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Привязываем функцию clearCart к кнопке "Очистить корзину"
    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    } else {
        console.error("Кнопка 'Очистить корзину' не найдена!");
    }
});