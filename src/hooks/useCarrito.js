import { useEffect, useMemo, useState } from "react";
import { productos } from "../data/productos.js";

export const MAX_UNIDADES = 10;
const CLAVE_CARRITO = "gamegoCarrito";

// Catálogo indexado por id, armado una sola vez a partir de productos.js
const catalogo = new Map(productos.map((p) => [p.id, p]));

function cargarCarrito() {
    try {
        const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || "{}");
        const limpio = {};
        for (const [id, cantidad] of Object.entries(guardado)) {
            const n = Math.floor(Number(cantidad));
            // Se descartan productos que ya no existen o cantidades inválidas
            if (catalogo.has(id) && n > 0) limpio[id] = Math.min(n, MAX_UNIDADES);
        }
        return limpio;
    } catch {
        return {};
    }
}

function guardarCarrito(carrito) {
    try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    } catch {
        // sin almacenamiento disponible: el carrito sigue funcionando, pero no se guarda
    }
}

// Estado del carrito: { idProducto: cantidad }, guardado en localStorage.
export function useCarrito() {
    const [carrito, setCarrito] = useState(cargarCarrito);

    // Cada cambio se guarda
    useEffect(() => {
        guardarCarrito(carrito);
    }, [carrito]);

    // Si el carrito cambia en otra pestaña, esta se actualiza
    useEffect(() => {
        function alCambiarAlmacenamiento(e) {
            if (e.key === CLAVE_CARRITO) setCarrito(cargarCarrito());
        }
        window.addEventListener("storage", alCambiarAlmacenamiento);
        return () => window.removeEventListener("storage", alCambiarAlmacenamiento);
    }, []);

    // Lista lista para mostrar: [{ producto, cantidad }]
    const items = useMemo(
        () => Object.entries(carrito).map(([id, cantidad]) => ({ producto: catalogo.get(id), cantidad })),
        [carrito]
    );
    const unidades = items.reduce((suma, item) => suma + item.cantidad, 0);
    const total = items.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0);

    // Devuelve { agregado, producto } para que quien llama pueda avisar al usuario
    function agregar(id) {
        const producto = catalogo.get(id);
        if (!producto) return { agregado: false, producto: null };
        if ((carrito[id] ?? 0) >= MAX_UNIDADES) return { agregado: false, producto };
        setCarrito((previo) => ({ ...previo, [id]: (previo[id] ?? 0) + 1 }));
        return { agregado: true, producto };
    }

    function cambiarCantidad(id, delta) {
        setCarrito((previo) => {
            const nueva = (previo[id] ?? 0) + delta;
            if (nueva < 1 || nueva > MAX_UNIDADES) return previo;
            return { ...previo, [id]: nueva };
        });
    }

    function quitar(id) {
        setCarrito((previo) => {
            const { [id]: _quitado, ...resto } = previo;
            return resto;
        });
    }

    function vaciar() {
        setCarrito({});
    }

    return { items, unidades, total, agregar, cambiarCantidad, quitar, vaciar };
}
