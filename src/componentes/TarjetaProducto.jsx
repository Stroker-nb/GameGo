// Una tarjeta de producto. Recibe los datos como props.
export default function TarjetaProducto({ id, nombre, precio, imagen, trailer, onAgregar }) {
    return (
        <div className="col">
            <article className="card producto h-100 text-center">
                <img src={imagen} className="card-img-top producto-img" alt={nombre} loading="lazy" />
                <div className="card-body d-flex flex-column">
                    <h3 className="card-title h5 text-white">{nombre}</h3>
                    <a className="linkTrailer mb-3" href={trailer} target="_blank" rel="noopener">Ver Trailer</a>
                    <p className="precio mt-auto mb-3">Precio: ${precio.toLocaleString("es-CL")}</p>
                    <button type="button" className="btn btn-gamego" onClick={() => onAgregar(id)}>
                        Agregar al carrito
                    </button>
                </div>
            </article>
        </div>
    );
}
