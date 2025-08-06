const btnMostrarCarrito = document.getElementById('mostrar-carrito');
const btnClose = document.getElementById('btn-close');
const divCarritoCompras = document.getElementById('carrito-compras');
const btnsAgregar = document.querySelectorAll('.agregar');

btnMostrarCarrito.addEventListener('click', () => {
    divCarritoCompras.classList.toggle('d-none');
})

btnClose.addEventListener('click', () => {
    divCarritoCompras.classList.toggle('d-none');
})

let productos = [
    {
        id: 1,
        nombre: "Proteína vegetal",
        precio: 100000,
        imagen: "../img/productos/1.webp",
        'cantidad-disponible': 0
    },
    {
        id: 2,
        nombre: "Pre-workou",
        precio: 72000,
        imagen: "../img/productos/2.webp",
        'cantidad-disponible': 15
    },
    {
        id: 3,
        nombre: "BCAA",
        precio: 94000,
        imagen: "../img/productos/3.webp",
        'cantidad-disponible': 12
    },
    {
        id: 4,
        nombre: "Whey protein",
        precio: 130000,
        imagen: "../img/productos/4.webp",
        'cantidad-disponible': 40
    },
    {
        id: 5,
        nombre: "Creatinina",
        precio: 82000,
        imagen: "../img/productos/5.webp",
        'cantidad-disponible': 20
    },
    {
        id: 6,
        nombre: "Fat burner",
        precio: 73400,
        imagen: "../img/productos/6.webp",
        'cantidad-disponible': 7
    },
    {
        id: 7,
        nombre: "Amino",
        precio: 68000,
        imagen: "../img/productos/7.webp",
        'cantidad-disponible': 10
    },
    {
        id: 8,
        nombre: "Mass gainer",
        precio: 89000,
        imagen: "../img/productos/8.webp",
        'cantidad-disponible': 11
    },
    {
        id: 9,
        nombre: "Eflostefone",
        precio: 143000,
        imagen: "../img/productos/9.webp",
        'cantidad-disponible': 8
    },
    {
        id: 10,
        nombre: "Creatinina monohidrato",
        precio: 76700,
        imagen: "../img/productos/10.webp",
        'cantidad-disponible': 12
    },
];


let productos_carrito = JSON.parse(localStorage.getItem('productos')) || [];
const btnsMasProducto = document.get

btnsAgregar.forEach(btn => {
    btn.addEventListener('click', () => {
        const idProducto = parseInt(btn.getAttribute('product-id'));

        // Buscar el producto en el array de productos
        const productoSeleccionado = productos.find(p => p.id === idProducto);
        if (!productoSeleccionado) return;

        // Verificar si ya está en el carrito
        const indexProductoEnCarrito = productos_carrito.findIndex(p => p.id === idProducto);

        if (indexProductoEnCarrito !== -1) {
            // Ya existe en el carrito, aumentar cantidad
            productos_carrito[indexProductoEnCarrito].cantidad += 1;
        } else {
            // No está en el carrito, agregarlo
            if (productos[idProducto - 1]['cantidad-disponible'] > 0) {
                productos_carrito.push({
                    id: productoSeleccionado.id,
                    nombre: productoSeleccionado.nombre,
                    precio: productoSeleccionado.precio,
                    cantidad: 1
                });
                productos[idProducto - 1]['cantidad-disponible'] -= 1;
            }
            else {
                console.log('se termino');
                return;
            }
        }

        // Guardar en localStorage y mostrar carrito
        localStorage.setItem('productos', JSON.stringify(productos_carrito));
        productosEnCarrito();
    });
});

function productosEnCarrito() {
    const contenedor = document.getElementById('productos-carrito');
    contenedor.innerHTML = '';

    if (productos_carrito.length > 0) {
        productos_carrito.forEach(p => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
            <td>${p.nombre}</td>
            <td>$${p.precio}</td>
            <td>
                <span><i class="bi bi-plus-circle mas-producto"></i></span>
                <span>${p.cantidad}</span>
                <span><i class="bi bi-dash-circle menos-producto"></i></span>
            <td>$${(p.precio * p.cantidad).toFixed(2)}</td>
            <td><i class="bi bi-trash3-fill quitar-producto"></i></td>
        `;
            contenedor.appendChild(fila);
        });
    }
    else {
        const textoCarroVacio = document.createElement('p');
        textoCarroVacio.textContent = 'No hay productos en el carrito';
        divCarritoCompras.appendChild(textoCarroVacio);
    }
}