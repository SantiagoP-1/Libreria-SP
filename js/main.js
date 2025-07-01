let libros = JSON.parse(localStorage.getItem("libros")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderLibros(lista) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    if (lista.length === 0) {
        productsContainer.innerHTML = "<p>No hay libros para mostrar.</p>";
        return;
    }

    lista.forEach((libro, index) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <span><strong>${libro.titulo}</strong> de ${libro.autor}</span>
            <button class="btnAgregarCarrito" data-index="${index}">Agregar al carrito</button>
        `;
        productsContainer.appendChild(div);
    });

    agregarAlCarrito();
}
function agregarAlCarrito() {
    const botonesAgregar = document.querySelectorAll(".btnAgregarCarrito");
    botonesAgregar.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            const libro = libros[index];
            carrito.push(libro);
            guardarCarrito();
            mostrarCarrito(carrito);
        });
    });
}

function guardarLibros() {
    localStorage.setItem("libros", JSON.stringify(libros));
}
document.getElementById("btnAgregar").addEventListener("click", () => {
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();

    if (titulo === "" || autor === "") {
        mostrarMensaje("Por favor, completa todo.");
        return;
    }

    libros.push({ titulo, autor });
    guardarLibros();
    renderLibros(libros);
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
});

document.getElementById("btnBuscar").addEventListener("click", () => { 
    const texto = document.getElementById("buscador").value.trim().toLowerCase();
    if (texto === "") {
        renderLibros(libros);
        return;
    }
    const filtrados = libros.filter(libro => libro.titulo.toLowerCase().includes(texto));
    renderLibros(filtrados);
});

document.getElementById("btnMostrarTodos").addEventListener("click", () => {
    renderLibros(libros);
});

function mostrarMensaje(mensaje) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = `<p>${mensaje}</p>`;
}

function mostrarCarrito(lista) {
    const carritoContainer = document.getElementById("carrito-container");
    carritoContainer.innerHTML = "";

    if (lista.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    lista.forEach((libro, index) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <span><strong>${libro.titulo}</strong> de ${libro.autor}</span>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoContainer.appendChild(div);
    });
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    mostrarCarrito(carrito);
}

renderLibros(libros);
mostrarCarrito(carrito);