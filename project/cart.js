// 存儲購物車數據
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 顯示購物車內容
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = ''; // 清空現有內容

    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <input type="number" value="${item.quantity}" min="1" class="quantity" data-id="${item.id}">
            <button class="remove-item" data-id="${item.id}">移除</button>
        `;
        cartItems.appendChild(itemDiv);

        total += item.price * item.quantity;
    });

    cartTotal.innerHTML = `總金額: $${total}`;
}

// 更新購物車
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// 處理「加入購物車」按鈕點擊事件
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-product-id');
        const productName = e.target.getAttribute('data-product-name');
        const productPrice = parseFloat(e.target.getAttribute('data-product-price'));

        // 檢查產品是否已經在購物車中
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    });
});

// 處理數量變更事件
document.addEventListener('change', (e) => {
    if (e.target.classList.contains('quantity')) {
        const productId = e.target.getAttribute('data-id');
        const newQuantity = parseInt(e.target.value);

        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity = newQuantity;
            updateCart();
        }
    }
});

// 處理移除商品事件
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const productId = e.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
});

// 顯示購物車頁面
if (window.location.pathname.includes('cart.html')) {
    displayCart();
}

// 處理結帳功能
document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('結帳成功！');
        localStorage.removeItem('cart');
        cart = [];
        updateCart();
    } else {
        alert('購物車是空的！');
    }
});