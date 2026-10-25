import { useEffect, useRef, useState } from "react";
import CampoFormulario from "./CampoFormulario.jsx";
import MensajeFinal from "./MensajeFinal.jsx";
import { errorContraseña, errorCorreo } from "../utils/validacionesCore.js";
import { iniciarSesion } from "../utils/sesion.js";

const VACIO = { correo: "", contraseña: "" };

export default function FormularioLogIn() {
    const [valores, setValores] = useState(VACIO);
    const [errores, setErrores] = useState(VACIO);
    const [mensaje, setMensaje] = useState(null);
    const redireccion = useRef(null);

    // Si el componente se desmonta antes de los 2 segundos, se cancela la redirección
    useEffect(() => () => clearTimeout(redireccion.current), []);

    const cambiar = (campo) => (valor) => setValores((previo) => ({ ...previo, [campo]: valor }));

    function enviar(e) {
        e.preventDefault();

        const nuevosErrores = {
            correo: errorCorreo(valores.correo),
            contraseña: errorContraseña(valores.contraseña)
        };
        const formularioValido = Object.values(nuevosErrores).every((error) => error === "");

        setErrores(nuevosErrores);
        if (formularioValido) {
            setMensaje({ tipo: "success", texto: "¡Bienvenido!" });
            setValores(VACIO);
            iniciarSesion();
            redireccion.current = setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            setMensaje({ tipo: "danger", texto: "Revisa los campos marcados en rojo antes de enviar." });
        }

        console.log("Formulario procesado. Válido: ", formularioValido);
    }

    return (
        <form id="formularioLogIn" className="card card-body p-4" noValidate onSubmit={enviar}>
            <CampoFormulario
                id="correo"
                idError="errorCorreo"
                etiqueta="Correo"
                placeholder="Ej: correo@gmail.com"
                valor={valores.correo}
                onChange={cambiar("correo")}
                error={errores.correo}
            />
            <CampoFormulario
                id="contraseña"
                idError="errorContraseña"
                etiqueta="Contraseña"
                tipo="password"
                placeholder="Ingrese su contraseña"
                valor={valores.contraseña}
                onChange={cambiar("contraseña")}
                error={errores.contraseña}
            />
            <button type="submit" className="btn btn-gamego">Iniciar sesión</button>

            <MensajeFinal mensaje={mensaje} />
        </form>
    );
}
