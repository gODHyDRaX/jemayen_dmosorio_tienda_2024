let usuariosData = [];
let usuarioId = null;  // Inicialmente null, cambiará al ID del usuario autenticado

async function obtenerUsuarios() {
    try {
        const usuariosRes = await fetch('https://fakestoreapi.com/users');
        usuariosData = await usuariosRes.json();
        console.log("Usuarios obtenidos:", usuariosData); // Imprime los datos de los usuarios
    } catch (error) {
        console.log("Error al obtener los usuarios", error);
    }
}

let root = document.querySelector(".root");
let btnh1 = document.querySelector(".btnh1");

// Función para manejar el clic del botón de login
btnh1.addEventListener("click", () => {
    mostrarModalLogin();
});

function mostrarModalLogin() {
    let modal_login = document.createElement("div");
    modal_login.classList.add("modal_login");
    modal_login.style.display = 'block';

    modal_login.innerHTML = `
        <div class="dvcl">
            <h1>Login</h1>
            <span class="material-symbols-outlined cls_lgn">close</span>
        </div>
        <div class="cj_lgn">
            <h3 class="usrs">Username</h3>
            <input type="text" class="usrT" placeholder="Enter your Username">
            <h3 class="pass">Password</h3>
            <input type="password" class="passT" placeholder="Enter your Password">
            <span class="spnL">Forgot Password?</span>
        </div>
        <div class="btnLgn">Login</div>
    `;

    root.appendChild(modal_login);

    modal_login.querySelector(".cls_lgn").addEventListener("click", () => {
        modal_login.remove();
    });

    comparar_info();
}

function comparar_info() {
    let btnLgn = document.querySelector(".btnLgn");
    btnLgn.addEventListener("click", () => {
        let usrTs = document.querySelector(".usrT");
        let usuario = usrTs.value;
        console.log("Username: ", usuario);

        let passTs = document.querySelector(".passT");
        let contra = passTs.value;
        console.log("Password: ", contra);

        // Comparar los datos ingresados con los datos obtenidos de la API
        if (usuariosData.length > 0) {
            let usuarioEncontrado = usuariosData.find(user => user.username === usuario && user.password === contra);
            if (usuarioEncontrado) {
                console.log("Login exitoso");

                // Guardar información del usuario en localStorage
                localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));

                actualizarEstadoUsuario(usuarioEncontrado);
            } else {
                console.log("Credenciales incorrectas");
            }
        } else {
            console.log("Datos de los usuarios no disponibles");
        }
    });
}

function actualizarEstadoUsuario(usuarioEncontrado) {
    let btnh1 = document.querySelector(".btnh1");
    let btnh2 = document.querySelector(".btnh2");
    let cjhe2 = document.querySelector(".cjhe2");
    let btnLgn = document.querySelector(".btnLgn");

    if (btnLgn) btnLgn.remove();
    if (btnh1) btnh1.remove();

    cjhe2.innerHTML = `
        <img src="https://github.com/gODHyDRaX/img_tienda_api/blob/main/account.png?raw=true" alt="">
        <span>${usuarioEncontrado.username}</span>
    `;

    let modal_login = document.querySelector(".modal_login");
    if (modal_login) {
        modal_login.remove(); // Cerrar el modal de login
    }

    usuarioId = usuarioEncontrado.id; // Actualizar el ID del usuario autenticado
}

function verificarSesion() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        actualizarEstadoUsuario(usuario);
    }
}

// Llamar a la función para obtener los usuarios al cargar el script
obtenerUsuarios();

// Verificar si hay una sesión guardada al cargar la página
verificarSesion();

export { usuarioId };
