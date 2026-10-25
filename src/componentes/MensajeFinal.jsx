// Resultado del formulario: verde si salió bien, rojo si hay errores.
// El contenedor siempre existe para que los lectores de pantalla anuncien el cambio.
export default function MensajeFinal({ mensaje }) {
    return (
        <div id="mensajeFinal" aria-live="polite" className={mensaje ? `alert alert-${mensaje.tipo} mt-3` : undefined}>
            {mensaje?.texto}
        </div>
    );
}
