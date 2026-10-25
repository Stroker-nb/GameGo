// La sesión es solo una marca en localStorage (no hay servidor).
export const CLAVE_SESION = "sesionIniciada";

export function leerSesion() {
    try {
        return localStorage.getItem(CLAVE_SESION) === "true";
    } catch {
        return false;
    }
}

export function iniciarSesion() {
    localStorage.setItem(CLAVE_SESION, "true");
}

export function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
}
