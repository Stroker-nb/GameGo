import { MAX_UNIDADES } from "../hooks/useCarrito.js";
import { moneda } from "../utils/formato.js";

// Una fila del carrito: imagen, nombre, cantidad con + / − y subtotal.
export default function ItemCarrito({ producto, cantidad, onSumar, onRestar, onQuitar }) {
    return (
        <li className="list-group-item d-flex gap-3 align-items-center bg-transparent">
            <img src={producto.imagen} alt="" className="carrito-img rounded" />

            <div className="flex-grow-1">
                <div className="fw-semibold text-white">{producto.nombre}</div>
                <small>{moneda.format(producto.precio)} c/u</small>
                <div
                    className="btn-group btn-group-sm mt-1 d-flex"
                    role="group"
                    aria-label={`Cantidad de ${producto.nombre}`}
                    style={{ width: "fit-content" }}
                >
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        aria-label={`Quitar una unidad de ${producto.nombre}`}
                        disabled={cantidad <= 1}
                        onClick={onRestar}
                    >
                        −
                    </button>
                    <span className="btn btn-outline-secondary disabled text-white">{cantidad}</span>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        aria-label={`Agregar una unidad de ${producto.nombre}`}
                        disabled={cantidad >= MAX_UNIDADES}
                        onClick={onSumar}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="text-end">
                <div className="fw-bold text-white">{moneda.format(producto.precio * cantidad)}</div>
                <button
                    type="button"
                    className="btn btn-link btn-sm text-danger p-0 mt-1"
                    aria-label={`Quitar ${producto.nombre} del carrito`}
                    onClick={onQuitar}
                >
                    Quitar
                </button>
            </div>
        </li>
    );
}
