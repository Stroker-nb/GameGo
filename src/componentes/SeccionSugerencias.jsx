import FormularioContacto from "./FormularioContacto.jsx";

export default function SeccionSugerencias() {
    return (
        <section id="sugerencias" className="mb-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-7">
                    <h2 className="tituloSeccion">Envíanos tu comentario o sugerencia</h2>
                    <FormularioContacto />
                </div>
            </div>
        </section>
    );
}
