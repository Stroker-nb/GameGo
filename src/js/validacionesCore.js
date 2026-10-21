// Funciones pequeñas de validación de GameGo.
// Se comparten entre la aplicación y las pruebas unitarias.
var GameGoValidaciones = {
    nombreValido: function (nombre) {
        var valor = String(nombre == null ? "" : nombre).trim();
        return valor.length > 0 && valor.length <= 100;
    },
    correoValido: function (correo) {
        var valor = String(correo == null ? "" : correo).trim();
        if (valor.length === 0 || valor.length > 100) return false;
        return valor.endsWith("@gmail.com") || valor.endsWith("@hotmail.com");
    },
    comentarioValido: function (comentario) {
        var valor = String(comentario == null ? "" : comentario).trim();
        return valor.length > 0 && valor.length <= 500;
    },
    contraseñaValida: function (contraseña) {
        var valor = String(contraseña == null ? "" : contraseña).trim();
        return valor.length >= 7;
    }
};