function cargar_productos(list_pdct) {
    let main = document.querySelector(".main");
    main.innerHTML = ""; // Limpiar contenido existente

    list_pdct.forEach(elemento => {
        let item = document.createElement("div");
        item.classList.add("item");
        let short_text = elemento.title.split(' ').slice(0, 5).join(' ');
        let short_text2 = elemento.title.split(' ').slice(0, 10).join(' ');
        item.innerHTML =
            `
            <div class="caj_img">
                <img src="${elemento.image}" alt="">
            </div>
            <img src="https://github.com/gODHyDRaX/img_tienda_api/blob/main/cart.png?raw=true" alt="" class="crt">
            <h2 class="title">${short_text}</h2>
            <span class="desc_item">${short_text2}</span>
            <h2 class="precio"> $${elemento.price}</h2>
            <h2 class="categoria">${elemento.category}</h2>
        `;
        main.appendChild(item);
    });
}

async function obtener_productos(categoria = "") {
    try {
        let url = 'https://fakestoreapi.com/products';
        if (categoria) {
            url = `https://fakestoreapi.com/products/category/${categoria}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        cargar_productos(data);
    } catch (error) {
        console.log("Error al extraer productos");
    }
}

export { cargar_productos, obtener_productos };
