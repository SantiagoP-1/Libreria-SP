let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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

function agregarAlCarrito(index) {
    const libro = libro[index];
    carrito.push(libro);
    guardarCarrito();
    mostrarCarrito(carrito);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    mostrarCarrito(carrito);
}

mostrarCarrito(carrito);