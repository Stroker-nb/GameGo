import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import BotonSesion from "./BotonSesion.jsx";

export default function BarraNavegacion({ unidades, onAbrirCarrito, sesionIniciada, onCerrarSesion }) {
    return (
        <Navbar expand="md" sticky="top" className="menu" data-bs-theme="dark">
            <div className="container">
                <Navbar.Brand href="#inicio" className="fw-bold">GameGo</Navbar.Brand>
                <Navbar.Toggle aria-controls="menuPrincipal" aria-label="Mostrar menú" />
                <Navbar.Collapse id="menuPrincipal">
                    <Nav as="ul" className="mx-auto">
                        <Nav.Item as="li"><Nav.Link href="#inicio">Inicio</Nav.Link></Nav.Item>
                        <Nav.Item as="li"><Nav.Link href="#productos">Productos</Nav.Link></Nav.Item>
                        <Nav.Item as="li"><Nav.Link href="#sugerencias">Sugerencias</Nav.Link></Nav.Item>
                        <Nav.Item as="li"><Nav.Link href="#contacto">Contacto</Nav.Link></Nav.Item>
                    </Nav>
                    <div className="d-flex align-items-center gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-light btn-sm position-relative"
                            onClick={onAbrirCarrito}
                            aria-label="Abrir carrito"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                            {unidades > 0 && (
                                <span
                                    id="carritoContador"
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark"
                                >
                                    {unidades}
                                </span>
                            )}
                        </button>
                        <div className="d-flex">
                            <BotonSesion sesionIniciada={sesionIniciada} onCerrarSesion={onCerrarSesion} />
                        </div>
                    </div>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}
