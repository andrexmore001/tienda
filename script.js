// Base de datos de productos (simulada)
const productos = [
    {
        id: 1,
        nombre: "Collar de Plata",
        precio: 299,
        imagenes: ["productos/prod1.jpg", "productos/prod2.png"],
        tiene3D: true,
        iframe3D: '<iframe src="https://pacdora.com/embed/3d/ID-DEL-PRODUCTO" width="100%" height="400px"></iframe>'
    },
    {
        id: 2,
        nombre: "Aretes de Oro",
        precio: 499,
        imagenes: ["productos/prod1.jpg"],
        tiene3D: false // Este producto no tiene 3D
    },{
        id: 1,
        nombre: "Collar de Plata",
        precio: 299,
        imagenes: ["productos/prod2.png", "productos/prod1.jpg"],
        tiene3D: true,
        iframe3D: '<iframe src="https://pacdora.com/embed/3d/ID-DEL-PRODUCTO" width="100%" height="400px"></iframe>'
    },
    {
        id: 2,
        nombre: "Aretes de Oro",
        precio: 499,
        imagenes: ["productos/prod1.jpg"],
        tiene3D: false // Este producto no tiene 3D
    },{
        id: 1,
        nombre: "Collar de Plata",
        precio: 299,
        imagenes: ["productos/prod2.png", "productos/prod1.jpg"],
        tiene3D: true,
        iframe3D: '<iframe src="https://pacdora.com/embed/3d/ID-DEL-PRODUCTO" width="100%" height="400px"></iframe>'
    },
    {
        id: 2,
        nombre: "Aretes de Oro",
        precio: 499,
        imagenes: ["productos/prod1.jpg"],
        tiene3D: false // Este producto no tiene 3D
    },{
        id: 1,
        nombre: "Collar de Plata",
        precio: 299,
        imagenes: ["productos/prod1.jpg", "productos/prod1.jpg"],
        tiene3D: true,
        iframe3D: '<iframe src="https://pacdora.com/embed/3d/ID-DEL-PRODUCTO" width="100%" height="400px"></iframe>'
    },
    {
        id: 2,
        nombre: "Aretes de Oro",
        precio: 499,
        imagenes: ["productos/prod1.jpg"],
        tiene3D: false // Este producto no tiene 3D
    },{
        id: 2,
        nombre: "Aretes de Oro",
        precio: 499,
        imagenes: ["productos/prod1.jpg"],
        tiene3D: false // Este producto no tiene 3D
    }
];
// Variable global para guardar el ID del producto abierto
let currentProductId = null;
// Variables globales
let carrito = [];
const contadorCarrito = document.querySelector('.contador-carrito');
const gridProductos = document.getElementById('grid-productos');
const modalCarrito = document.getElementById('modal-carrito');
const itemsCarrito = document.getElementById('items-carrito');
const totalCarrito = document.getElementById('total');
const btnPagar = document.querySelector('.btn-pagar');

