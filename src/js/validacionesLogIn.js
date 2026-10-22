const formulario =
    document.getElementById("formularioLogIn");

formulario.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const inputContraseña =
            document.getElementById("contraseña");
        const inputCorreo =
            document.getElementById("correo");

        const contraseña =
            inputContraseña.value.trim();
        const correo =
            inputCorreo.value.trim();



        const errorContraseña =
            document.getElementById("errorContraseña");
        const errorCorreo =
            document.getElementById("errorCorreo");
        const mensajeFinal =
            document.getElementById("mensajeFinal");

        errorContraseña.textContent = "";
        errorCorreo.textContent = "";
        mensajeFinal.textContent = "";
        mensajeFinal.className = "";

        inputContraseña.classList.remove("is-invalid");
        inputCorreo.classList.remove("is-invalid");

        let formularioValido = true;


        if (contraseña === "") {
            errorContraseña.textContent =
                "La contraseña es obligatoria.";
            inputContraseña.classList.add("is-invalid");
            formularioValido = false;
        } else if (contraseña.length < 7) {

            errorContraseña.textContent =
                "La contraseña debe tener al menos 7 caracteres.";
            inputContraseña.classList.add("is-invalid");
            formularioValido = false;
        }

        if (correo === "") {
            errorCorreo.textContent =
                "El correo es obligatorio.";
            inputCorreo.classList.add("is-invalid");
            formularioValido = false;
        } else if (correo.length > 100) {

            errorCorreo.textContent =
                "El correo no puede superar los 100 caracteres.";
            inputCorreo.classList.add("is-invalid");
            formularioValido = false;
        } else {

            const dominioPermitido1 = 
                correo.endsWith("@gmail.com");
            const dominioPermitido2 = 
                correo.endsWith("@hotmail.com");
            
            if (!dominioPermitido1 && !dominioPermitido2) {
                errorCorreo.textContent =
                    "Utiliza un correo @hotmail.com o @gmail.com.";
                inputCorreo.classList.add("is-invalid");
                formularioValido = false;
            }
        }



        if (formularioValido) {
            mensajeFinal.textContent =
                "¡Bienvenido!";
            mensajeFinal.className = "alert alert-success mt-3";
            formulario.reset();
            localStorage.setItem('sesionIniciada', 'true');
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            mensajeFinal.textContent =
                "Revisa los campos marcados en rojo antes de enviar.";
            mensajeFinal.className = "alert alert-danger mt-3";
        }

        console.log("Formulario procesado. Válido: ", formularioValido);
    }
);