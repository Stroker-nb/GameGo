// Reglas de validación de GameGo.
// Las usan los formularios de React y también las pruebas unitarias (Karma),
// así que hay un solo lugar donde cambiar una regla.

const limpiar = (valor) => String(valor == null ? "" : valor).trim();

// --- Cada función devuelve el mensaje de error, o "" si el valor es válido ---

export function errorNombre(nombre) {
    const valor = limpiar(nombre);
    if (valor === "") return "El nombre es obligatorio.";
    if (valor.length > 100) return "El nombre no puede superar los 100 caracteres.";
    return "";
}

export function errorCorreo(correo) {
    const valor = limpiar(correo);
    if (valor === "") return "El correo es obligatorio.";
    if (valor.length > 100) return "El correo no puede superar los 100 caracteres.";
    if (!valor.endsWith("@gmail.com") && !valor.endsWith("@hotmail.com")) {
        return "Utiliza un correo @hotmail.com o @gmail.com.";
    }
    return "";
}

export function errorComentario(comentario) {
    const valor = limpiar(comentario);
    if (valor === "") return "El comentario es obligatorio.";
    if (valor.length > 500) return "El comentario no puede superar los 500 caracteres.";
    return "";
}

export function errorContraseña(contraseña) {
    const valor = limpiar(contraseña);
    if (valor === "") return "La contraseña es obligatoria.";
    if (valor.length < 7) return "La contraseña debe tener al menos 7 caracteres.";
    return "";
}

// --- Misma interfaz de siempre (true / false), usada por las pruebas ---

export const GameGoValidaciones = {
    nombreValido: (nombre) => errorNombre(nombre) === "",
    correoValido: (correo) => errorCorreo(correo) === "",
    comentarioValido: (comentario) => errorComentario(comentario) === "",
    contraseñaValida: (contraseña) => errorContraseña(contraseña) === ""
};