// Función para abrir el modal del producto
function abrirModalProducto(id) {
    const producto = productos.find(p => p.id === id);
    const modal = document.getElementById("modal-producto");
    const visorPrincipal = document.getElementById("visor-principal");
    const selectorVistas = document.getElementById("selector-vistas");

    // Resetear el modal
    visorPrincipal.innerHTML = "";
    selectorVistas.innerHTML = "";

    // ---- Caso 1: Tiene 3D + imágenes ----
    if (producto.tiene3D && producto.imagenes.length > 0) {
        // 1. Mostrar 3D como vista principal
        visorPrincipal.innerHTML = producto.iframe3D;

        // 2. Crear selector de vistas (3D + imágenes)
        selectorVistas.innerHTML = `
            <button class="btn-vista" onclick="cambiarVista('3d')">Ver en 3D</button>
            ${producto.imagenes.map((img, index) => `
                <img 
                    src="${img}" 
                    alt="Vista ${index + 1}" 
                    onclick="cambiarVista('imagen', '${img}')"
                >
            `).join("")}
        `;

    // ---- Caso 2: Solo imágenes ----
    } else if (producto.imagenes.length > 0) {
        // 1. Mostrar primera imagen como vista principal
        visorPrincipal.innerHTML = `<img src="${producto.imagenes[0]}" class="imagen-activa">`;

        // 2. Crear selector de imágenes (miniaturas)
        selectorVistas.innerHTML = producto.imagenes.map((img, index) => `
            <img 
                src="${img}" 
                alt="Miniatura ${index + 1}" 
                onclick="cambiarImagen('${img}')"
                class="${index === 0 ? 'miniatura-activa' : ''}"
            >
        `).join("");
        abrirModal('modal-producto');
    }

    // Actualizar info del producto
    document.getElementById("modal-nombre").textContent = producto.nombre;
    document.getElementById("modal-precio").textContent = `$${producto.precio.toFixed(2)}`;
    document.getElementById("btn-agregar-carrito").onclick = () => agregarAlCarrito(id);

    // Mostrar modal
    modal.style.display = "block";
}
// Cambiar entre 3D e imágenes
function cambiarVista(tipo, srcImagen = "") {
    const visorPrincipal = document.getElementById("visor-principal");
    const producto = productos.find(p => p.id === currentProductId); // Necesitarás guardar el ID del producto abierto

    if (tipo === "3d") {
        visorPrincipal.innerHTML = producto.iframe3D;
    } else {
        visorPrincipal.innerHTML = `<img src="${srcImagen}" class="imagen-activa">`;
    }
}

// Cambiar imagen en productos sin 3D
function cambiarImagen(srcImagen) {
    document.querySelector(".visor-principal img").src = srcImagen;
    
    // Resaltar miniatura activa
    document.querySelectorAll(".selector-vistas img").forEach(img => {
        img.classList.remove("miniatura-activa");
        if (img.src === srcImagen) img.classList.add("miniatura-activa");
    });
}
// Cargar productos en la página
// Modificar la función cargarProductos() para incluir el modal
function cargarProductos() {
    gridProductos.innerHTML = productos.map(producto => `
        <div class="producto" onclick="abrirModalProducto(${producto.id})">
            ${producto.tiene3D ? 
                `<div class="badge-3d">3D</div>` : 
                ''
            }
            <img src="${producto.imagenes[0]}" alt="${producto.nombre}">
            <div class="producto-info">
                <a>${producto.nombre}</a>
                <p>$${producto.precio.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
        carrito.push(producto);
        actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
    contadorCarrito.textContent = carrito.length;
    itemsCarrito.innerHTML = carrito.map(item => `
        <div class="item-carrito">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div>
                <h4>${item.nombre}</h4>
                <p>$${item.precio.toFixed(2)}</p>
            </div>
            <i class="fas fa-trash" onclick="eliminarDelCarrito(${item.id})"></i>
        </div>
    `).join('');

    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    totalCarrito.textContent = `$${total.toFixed(2)}`;
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Abrir/cerrar modal del carrito
// Función para cerrar modales
function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Función para abrir modales
function abrirModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Event listeners para cerrar modales
document.querySelector('.cerrar-modal-producto').addEventListener('click', () => {
    cerrarModal('modal-producto');
});

document.querySelector('.cerrar-modal-carrito').addEventListener('click', () => {
    cerrarModal('modal-carrito');
});

// Cerrar al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-producto')) {
        cerrarModal('modal-producto');
    }
    if (e.target === document.getElementById('modal-carrito')) {
        cerrarModal('modal-carrito');
    }
});

// Abrir modal del carrito
document.querySelector('.carrito-icono').addEventListener('click', () => {
    abrirModal('modal-carrito');
});
// Botón de pago (simulación)
btnPagar.addEventListener('click', () => {
    alert('Redirigiendo a PayPal...');
    carrito = [];
    actualizarCarrito();
    modalCarrito.style.display = 'none';
});

let productoSeleccionado = null;

// Inicializar la página
cargarProductos();