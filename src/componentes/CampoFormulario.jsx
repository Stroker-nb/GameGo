// Un campo de formulario: etiqueta + input (o textarea) + mensaje de error.
// Se usa en el formulario de contacto y en el de inicio de sesión.
export default function CampoFormulario({
    id,
    idError,
    etiqueta,
    tipo = "text",
    valor,
    onChange,
    error,
    placeholder,
    filas
}) {
    const clases = `form-control${error ? " is-invalid" : ""}`;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{etiqueta}</label>
            {tipo === "textarea" ? (
                <textarea
                    id={id}
                    className={clases}
                    rows={filas}
                    placeholder={placeholder}
                    value={valor}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    type={tipo}
                    id={id}
                    className={clases}
                    placeholder={placeholder}
                    value={valor}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
            <small id={idError} className="invalid-feedback">{error}</small>
        </div>
    );
}
