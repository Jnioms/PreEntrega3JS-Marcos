// Clases

class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  devolverPorcentajeIVA() {
    return this.precio * 1.21;
  }
}

// Función

function eliminarProducto(producto) {
  // Busco índice donde está el elemento
  const indiceElementoAEliminar = listaDeProductos.findIndex(
    (productoAEliminar) => {
      return productoAEliminar.nombre === producto.nombre;
    }
  );

  // Borro el producto utilizando el índice
  listaDeProductos.splice(indiceElementoAEliminar, 1);

  actualizarLS();

  renderizarProductos(listaDeProductos);
}

function editarNombreProducto(producto, nuevoNombre) {
  // Busco índice donde está el elemento
  const indiceElementoAModificar = listaDeProductos.findIndex(
    (productoAModificar) => {
      return productoAModificar.nombre === producto.nombre;
    }
  );

  // Actualizo el nombre del producto
  listaDeProductos[indiceElementoAModificar].nombre = nuevoNombre;

  actualizarLS();

  renderizarProductos(listaDeProductos);
}

function editarPrecioProducto(producto, nuevoPrecio) {
  // Busco índice donde está el elemento
  const indiceElementoAModificar = listaDeProductos.findIndex(
    (productoAModificar) => {
      return productoAModificar.nombre === producto.nombre;
    }
  );

  // Actualizo el precio del producto
  listaDeProductos[indiceElementoAModificar].precio = nuevoPrecio;

  actualizarLS();

  renderizarProductos(listaDeProductos);
}

function renderizarProductos(productos) {
  // Limpio la tabla
  bodyTabla.innerHTML = "";

  productos.forEach((producto) => {
    // Creamos la fila
    const tr = document.createElement("tr");

    const tdNombre = document.createElement("td");
    const spanNombre = document.createElement("span");
    spanNombre.innerHTML = `${producto.nombre}`;
    tdNombre.append(spanNombre);

    // Agregar evento de click al span para poner el input
    spanNombre.addEventListener("click", () => {
      // Ocultar etiqueta Nombre
      spanNombre.className = "oculta";

      // Creo el input que va a ser el cambio de nombre
      const inputCambioDeNombre = document.createElement("input");
      inputCambioDeNombre.value = producto.nombre;

      // Detecto cambio en el input
      inputCambioDeNombre.addEventListener("change", () => {
        // Obtengo el nuevo nombre del producto a través del value del input
        const nuevoNombre = inputCambioDeNombre.value;

        // Removemos el input
        inputCambioDeNombre.remove();

        // Volver a poner el span
        spanNombre.className = "visible";

        // Editar nombre del producto
        editarNombreProducto(producto, nuevoNombre);
      });

      // Agrego el input al td
      tdNombre.append(inputCambioDeNombre);
    });

    const tdPrecio = document.createElement("td");
    const spanPrecio = document.createElement("span");
    spanPrecio.innerHTML = `$${producto.precio}`;
    tdPrecio.append(spanPrecio);

    // Agregar evento de click al span para poner el input
    spanPrecio.addEventListener("click", () => {
      // Ocultar etiqueta span
      spanPrecio.className = "oculta";

      // Creo el input que va a ser el cambio de precio
      const inputCambioDePrecio = document.createElement("input");
      inputCambioDePrecio.value = producto.precio;

      // Detecto cambio en el input
      inputCambioDePrecio.addEventListener("change", () => {
        // Obtengo el nuevo precio del producto a través del value del input
        const nuevoPrecio = inputCambioDePrecio.value;

        // Removemos el input
        inputCambioDePrecio.remove();

        // Volver a poner el span
        spanPrecio.className = "visible";

        // Editar precio del producto
        editarPrecioProducto(producto, nuevoPrecio);
      });

      // Agrego el input al td
      tdPrecio.append(inputCambioDePrecio);
    });

    const tdIVA = document.createElement("td");
    tdIVA.innerHTML = `$${producto.devolverPorcentajeIVA()}`;

    const tdAcciones = document.createElement("td");
    const botonEliminarProducto = document.createElement("button");
    botonEliminarProducto.className = "btn btn-outline-danger";
    botonEliminarProducto.innerText = "Eliminar";

    // Agregar evento al boton de eliminar
    botonEliminarProducto.addEventListener("click", () => {
      eliminarProducto(producto);
    });

    tdAcciones.append(botonEliminarProducto);

    // Agrego los tds al tr
    tr.append(tdNombre);
    tr.append(tdPrecio);
    tr.append(tdIVA);
    tr.append(tdAcciones);

    // Agrego el tr al tbody
    bodyTabla.append(tr);
  });
}

function obtenerProductos() {
  let productos = [];

  // Obtengo lo que hay en LS
  let productosLS = localStorage.getItem("productos");

  // Si hay algo (Lo que significa que no me devuelve null) lo parseo y lo asigno a la variable productos
  if (productosLS !== null) {
    // Parseo los objetos literales del JSON
    const productosJSON = JSON.parse(productosLS);

    // Recorro cada objeto literal e instancio un nuevo objeto de la clase Producto
    for (const productoJSON of productosJSON) {
      productos.push(new Producto(productoJSON.nombre, productoJSON.precio));
    }
  }

  return productos;
}

function actualizarLS() {
  // Parseo array de objetos a JSON
  const listaDeProductosJSON = JSON.stringify(listaDeProductos);

  // Almaceno el JSON en LS
  localStorage.setItem("productos", listaDeProductosJSON);
}

// Inicio del programa

// Obtengo los productos
const listaDeProductos = obtenerProductos();

const formularioCargarProductos = document.getElementById("cargarProductos");
const bodyTabla = document.getElementById("bodyTabla");
const inputNombre = document.getElementById("nombreDelProducto");
const inputPrecio = document.getElementById("precioDelProducto");
const inputBuscar = document.getElementById("buscarProducto");

formularioCargarProductos.addEventListener("submit", (event) => {
  // Freno el flujo del evento
  event.preventDefault();

  // Obtengo el nombre y el precio
  const nombre = inputNombre.value;
  const precio = inputPrecio.value;

  // Limpio los inputs
  inputNombre.value = "";
  inputPrecio.value = "";

  // Agrego el producto al array
  listaDeProductos.push(new Producto(nombre, precio));

  actualizarLS();

  // Renderizo los productos
  renderizarProductos(listaDeProductos);
});

inputBuscar.addEventListener("input", () => {
  const palabraABuscar = inputBuscar.value;

  // Filtro los productos
  const productosFiltrados = listaDeProductos.filter((producto) => {
    return producto.nombre.toLowerCase().includes(palabraABuscar.toLowerCase());
  });

  renderizarProductos(productosFiltrados);
});

// Renderizo los productos
renderizarProductos(listaDeProductos);
