const books = [
  {
    id: 1,
    title: "Harry Potter y la Piedra Filosofal",
    image: "https://i.pinimg.com/1200x/f8/a1/7a/f8a17a0b8e2992e8de2575916cad5a62.jpg",
    pages: 223,
    author: "J.K. Rowling",
    year: 1997,
    price: 19000,
  },
  {
    id: 2,
    title: "Harry Potter y la Cámara Secreta",
    image: "https://i.pinimg.com/1200x/07/5e/ab/075eab06638dbf9b488d02bced730de0.jpg",
    pages: 251,
    author: "J.K. Rowling",
    year: 1998,
    price: 21500,
  },
  {
    id: 3,
    title: "Harry Potter y el Prisionero de Azkaban",
    image: "https://i.pinimg.com/1200x/b9/a9/b7/b9a9b7834ad70086b79e941436a6a71e.jpg",
    pages: 317,
    author: "J.K. Rowling",
    year: 1999,
    price: 23900,
  },
  {
    id: 4,
    title: "Harry Potter y el Cáliz de Fuego",
    image: "https://i.pinimg.com/1200x/47/61/1e/47611e7a821249249d65a7480d51f145.jpg",
    pages: 636,
    author: "J.K. Rowling",
    year: 2000,
    price: 25800,
  },
  {
    id: 5,
    title: "Harry Potter y la Orden del Fénix",
    image: "https://i.pinimg.com/736x/77/20/3a/77203a4a4e3b55d2a1a2a100c27577fa.jpg",
    pages: 766,
    author: "J.K. Rowling",
    year: 2003,
    price: 29000,
  },
  {
    id: 6,
    title: "Harry Potter y el Misterio del Príncipe",
    image: "https://i.pinimg.com/1200x/ec/18/ec/ec18ec38e64e27e8ee089e5b92d2460b.jpg",
    pages: 607,
    author: "J.K. Rowling",
    year: 2005,
    price: 33000,
  },
  {
    id: 7,
    title: "Harry Potter y las Reliquias de la Muerte (Parte 1 y 2)",
    image: "https://images.cdn3.buscalibre.com/fit-in/360x360/cc/49/cc49a1bf8c0f2f1f1982fe6a7ca37a71.jpg",
    pages: 704,
    author: "J.K. Rowling",
    year: 2007,
    price: 40000,
  },
  {
    id: 8,
    title: "Harry Potter y las Reliquias de la Muerte (Parte 2)",
    image: "https://images.unsplash.com/photo-1611077544264-9107a255af7c",
    pages: 370,
    year: 2007,
    price: 215,
  },
];

// Referencia al contenedor donde mostrar los libros
const booksContainer = document.getElementById("books-container");

// Función para renderizar los libros en cards
function renderBooks(books) {
  booksContainer.innerHTML = ""; // limpiar contenido previo

  books.forEach(book => {
    // Crear el div card para cada libro
    const bookCard = document.createElement("div");
    bookCard.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

    bookCard.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${book.image}" class="card-img-top" alt="Portada ${book.title}" style="height: 300px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text mb-1">Páginas totales: <strong>${book.pages}</strong></p>
          <p class="card-text mb-1">Autor: <strong>${book.author}</strong></p>
          <p class="card-text mb-1">Publicado en el año: <strong>${book.year}</strong></p>
          <p class="card-text mb-3 text-success">Precio: <strong>$${book.price}</strong></p>

          <div class="d-flex align-items-center mb-3">
            <button class="btn btn-outline-secondary me-2 book-minus-btn">−</button>
            <input type="number" class="form-control text-center quantity" value="1" min="1" readonly style="max-width: 60px;" />
            <button class="btn btn-outline-secondary ms-2 book-plus-btn">+</button>
          </div>

          <button class="btn btn-primary mt-auto book-add-btn" id="book-${book.id}">Añadir al carrito</button>
        </div>
      </div>
    `;

    // Agregar la card al contenedor
    booksContainer.appendChild(bookCard);

    // Agregar eventos para botones +, - y añadir al carrito
    addBookEvent(bookCard, book);
  });
}

// Función para agregar eventos a los botones dentro de cada card
function addBookEvent(bookCard, book) {
  const plusBtn = bookCard.querySelector(".book-plus-btn");
  const minusBtn = bookCard.querySelector(".book-minus-btn");
  const quantityInput = bookCard.querySelector(".quantity");
  const addToCartBtn = bookCard.querySelector(".book-add-btn");

  plusBtn.onclick = () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  };

  minusBtn.onclick = () => {
    if (parseInt(quantityInput.value) > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  };

  addToCartBtn.onclick = () => {
    const quantity = parseInt(quantityInput.value);
    addBookToShoppingCart(book, quantity);
    quantityInput.value = 1; // reset cantidad después de agregar
  };
}

// Función para agregar libros al carrito en localStorage
function addBookToShoppingCart(book, quantity) {
  let currentCart = localStorage.getItem("accionCarrito");
  currentCart = currentCart ? JSON.parse(currentCart) : [];

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
  alert(`Agregaste ${quantity} ejemplar(es) de "${book.title}" al carrito.`);
}

// Llamada inicial para mostrar los libros
renderBooks(books);
