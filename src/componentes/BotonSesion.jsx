// Muestra "Cerrar sesión" si hay sesión iniciada, o "Iniciar sesión" si no.
export default function BotonSesion({ sesionIniciada, onCerrarSesion }) {
    if (sesionIniciada) {
        return (
            <button id="btn-logout" type="button" className="btn btn-outline-light btn-sm" onClick={onCerrarSesion}>
                Cerrar sesión
            </button>
        );
    }

    return (
        <button
            id="btn-login"
            type="button"
            className="btn btn-outline-light btn-sm"
            onClick={() => {
                window.location.href = "logIn.html";
            }}
        >
            Iniciar sesión
        </button>
    );
}
