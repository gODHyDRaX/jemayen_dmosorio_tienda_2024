import { cargar_productos, obtener_productos } from "./productos.js";

function cargar_categorias() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categorias => {
            imprimir_ctg(categorias);
        });
}

function imprimir_ctg(list_ctg) {
    let categorias = document.querySelector(".categorias");
    list_ctg.forEach((elemento, index) => {
        let div = document.createElement("div");
        div.classList.add("ctg");
        div.id = `ctg-${index}`;
        div.innerHTML = elemento;
        categorias.appendChild(div);

        // Agregar evento de clic a la categoría
        div.addEventListener('click', () => {
            obtener_productos(elemento);
        });
    });
}

async function separar_categorias() {
    try {
        const resCE = await fetch("https://fakestoreapi.com/products/category/electronics");
        const dataCE = await resCE.json();
        console.log(dataCE);

        const resCJ = await fetch('https://fakestoreapi.com/products/category/jewelery');
        const dataCJ = await resCJ.json();
        console.log(dataCJ);

        const resCM = await fetch("https://fakestoreapi.com/products/category/men's%20clothing");
        const dataCM = await resCM.json();
        console.log(dataCM);

        const resCW = await fetch("https://fakestoreapi.com/products/category/women's%20clothing");
        const dataCW = await resCW.json();
        console.log(dataCW);

        // Ahora que tenemos todos los datos de categorías, cargamos todos los productos
        const allProductsRes = await fetch("https://fakestoreapi.com/products");
        const allProductsData = await allProductsRes.json();
        cargar_productos(allProductsData);

    } catch (error) {
        console.log("error al obtener categorias");
    }
}

separar_categorias();

export { cargar_categorias };
