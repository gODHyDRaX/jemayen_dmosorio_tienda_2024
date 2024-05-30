import { usuarioId } from "./login.js";
let root = document.querySelector(".main");
let btn_shop = document.querySelector(".btn_shop");

btn_shop.addEventListener("click", async () => {

    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.display = 'block';
    root.appendChild(modal);

    modal.innerHTML = `
        <div class="tu_crt">
            Carrito
            <span class="material-symbols-outlined close">close</span>
        </div>
        <div class="cj_crt"></div>
        <div class="cpr">Comprar</div>
    `;

    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
    });

    await obtener_productos_carrito(usuarioId);
});

async function obtener_productos_carrito(cartId) {
    try {
        const cartResponse = await fetch(`https://fakestoreapi.com/carts/${cartId}`);
        const cartData = await cartResponse.json();

        const productIds = cartData.products.map(product => product.productId);

        const productResponse = await fetch('https://fakestoreapi.com/products');
        const productData = await productResponse.json();

        const productsInCart = productData.filter(product => productIds.includes(product.id));

        cargarCrt(productsInCart);
    } catch (error) {
        console.log("Error al obtener los productos del carrito:", error);
    }
}

function cargarCrt(lista_crt) {
    let cj_crt = document.querySelector(".cj_crt");

    lista_crt.forEach(elemento => {
        let item_crt = document.createElement("div");
        item_crt.classList.add("item_crt");

        let short_text = elemento.title.split(' ').slice(0, 5).join(' ');
        item_crt.innerHTML = `
            <img src="${elemento.image}" alt="" class="img_crt">
            <h1 class="tl">${short_text}</h1>
            <span class="material-symbols-outlined">delete_forever</span>
            <div class="itm_cta">
                Cantidad: 1 <span class="material-symbols-outlined">add</span>
            </div>
            <h2 class="pr">$ ${elemento.price}</h2>
        `;

        cj_crt.appendChild(item_crt);
    });
}