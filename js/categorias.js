function cargar_categorias(){
    
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categorias => {
            imprimir_ctg(categorias)
        })
}
function imprimir_ctg(list_ctg){
    let categorias = document.querySelector(".categorias")
    list_ctg.forEach(elemento => {
        let div = document.createElement("div")
        div.classList.add("ctg")
        div.innerHTML = elemento
        categorias.appendChild(div)
    });
}
export{cargar_categorias}