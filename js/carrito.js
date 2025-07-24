let accionCarrito = [];
try {
  const storedCart = localStorage.getItem("accionCarrito");
  accionCarrito = storedCart ? JSON.parse(storedCart) : [];
} catch (error) {
  accionCarrito = [];
}
function renderCartShopping() {
  const shoppingCartBody = document.getElementById("shopping-cart-body");
  const totalPrice = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  if (!shoppingCartBody || !totalPrice || !checkoutButton || !emptyCartMessage) {
    return;
  }
  if (!accionCarrito.length) {
    emptyCartMessage.style.display = "block";
    shoppingCartBody.innerHTML = "";
    totalPrice.textContent = "0.00";
    checkoutButton.disabled = true;
    return;
  } else {
    emptyCartMessage.style.display = "none";
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
        <img src="${item.image}" alt="${item.title}" class="img-fluid rounded-md" style="max-width: 60px; height: auto;">
      </td>
      <td class="align-middle">${item.title}</td>
      <td class="align-middle">${item.author ? item.author : "No especificado"}</td>
      <td class="align-middle">$${item.price.toFixed(2)}</td>
      <td class="align-middle">
        <input type="number" class="form-control text-center quantity-input rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" id="${item.id}" value="${item.quantity}" min="1" style="width: 80px; margin: auto;">
      </td>
      <td class="align-middle">
        <button class="btn btn-danger btn-sm remove-item-btn rounded-md bg-red-500 text-white px-3 py-1 hover:bg-red-600 transition-colors duration-200" data-id="${item.id}">Eliminar</button>
      </td>
    `;
    shoppingCartBody.appendChild(row);
    addQuantityEvent(row);
    addRemoveEvent(row);
  });
  totalPrice.textContent = total.toFixed(2);
}
function addQuantityEvent(row) {
  const input = row.querySelector(".quantity-input");
  if (input) {
    input.onchange = (e) => {
      const id = parseInt(e.target.id);
      let newQty = parseInt(e.target.value);
      if (isNaN(newQty) || newQty < 1) {
        newQty = 1;
        e.target.value = 1;
      }
      const index = accionCarrito.findIndex((item) => item.id === id);
      if (index !== -1) {
        accionCarrito[index].quantity = newQty;
        updateCartShopping();
      }
    };
  }
}
function addRemoveEvent(row) {
  const removeButton = row.querySelector(".remove-item-btn");
  if (removeButton) {
    removeButton.onclick = (e) => {
      const idToRemove = parseInt(e.target.dataset.id);
      accionCarrito = accionCarrito.filter(item => item.id !== idToRemove);
      updateCartShopping();
    };
  }
}
function updateCartShopping() {
  try {
    localStorage.setItem("accionCarrito", JSON.stringify(accionCarrito));
  } catch (error) {
    // manejo de error (opcional)
  }
  renderCartShopping();
}
function addRemoveEvent(row) {
  const removeButton = row.querySelector(".remove-item-btn");
  if (removeButton) {
    removeButton.onclick = (e) => {
      const idToRemove = parseInt(e.target.dataset.id);
      accionCarrito = accionCarrito.filter(item => item.id !== idToRemove);
      updateCartShopping();

      Toastify({
        text: "📚 Libro Eliminado",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#f44336",
      }).showToast();
    };
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const shoppingCartBody = document.getElementById("shopping-cart-body");
  if (shoppingCartBody) {
    renderCartShopping();
  }
})
  const checkoutButton = document.getElementById("checkout-btn");
  if (checkoutButton){
checkoutButton.addEventListener("click", () => {
  const totalLibros = accionCarrito.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrecio = accionCarrito.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  const titulos = accionCarrito.map(item => item.title).join(', ');
  const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario")) || {};

  Swal.fire({
    title: 'Confirmar Compra',
    html: `
      <div class="text-start">
        <p><strong>Resumen de tu compra:</strong></p>
        <ul style="margin-left: 1em; padding-left: 0.5em;">
          <li>📘 <strong>Total de libros:</strong> ${totalLibros}</li>
          <li>💰 <strong>Precio total:</strong> $${totalPrecio}</li>
          <li>🛍️ <strong>Títulos:</strong> ${titulos}</li>
        </ul>
        <hr class="my-2">
        <p><strong>Completá tus datos para finalizar la compra:</strong></p>
        <input type="text" id="nombreInput" class="swal2-input" placeholder="Tu nombre">
        <input type="email" id="emailInput" class="swal2-input" placeholder="tu@email.com">
        <input type="text" id="direccionInput" class="swal2-input" placeholder="Calle y número">
        <input type="text" id="tarjetaInput" class="swal2-input" placeholder="XXXX XXXX XXXX XXXX" maxlength="19">
      </div>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Comprar',
    cancelButtonText: 'Cancelar',

    didOpen: () => {
      const popup = Swal.getPopup();
      popup.querySelector('#nombreInput').value = datosGuardados.nombre || '';
      popup.querySelector('#emailInput').value = datosGuardados.email || '';
      popup.querySelector('#direccionInput').value = datosGuardados.direccion || '';
      popup.querySelector('#tarjetaInput').value = datosGuardados.tarjeta || '';

      const tarjetaInput = popup.querySelector('#tarjetaInput');
      tarjetaInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formatted = '';
        for (let i = 0; i < value.length; i += 4) {
          formatted += value.substring(i, i + 4) + ' ';
        }
        e.target.value = formatted.trim();
      });
    },

    preConfirm: () => {
      const popup = Swal.getPopup();
      const nombre = popup.querySelector('#nombreInput').value.trim();
      const email = popup.querySelector('#emailInput').value.trim();
      const direccion = popup.querySelector('#direccionInput').value.trim();
      const tarjeta = popup.querySelector('#tarjetaInput').value.trim();

      if (!nombre || !email || !direccion || !tarjeta) {
        Swal.showValidationMessage('⚠️ Por favor, completa todos los campos.');
        return false;
      }

      const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
      if (!regexNombre.test(nombre)) {
        Swal.showValidationMessage('⚠️ El nombre solo debe contener letras y espacios.');
        return false;
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email)) {
        Swal.showValidationMessage('⚠️ Ingresá un email válido.');
        return false;
      }

      const regexDireccion = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/;
      if (!regexDireccion.test(direccion)) {
        Swal.showValidationMessage('⚠️ La dirección solo puede contener letras, números y espacios.');
        return false;
      }

      const cleanTarjeta = tarjeta.replace(/\s+/g, '');
      if (!/^\d{16}$/.test(cleanTarjeta)) {
        Swal.showValidationMessage('⚠️ El número de tarjeta debe tener 16 dígitos numéricos.');
        return false;
      }

      return { nombre, email, direccion, tarjeta };
    }

  }).then((result) => {
    if (result.isConfirmed) {
      const { nombre, email, direccion, tarjeta } = result.value;

      localStorage.setItem("datosUsuario", JSON.stringify({ nombre, email, direccion, tarjeta }));
      accionCarrito = [];
      localStorage.removeItem("accionCarrito");
      renderCartShopping();

      Swal.fire(
        '¡Compra Realizada!',
        'Tu compra se ha procesado con éxito. ¡Gracias!',
        'success'
      ).then(() => {
        window.location.href = "../index.html";
      });
    }
  });
});
};

