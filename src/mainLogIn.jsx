import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/estilos.css";
import PaginaLogIn from "./PaginaLogIn.jsx";

// Punto de entrada de logIn.html
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <PaginaLogIn />
    </StrictMode>
);
