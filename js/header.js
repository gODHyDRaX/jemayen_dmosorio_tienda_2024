
function cargar_header(){
let header = document.querySelector(".header")
header.innerHTML = `
    <div class="dhr"><div class="img_logo">
        <img src="https://github.com/gODHyDRaX/img_tienda_api/blob/main/Logo%20de%20tienda%20virtual.png?raw=true" alt="">
        </div>
        <div class="cjhe">
            <div>Make</div>
            <div>Features</div>
            <div>Solutions</div>
            <div>Templates</div>    
            <div>Pricing</div>
            <div>🚩</div>
            </div>
            <div class="cjhe2">
                <div class="btnh1">Login</div>
                <div class="btnh2">Sign Up free</div>
            </div>
    </div>
    <div class="categorias"></div>
`
}
export{cargar_header}