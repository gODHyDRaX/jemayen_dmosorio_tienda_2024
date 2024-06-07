
import { cargar_header } from "./header.js";
import { cargar_ftr } from "./footer.js";
import { cargar_categorias } from "./categorias.js";

    let root = document.querySelector(".root");
    root.innerHTML = `
        <header class="header"></header>
        <div class="main"></div>
        <footer class="footer"></footer>
    `;

    cargar_header();
    cargar_ftr();
    cargar_categorias();