let root = document.querySelector(".main");
let btn_shop = document.querySelector(".btn_shop");

btn_shop.addEventListener("click", async () => {
    // Crear el modal
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.display = 'block';
    root.appendChild(modal);

    // Agregar contenido al modal
    modal.innerHTML = `
        <div class="tu_crt">
            Carrito
            <span class="material-symbols-outlined close">close</span>
        </div>
        <div class="cj_crt"></div>
        <div class="cpr">Comprar</div>
    `;

    // Evento para cerrar el modal
    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
    });

    // Obtener y cargar productos en el carrito
    await obtener_productos_carrito(2);
});

async function obtener_productos_carrito(cartId) {
    try {
        // Obtener los datos del carrito
        const cartResponse = await fetch(`https://fakestoreapi.com/carts/${cartId}`);
        const cartData = await cartResponse.json();

        // Obtener los IDs de los productos en el carrito
        const productIds = cartData.products.map(product => product.productId);

        // Obtener los detalles de los productos en el carrito
        const productResponse = await fetch('https://fakestoreapi.com/products');
        const productData = await productResponse.json();

        // Filtrar los productos que están en el carrito
        const productsInCart = productData.filter(product => productIds.includes(product.id));

        // Cargar productos en el carrito
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
