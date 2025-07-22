let accionCarrito = JSON.parse(localStorage.getItem("accionCarrito")) || [];

function renderCartShopping() {
  const shoppingCartBody = document.getElementById("shopping-cart-body");
  const totalPrice = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");

  if (!accionCarrito.length) {
    document.getElementById("empty-cart-message").style.display = "block";
    shoppingCartBody.innerHTML = "";
    totalPrice.textContent = "0.00";
    checkoutButton.disabled = true;
    return;
  } else {
    document.getElementById("empty-cart-message").style.display = "none";
    checkoutButton.disabled = false;
  }

  let total = 0;
  shoppingCartBody.innerHTML = "";

  accionCarrito.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${item.image}" alt="${item.title}" class="img-fluid" style="max-width: 60px; height: auto;">
      </td>
      <td>${item.title}</td>
      <td>${item.author ? item.author : "No especificado"}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" class="form-control text-center quantity-input" id="${item.id}" value="${item.quantity}" min="1" style="width: 80px; margin: auto;">
      </td>
    `;

    shoppingCartBody.appendChild(row);
    addQuantityEvent(row);
  });

  totalPrice.textContent = total.toFixed(2);
}

function addQuantityEvent(row) {
  const input = row.querySelector(".quantity-input");

  input.onchange = (e) => {
    const id = parseInt(e.target.id);
    let newQty = parseInt(e.target.value);
    if (isNaN(newQty) || newQty < 1) newQty = 1;

    const index = accionCarrito.findIndex((item) => item.id === id);
    accionCarrito[index].quantity = newQty;
    updateCartShopping();
  };
}

function updateCartShopping() {
  localStorage.setItem("accionCarrito", JSON.stringify(accionCarrito));
  renderCartShopping();
}

renderCartShopping();
