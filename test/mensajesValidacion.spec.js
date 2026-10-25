import { errorComentario, errorContraseña, errorCorreo, errorNombre } from "../src/utils/validacionesCore.js";

// Los formularios muestran estos textos tal cual, así que se prueban también.
describe("Mensajes de error de los formularios", function () {
    it("nombre: vacío y demasiado largo", function () {
        expect(errorNombre("  ")).toBe("El nombre es obligatorio.");
        expect(errorNombre("a".repeat(101))).toBe("El nombre no puede superar los 100 caracteres.");
        expect(errorNombre("Javiera")).toBe("");
    });
    it("correo: vacío, demasiado largo y dominio no permitido", function () {
        expect(errorCorreo("")).toBe("El correo es obligatorio.");
        expect(errorCorreo("a".repeat(101) + "@gmail.com")).toBe("El correo no puede superar los 100 caracteres.");
        expect(errorCorreo("usuario@outlook.com")).toBe("Utiliza un correo @hotmail.com o @gmail.com.");
        expect(errorCorreo("usuario@hotmail.com")).toBe("");
    });
    it("comentario: vacío y demasiado largo", function () {
        expect(errorComentario(" ")).toBe("El comentario es obligatorio.");
        expect(errorComentario("a".repeat(501))).toBe("El comentario no puede superar los 500 caracteres.");
        expect(errorComentario("Me gusta GameGo")).toBe("");
    });
    it("contraseña: vacía y demasiado corta", function () {
        expect(errorContraseña("")).toBe("La contraseña es obligatoria.");
        expect(errorContraseña("abc12")).toBe("La contraseña debe tener al menos 7 caracteres.");
        expect(errorContraseña("abc1234")).toBe("");
    });
});
