describe("Validaciones de GameGo", function () {
    describe("nombreValido", function () {
        it("debe aceptar un nombre ingresado", function () {
            expect(GameGoValidaciones.nombreValido("Javiera")).toBe(true);
        });
        it("debe rechazar un nombre vacío", function () {
            expect(GameGoValidaciones.nombreValido("   ")).toBe(false);
        });
        it("debe rechazar nombres de más de 100 caracteres", function () {
            expect(GameGoValidaciones.nombreValido("a".repeat(101))).toBe(false);
        });
    });
    describe("correoValido", function () {
        it("debe aceptar correos Gmail", function () {
            expect(GameGoValidaciones.correoValido("usuario@gmail.com")).toBe(true);
        });
        it("debe aceptar correos Hotmail", function () {
            expect(GameGoValidaciones.correoValido("usuario@hotmail.com")).toBe(true);
        });
        it("debe rechazar dominios no permitidos", function () {
            expect(GameGoValidaciones.correoValido("usuario@outlook.com")).toBe(false);
        });
        it("debe rechazar un correo vacío", function () {
            expect(GameGoValidaciones.correoValido("")).toBe(false);
        });
    });
    describe("comentarioValido", function () {
        it("debe aceptar un comentario con texto", function () {
            expect(GameGoValidaciones.comentarioValido("Me gusta GameGo")).toBe(true);
        });
        it("debe rechazar un comentario vacío", function () {
            expect(GameGoValidaciones.comentarioValido(" ")).toBe(false);
        });
        it("debe rechazar comentarios de más de 500 caracteres", function () {
            expect(GameGoValidaciones.comentarioValido("a".repeat(501))).toBe(false);
        });
    });
    describe("contraseñaValida", function () {
        it("debe aceptar contraseñas de 7 caracteres o más", function () {
            expect(GameGoValidaciones.contraseñaValida("abc1234")).toBe(true);
        });
        it("debe rechazar contraseñas de menos de 7 caracteres", function () {
            expect(GameGoValidaciones.contraseñaValida("abc12")).toBe(false);
        });
    });
});