const libros = [
    { titulo: "El Principito", autor: "Antoine de Saint-Exupéry" },
    { titulo: "Orgullo y Prejuicio", autor: "Jane Austen" },
    { titulo: "Alicia en el Pais de las Maravillas", autor: "Lewis Carroll" },
    { titulo: "Mujercitas", autor: "Louisa May Alcott" },
];

function mostrarLibros(lista) {
  console.log("Lista de libros disponibles:");
  lista.forEach((libro, index) => {
    console.log(`${index + 1}. "${libro.titulo}" de ${libro.autor}`);
  });
}

function agregarLibro(titulo, autor) {
  libros.push({ titulo, autor });
  alert(`El libro "${titulo}" fue agregado a la biblioteca.`);
}

function buscarLibro(tituloBuscado) {
  const encontrado = libros.find(libro => libro.titulo.toLowerCase() === tituloBuscado.toLowerCase());
  if (encontrado) {
    alert(`Libro encontrado: "${encontrado.titulo}" de ${encontrado.autor}`);
  } else {
    alert("Libro no encontrado.");
  }
}

let opcion;

while (opcion !== "4") {
  opcion = prompt(
    "Bienvenido a la Librería SP \nElige una opción:\n1. Ver libros\n2. Agregar libro\n3. Buscar libro\n4. Salir"
  );

  if (opcion === "1") {
    mostrarLibros(libros);
  } else if (opcion === "2") {
    const nuevoTitulo = prompt("Ingrese el título del nuevo libro:");
    const nuevoAutor = prompt("Ingrese el autor del nuevo libro:");
    agregarLibro(nuevoTitulo, nuevoAutor);
  } else if (opcion === "3") {
    const tituloBuscar = prompt("Ingrese el título del libro:");
    buscarLibro(tituloBuscar);
  } else if (opcion === "4") {
    alert("Gracias por visitar la Librería SP. ¡Saludos!");
  } else {
    alert("Opción inválida. Intente nuevamente.");
  }
}