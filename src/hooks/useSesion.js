import { useEffect, useState } from "react";
import { CLAVE_SESION, cerrarSesion as borrarSesion, leerSesion } from "../utils/sesion.js";

// Entrega si hay sesión iniciada y una función para cerrarla.
// Si la sesión cambia en otra pestaña, esta también se entera.
export function useSesion() {
    const [sesionIniciada, setSesionIniciada] = useState(leerSesion);

    useEffect(() => {
        function alCambiarAlmacenamiento(e) {
            if (e.key === CLAVE_SESION) setSesionIniciada(leerSesion());
        }
        window.addEventListener("storage", alCambiarAlmacenamiento);
        return () => window.removeEventListener("storage", alCambiarAlmacenamiento);
    }, []);

    function cerrarSesion() {
        borrarSesion();
        setSesionIniciada(false);
    }

    return { sesionIniciada, cerrarSesion };
}
