import { obtener_productos } from "./productos.js";
import { usuarioId } from "./login.js";

let root = document.querySelector(".main");
let btn_shop = document.querySelector(".btn_shop");

let carrito = cargarCarritoDesdeLocalStorage();  // Cargar el carrito desde localStorage al iniciar

btn_shop.addEventListener("click", async () => {
    if (!usuarioId) {
        alert("Por favor, inicie sesión primero.");
        return;
    }

    const modal = crearModal();
    root.appendChild(modal);

    cargarCrt(carrito);  // Cargar el carrito desde el estado local
});

async function obtener_productos_carrito(cartId) {
    try {
        const cartResponse = await fetch(`https://fakestoreapi.com/carts/${cartId}`);
        const cartData = await cartResponse.json();

        const productIds = cartData.products.map(product => product.productId);

        const productResponse = await fetch('https://fakestoreapi.com/products');
        const productData = await productResponse.json();

        const productsInCart = productData.filter(product => productIds.includes(product.id));

        return productsInCart;
    } catch (error) {
        console.log("Error al obtener los productos del carrito:", error);
        throw error;
    }
}

function cargarCrt(lista_crt) {
    const cj_crt = document.querySelector(".cj_crt");
    cj_crt.innerHTML = "";

    lista_crt.forEach((elemento, index) => {
        const item_crt = document.createElement("div");
        item_crt.classList.add("item_crt");

        const short_text = elemento.title.split(' ').slice(0, 5).join(' ');
        item_crt.innerHTML = `
            <img src="${elemento.image}" alt="" class="img_crt">
            <h1 class="tl">${short_text}</h1>
            <span class="material-symbols-outlined dlt" data-index="${index}">delete_forever</span>
            <div class="itm_cta">
                Cantidad: 1 <span class="material-symbols-outlined">add</span>
            </div>
            <h2 class="pr">$ ${elemento.price}</h2>
        `;

        cj_crt.appendChild(item_crt);
    });

    document.querySelectorAll(".dlt").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute('data-index');
            carrito.splice(index, 1);  // Eliminar del estado global del carrito
            guardarCarritoEnLocalStorage(carrito);  // Guardar el carrito en localStorage
            cargarCrt(carrito);  // Recargar el carrito
        });
    });
}

function crearModal() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="tu_crt">
            Carrito
            <span class="material-symbols-outlined close">close</span>
        </div>
        <div class="cj_crt"></div>
        <div class="cpr">Comprar</div>
    `;

    modal.querySelector('.close').addEventListener("click", () => {
        modal.remove();
    });

    return modal;
}

function guardarCarritoEnLocalStorage(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Si el carrito está vacío, intentamos cargarlo desde la API solo si el usuario está logueado
if (carrito.length === 0 && usuarioId) {
    (async () => {
        try {
            const productsInCart = await obtener_productos_carrito(usuarioId);
            carrito = productsInCart;  // Inicializar el estado global del carrito
            guardarCarritoEnLocalStorage(carrito);  // Guardar el carrito en localStorage
        } catch (error) {
            console.log("Error al obtener los productos del carrito:", error);
        }
    })();
}
