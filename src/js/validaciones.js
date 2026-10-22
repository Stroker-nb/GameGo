document.addEventListener('DOMContentLoaded', () => {
    const contenedorAuth = document.getElementById('contenedor-auth');

    // Función que evalúa la sesión y pinta el botón correcto
    function actualizarBotonSesion() {
        const sesionIniciada = localStorage.getItem('sesionIniciada') === 'true';

        if (sesionIniciada) {
            // Usuario logueado: Mostrar "Cerrar sesión"
            contenedorAuth.innerHTML = '<button id="btn-logout" class="btn-header">Cerrar sesión</button>';
            
            // Evento para cerrar sesión
            document.getElementById('btn-logout').addEventListener('click', () => {
                localStorage.removeItem('sesionIniciada'); // Borra la persistencia
                actualizarBotonSesion(); // Vuelve a evaluar y cambia el botón al instante
            });
        } else {
            // Usuario visitante: Mostrar "Iniciar sesión"
            contenedorAuth.innerHTML = '<button id="btn-login" class="btn-header">Iniciar sesión</button>';
            
            // Evento para ir al login
            document.getElementById('btn-login').addEventListener('click', () => {
                window.location.href = 'logIn.html';
            });
        }
    }

    // Inicializar el estado del botón al cargar la página
    if (contenedorAuth) {
        actualizarBotonSesion();
    }
});

const formulario =
    document.getElementById("formularioContacto");

formulario.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        // obtiene los elementos del formulario
        const inputNombre =
            document.getElementById("nombre");
        const inputCorreo =
            document.getElementById("correo");
        const inputComentario =
            document.getElementById("comentario");

        // obtiene lo escrito dentro de los textos
        const nombre =
            inputNombre.value.trim();
        const correo =
            inputCorreo.value.trim();
        const comentario =
            inputComentario.value.trim();

        // controlar errores
        const errorNombre =
            document.getElementById("errorNombre");
        const errorCorreo =
            document.getElementById("errorCorreo");
        const errorComentario =
            document.getElementById("errorComentario");
        const mensajeFinal =
            document.getElementById("mensajeFinal");

        // quitar errores anteriores
        errorNombre.textContent = "";
        errorCorreo.textContent = "";
        errorComentario.textContent = "";
        mensajeFinal.textContent = "";
        mensajeFinal.className = "";

        // quitar marcas visuales
        inputNombre.classList.remove("input-error");
        inputCorreo.classList.remove("input-error");
        inputComentario.classList.remove("input-error");

        let formularioValido = true;

        // REGLA 1 — Nombre obligatorio
        if (nombre === "") {
            errorNombre.textContent =
                "El nombre es obligatorio.";
            inputNombre.classList.add("input-error");
            formularioValido = false;
        } else if (nombre.length > 100) {
            // REGLA 2 — Nombre máximo 100 caracteres
            errorNombre.textContent =
                "El nombre no puede superar los 100 caracteres.";
            inputNombre.classList.add("input-error");
            formularioValido = false;
        }

        // REGLA 3 — Correo obligatorio
        if (correo === "") {
            errorCorreo.textContent =
                "El correo es obligatorio.";
            inputCorreo.classList.add("input-error");
            formularioValido = false;
        } else if (correo.length > 100) {
            // REGLA 4 — Correo máximo 100 caracteres
            errorCorreo.textContent =
                "El correo no puede superar los 100 caracteres.";
            inputCorreo.classList.add("input-error");
            formularioValido = false;
        } else {
            // REGLA 5 — Dominios de correo permitidos
            const dominioPermitido1 =
                correo.endsWith("@gmail.com");
             const dominioPermitido2 =
                correo.endsWith("@hotmail.com");

            if (!dominioPermitido1 , !dominioPermitido2) {
                errorCorreo.textContent =
                    "Utiliza un correo @hotmail.com o @gmail.com.";
                inputCorreo.classList.add("input-error");
                formularioValido = false;
            }
        }

        // REGLA 6 — Comentario obligatorio
        if (comentario === "") {
            errorComentario.textContent =
                "El comentario es obligatorio.";
            inputComentario.classList.add("input-error");
            formularioValido = false;
        } else if (comentario.length > 500) {
            // REGLA 7 — Comentario máximo 500 caracteres
            errorComentario.textContent =
                "El comentario no puede superar los 500 caracteres.";
            inputComentario.classList.add("input-error");
            formularioValido = false;
        }

        // Resultado final
        if (formularioValido) {
            mensajeFinal.textContent =
                "¡Mensaje enviado correctamente! Te contactaremos pronto.";
            mensajeFinal.className = "exito";
            formulario.reset();
        } else {
            mensajeFinal.textContent =
                "Revisa los campos marcados en rojo antes de enviar.";
            mensajeFinal.className = "error-general";
        }

        console.log("Formulario procesado. Válido: ", formularioValido);
    }
);