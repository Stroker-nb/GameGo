import Offcanvas from "react-bootstrap/Offcanvas";
import ItemCarrito from "./ItemCarrito.jsx";
import { moneda } from "../utils/formato.js";

// Panel lateral con el carrito. No guarda estado propio: todo llega por props.
export default function PanelCarrito({
    show,
    onHide,
    items,
    total,
    aviso,
    onSumar,
    onRestar,
    onQuitar,
    onFinalizar,
    onVaciar
}) {
    const vacio = items.length === 0;

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" id="carritoPanel" aria-labelledby="carritoTitulo">
            <Offcanvas.Header closeButton closeLabel="Cerrar" className="border-bottom">
                <Offcanvas.Title as="h2" id="carritoTitulo" className="h5 text-white">Tu carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column p-0">
                <div id="carritoAviso" className="px-3 pt-3" aria-live="polite">
                    {aviso && (
                        <div className={`alert alert-${aviso.tipo} mb-0`} role="alert">
                            {aviso.texto}
                            {aviso.enlace && (
                                <a href={aviso.enlace.href} className="alert-link">{aviso.enlace.texto}</a>
                            )}
                        </div>
                    )}
                </div>

                {vacio && <p id="carritoVacio" className="text-center my-5 px-3">Tu carrito está vacío.</p>}

                <ul id="carritoItems" className="list-group list-group-flush flex-grow-1 overflow-auto">
                    {items.map(({ producto, cantidad }) => (
                        <ItemCarrito
                            key={producto.id}
                            producto={producto}
                            cantidad={cantidad}
                            onSumar={() => onSumar(producto.id)}
                            onRestar={() => onRestar(producto.id)}
                            onQuitar={() => onQuitar(producto.id)}
                        />
                    ))}
                </ul>

                <div className="border-top p-3">
                    <div className="d-flex justify-content-between fs-5 mb-3">
                        <span className="text-white">Total</span>
                        <strong id="carritoTotal" className="text-white">{moneda.format(total)}</strong>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="button" id="btnFinalizar" className="btn btn-gamego" disabled={vacio} onClick={onFinalizar}>
                            Finalizar compra
                        </button>
                        <button type="button" id="btnVaciar" className="btn btn-outline-secondary btn-sm" disabled={vacio} onClick={onVaciar}>
                            Vaciar carrito
                        </button>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
