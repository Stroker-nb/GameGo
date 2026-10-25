// Dinero en pesos chilenos, por ejemplo: $12.000
export const moneda = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
});
