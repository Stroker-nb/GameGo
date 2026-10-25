// Franja roja con el nombre del sitio. El id solo se usa en la página principal (ancla "Inicio").
export default function Cabecera({ id }) {
    return (
        <header id={id} className="cabecera text-center">
            <div className="container">
                <h1>GameGo</h1>
                <p className="mb-0">Juegos, Juegos y más Juegos</p>
            </div>
        </header>
    );
}
