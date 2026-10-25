import Cabecera from "./componentes/Cabecera.jsx";
import FormularioLogIn from "./componentes/FormularioLogIn.jsx";
import PieDePagina from "./componentes/PieDePagina.jsx";

// Página logIn.html
export default function PaginaLogIn() {
    return (
        <>
            <Cabecera />
            <main className="container py-5 flex-grow-1">
                <section id="logIn" className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-5">
                        <h2 className="tituloSeccion">Iniciar sesión</h2>
                        <FormularioLogIn />
                    </div>
                </section>
            </main>
            <PieDePagina />
        </>
    );
}
