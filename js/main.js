let books = [];
const booksContainer = document.getElementById("books-container");
function renderBooks(booksToRender) {
  if (!booksContainer) {
    return;
  }
  booksContainer.innerHTML = "";
  booksToRender.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
    bookCard.innerHTML = `
      <div class="card h-100 shadow-sm rounded-lg overflow-hidden">
        <img src="${book.image}" class="card-img-top object-cover w-full" alt="Portada ${book.title}" style="height: 300px;">
        <div class="card-body d-flex flex-column p-4">
          <h5 class="card-title text-xl font-semibold mb-2">${book.title}</h5>
          <p class="card-text mb-1 text-gray-700">Páginas totales: <strong class="font-medium">${book.pages}</strong></p>
          <p class="card-text mb-1 text-gray-700">Autor: <strong class="font-medium">${book.author || "No especificado"}</strong></p>
          <p class="card-text mb-1 text-gray-700">Publicado en el año: <strong class="font-medium">${book.year}</strong></p>
          <p class="card-text mb-3 text-green-600 text-lg font-bold">Precio: <strong>$${book.price}</strong></p>

          <div class="d-flex align-items-center mb-3">
            <button class="btn btn-outline-secondary me-2 book-minus-btn rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition-colors duration-200 hover:bg-gray-100">−</button>
            <input type="number" class="form-control text-center quantity rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" value="1" min="1" readonly style="max-width: 60px;" />
            <button class="btn btn-outline-secondary ms-2 book-plus-btn rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition-colors duration-200 hover:bg-gray-100">+</button>
          </div>

          <button class="btn btn-primary mt-auto book-add-btn w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200" id="book-${book.id}">Comprar</button>
        </div>
      </div>
    `;
    booksContainer.appendChild(bookCard);
    addBookEvent(bookCard, book);
  });
}
function addBookEvent(bookCard, book) {
  const plusBtn = bookCard.querySelector(".book-plus-btn");
  const minusBtn = bookCard.querySelector(".book-minus-btn");
  const quantityInput = bookCard.querySelector(".quantity");
  const addToCartBtn = bookCard.querySelector(".book-add-btn");
  if (plusBtn) {
    plusBtn.onclick = () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    };
  }
  if (minusBtn) {
    minusBtn.onclick = () => {
      if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    };
  }
  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      const quantity = parseInt(quantityInput.value);
      addBookToShoppingCart(book, quantity);
      quantityInput.value = 1;
    };
  }
}
function addBookToShoppingCart(book, quantity) {
  let currentCart = [];
  try {
    const storedCart = localStorage.getItem("accionCarrito");
    currentCart = storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    currentCart = [];
  }
  const existingBookIndex = currentCart.findIndex(item => item.id === book.id);
  if (existingBookIndex !== -1) {
    currentCart[existingBookIndex].quantity += quantity;
  } else {
    currentCart.push({
      id: book.id,
      title: book.title,
      image: book.image,
      pages: book.pages,
      author: book.author,
      year: book.year,
      price: book.price,
      quantity: quantity
    });
  }
  localStorage.setItem("accionCarrito", JSON.stringify(currentCart));
  // Toastify
  Toastify({
    text: "📚 Libro añadido al carrito",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "#4caf50",
  }).showToast();
}
document.addEventListener("DOMContentLoaded", async () => {
  if (booksContainer) {
    try {
      const response = await fetch("./db/libros.json");
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      books = await response.json();
      renderBooks(books);
    } catch (error) {
      if (booksContainer) {
        booksContainer.innerHTML = `<p class="text-red-500 text-center col-span-full">No se pudieron cargar los libros.</p>`;
      }
    }
  }
});
