import Toast from "react-bootstrap/Toast";

// Aviso emergente abajo a la izquierda. Se usa para el carrito y para cerrar sesión.
export default function ToastAviso({ show, texto, tipo, delay, onClose }) {
    return (
        <Toast
            show={show}
            onClose={onClose}
            autohide
            delay={delay}
            className={`align-items-center border-0 text-bg-${tipo}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
        >
            <div className="d-flex">
                <Toast.Body>{texto}</Toast.Body>
                <button type="button" className="btn-close me-2 m-auto" aria-label="Cerrar" onClick={onClose} />
            </div>
        </Toast>
    );
}
