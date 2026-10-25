import TarjetaProducto from "./TarjetaProducto.jsx";

// Un título y una grilla de tarjetas. Se usa dos veces: destacados y otros.
export default function SeccionProductos({ id, titulo, productos, onAgregar }) {
    return (
        <section id={id} className="mb-5">
            <h2 className="tituloSeccion"><strong>{titulo}</strong></h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 justify-content-center">
                {productos.map((producto) => (
                    <TarjetaProducto key={producto.id} {...producto} onAgregar={onAgregar} />
                ))}
            </div>
        </section>
    );
}
