const productos = [
  {
    id: 1,
    nombre: "Nike Blazer Low '77 By You",
    descripcion: "Combinan un estilo clásico y limpio con un diseño personalizable, para crear un look único en blanco o con tus detalles favoritos. ",
    precio: 300000,
    imagen: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_1616,c_limit/5413be7e-44cb-4fe1-bf60-88ba5f72381b/mejor-calzado-deportivo-blanco-de-nike.jpg"
  },
  {
    id: 2,
    nombre: "Vomero 18",
    descripcion: "una pisada suave y cómoda, con gran amortiguación para acompañarte en cada carrera. Un diseño moderno pensado para correr con comodidad y confianza.",
    precio: 1000000,
    imagen: "https://static.nike.com/a/images/f_auto,cs_srgb/w_960,c_limit/4e4ea44c-71e5-4458-ac3c-4c790423928a/el-mejor-calzado-con-amortiguaci%C3%B3n-de-nike-para-correr-y-caminar.jpg"
  },
  {
    id: 3,
    nombre: " Nike Air Force 1 Low “Panda” ",
    descripcion: "Clásicas y versátiles. Combinan blanco y negro para un estilo urbano y atemporal..",
    precio: 600000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-yVk6tVeElYzJJ7KDuX0tVC0_TgdCPgjTehFU2RbKKPQ4mlnSRmSPs6_v&s=10"
  },
  {
    id: 4,
    nombre: "Nike X2 Limited ",
    descripcion: "Destacan por su diseño moderno, cómodo y versátil, perfectas para un estilo urbano y deportivo.",
    precio: 900000,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_814457-MLV101161921375_122025-T.webp"
  },
  {
    id: 5,
    nombre: "Air Max Plus Paris Saint-Germain",
    descripcion: "Combinan el estilo icónico de Air Max con los colores y detalles inspirados en el PSG, para un look deportivo y urbano.",
    precio: 2200000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIW6_nEvSSrMMQtdz_H2TI-03IAr_kQUJmOYkFDdlZONMa66BjlmZnBjhY&s=10"
  }
];


/* ==============================
   CARRITO
================================ */

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");


/* ==============================
   MOSTRAR PRODUCTOS
================================ */

function mostrarProductos() {

  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.className = "producto";

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">

      <h3>${prod.nombre}</h3>

      <p class="descripcion">
        ${prod.descripcion}
      </p>

      <p class="precio">
        ${prod.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0
        })}
      </p>

      <button onclick="agregarAlCarrito(${prod.id})">
        Agregar al carrito
      </button>
    `;

    contenedorProductos.appendChild(div);

  });

}


/* ==============================
   AGREGAR AL CARRITO
================================ */

function agregarAlCarrito(id) {

  const productoExistente =
    carrito.find(p => p.id === id);

  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    const producto =
      productos.find(p => p.id === id);

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  actualizarCarrito();

}


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

  listaCarrito.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {

    const li =
      document.createElement("li");

    const subtotal =
      item.precio * item.cantidad;

    li.textContent =
      `${item.nombre} x${item.cantidad} — ` +
      subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      });

    listaCarrito.appendChild(li);

    total += subtotal;
    totalItems += item.cantidad;

  });

  totalCarrito.textContent =
    total.toLocaleString("es-CO");

  actualizarTituloCarrito(totalItems);

}


/* ==============================
   CONTADOR DEL CARRITO
================================ */

function actualizarTituloCarrito(cantidad) {

  const titulo =
    document.querySelector(".carrito h2");

  titulo.textContent =
    `🧾 Carrito de Compras (${cantidad})`;

}


/* ==============================
   VACIAR CARRITO
================================ */

function vaciarCarrito() {

  if (carrito.length === 0) {

    alert("🛒 El carrito ya está vacío.");

    return;

  }

  if (
    confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    )
  ) {

    carrito.length = 0;

    actualizarCarrito();

  }

}


/* ==============================
   FINALIZAR COMPRA
================================ */

function finalizarCompra() {

  if (carrito.length === 0) {

    alert(
      "🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra."
    );

    return;

  }

  alert(
    "🎉 ¡Pedido simulado confirmado!\n\n" +
    "En un eCommerce real, ahora entrarían en acción " +
    "el backend, la pasarela de pago y la logística."
  );

  carrito.length = 0;

  actualizarCarrito();

}


/* ==============================
   INICIAR TIENDA
================================ */

mostrarProductos();
