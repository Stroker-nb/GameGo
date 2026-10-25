import { useState } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import BarraNavegacion from "./componentes/BarraNavegacion.jsx";
import Cabecera from "./componentes/Cabecera.jsx";
import PanelCarrito from "./componentes/PanelCarrito.jsx";
import PieDePagina from "./componentes/PieDePagina.jsx";
import SeccionContacto from "./componentes/SeccionContacto.jsx";
import SeccionProductos from "./componentes/SeccionProductos.jsx";
import SeccionSugerencias from "./componentes/SeccionSugerencias.jsx";
import ToastAviso from "./componentes/ToastAviso.jsx";
import { productos } from "./data/productos.js";
import { MAX_UNIDADES, useCarrito } from "./hooks/useCarrito.js";
import { useSesion } from "./hooks/useSesion.js";
import { moneda } from "./utils/formato.js";

// Página principal (index.html). Aquí vive el estado que comparten varios componentes.
export default function App() {
    const carrito = useCarrito();
    const { sesionIniciada, cerrarSesion } = useSesion();

    const [panelAbierto, setPanelAbierto] = useState(false);
    const [aviso, setAviso] = useState(null); // mensaje dentro del panel del carrito
    // Los dos toasts existen siempre (ocultos hasta que se necesitan), igual que en el HTML original
    const [toastCarrito, setToastCarrito] = useState({ id: 0, texto: "", tipo: "success", visible: false });
    const [toastSesion, setToastSesion] = useState({ id: 0, visible: false });

    // Cambiar el id hace que el toast reinicie su temporizador si se muestra otra vez
    function mostrarToastCarrito(texto, tipo) {
        setToastCarrito({ id: Date.now(), texto, tipo, visible: true });
    }

    function agregarProducto(id) {
        setAviso(null);
        const { agregado, producto } = carrito.agregar(id);
        if (!producto) return;
        if (agregado) {
            mostrarToastCarrito(`${producto.nombre} se agregó al carrito.`, "success");
        } else {
            mostrarToastCarrito(`Máximo ${MAX_UNIDADES} unidades de ${producto.nombre}.`, "warning");
        }
    }

    function vaciarCarrito() {
        carrito.vaciar();
        setAviso(null);
    }

    function finalizarCompra() {
        if (carrito.unidades === 0) return;

        // Solo se puede comprar con sesión iniciada
        if (!sesionIniciada) {
            setAviso({
                tipo: "warning",
                texto: "Inicia sesión para finalizar tu compra. ",
                enlace: { texto: "Ir a iniciar sesión", href: "logIn.html" }
            });
            return;
        }

        const total = carrito.total;
        vaciarCarrito();
        setAviso({ tipo: "success", texto: `¡Gracias por tu compra! Total pagado: ${moneda.format(total)}.` });
    }

    function cerrarSesionConAviso() {
        cerrarSesion();
        setToastSesion({ id: Date.now(), visible: true });
    }

    return (
        <>
            <Cabecera id="inicio" />

            <BarraNavegacion
                unidades={carrito.unidades}
                onAbrirCarrito={() => setPanelAbierto(true)}
                sesionIniciada={sesionIniciada}
                onCerrarSesion={cerrarSesionConAviso}
            />

            <main className="container py-4">
                <SeccionProductos
                    id="productos"
                    titulo="Productos Destacados"
                    productos={productos.filter((p) => p.seccion === "destacados")}
                    onAgregar={agregarProducto}
                />
                <SeccionProductos
                    id="otros-productos"
                    titulo="Otros productos"
                    productos={productos.filter((p) => p.seccion === "otros")}
                    onAgregar={agregarProducto}
                />
                <SeccionSugerencias />
                <SeccionContacto />
            </main>

            <PieDePagina />

            <PanelCarrito
                show={panelAbierto}
                onHide={() => setPanelAbierto(false)}
                items={carrito.items}
                total={carrito.total}
                aviso={aviso}
                onSumar={(id) => carrito.cambiarCantidad(id, 1)}
                onRestar={(id) => carrito.cambiarCantidad(id, -1)}
                onQuitar={carrito.quitar}
                onFinalizar={finalizarCompra}
                onVaciar={vaciarCarrito}
            />

            <ToastContainer position="bottom-start" containerPosition="fixed" className="p-3">
                <ToastAviso
                    key={`carrito-${toastCarrito.id}`}
                    show={toastCarrito.visible}
                    texto={toastCarrito.texto}
                    tipo={toastCarrito.tipo}
                    delay={2200}
                    onClose={() => setToastCarrito((t) => ({ ...t, visible: false }))}
                />
                <ToastAviso
                    key={`sesion-${toastSesion.id}`}
                    show={toastSesion.visible}
                    texto="Cerraste sesión correctamente."
                    tipo="secondary"
                    delay={2500}
                    onClose={() => setToastSesion((t) => ({ ...t, visible: false }))}
                />
            </ToastContainer>
        </>
    );
}
