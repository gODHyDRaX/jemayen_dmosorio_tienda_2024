async function obtener_productos(){

    try{

            
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    cargar_productos(data)

    }
    catch(error){
        console.log("Error al extraer productos");
    }

}
function cargar_productos(list_pdct){
let main = document.querySelector(".main")
list_pdct.forEach(elemento => {
    let item = document.createElement("div")
    item.classList.add("item")
    item.innerHTML = 
    `
        
    `

    
});

}
