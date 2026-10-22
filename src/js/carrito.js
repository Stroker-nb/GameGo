import { Toast } from "bootstrap";

const CLAVE_CARRITO = "gamegoCarrito";
const MAX_UNIDADES = 10; 
const moneda = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
});

const catalogo = new Map();
document.querySelectorAll(".js-agregar").forEach((boton) => {
    const tarjeta = boton.closest(".producto");
    catalogo.set(boton.dataset.id, {
        id: boton.dataset.id,
        nombre: boton.dataset.nombre,
        precio: Number(boton.dataset.precio),
        img: tarjeta?.querySelector("img")?.getAttribute("src") ?? ""
    });
});

function cargarCarrito() {
    try {
        const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || "{}");
        const limpio = {};
        for (const [id, cantidad] of Object.entries(guardado)) {
            const n = Math.floor(Number(cantidad));
            // Se descartan productos que ya no existen o cantidades inválidas
            if (catalogo.has(id) && n > 0) limpio[id] = Math.min(n, MAX_UNIDADES);
        }
        return limpio;
    } catch {
        return {};
    }
}

function guardarCarrito() {
    try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    } catch {
        
    }
}

let carrito = cargarCarrito();

const $contador = document.getElementById("carritoContador");
const $items = document.getElementById("carritoItems");
const $vacio = document.getElementById("carritoVacio");
const $total = document.getElementById("carritoTotal");
const $aviso = document.getElementById("carritoAviso");
const $btnFinalizar = document.getElementById("btnFinalizar");
const $btnVaciar = document.getElementById("btnVaciar");
const $toast = document.getElementById("toastCarrito");
const $toastTexto = document.getElementById("toastTexto");

function agregar(id) {
    const producto = catalogo.get(id);
    if (!producto) return;
    limpiarAviso();

    if ((carrito[id] ?? 0) >= MAX_UNIDADES) {
        mostrarToast(`Máximo ${MAX_UNIDADES} unidades de ${producto.nombre}.`, "warning");
        return;
    }
    carrito[id] = (carrito[id] ?? 0) + 1;
    guardarCarrito();
    render();
    mostrarToast(`${producto.nombre} se agregó al carrito.`, "success");
}

function cambiarCantidad(id, delta) {
    const nueva = (carrito[id] ?? 0) + delta;
    if (nueva < 1 || nueva > MAX_UNIDADES) return;
    carrito[id] = nueva;
    guardarCarrito();
    render();
}

function quitar(id) {
    delete carrito[id];
    guardarCarrito();
    render();
}

function vaciar() {
    carrito = {};
    guardarCarrito();
    limpiarAviso();
    render();
}

function finalizarCompra() {
    if (Object.keys(carrito).length === 0) return;

    // Solo se puede comprar con sesión iniciada 
    if (localStorage.getItem("sesionIniciada") !== "true") {
        mostrarAviso("warning", "Inicia sesión para finalizar tu compra. ", {
            texto: "Ir a iniciar sesión",
            href: "logIn.html"
        });
        return;
    }

    const total = totalCarrito();
    vaciar();
    mostrarAviso("success", `¡Gracias por tu compra! Total pagado: ${moneda.format(total)}.`);
}

function totalCarrito() {
    return Object.entries(carrito).reduce(
        (suma, [id, cantidad]) => suma + catalogo.get(id).precio * cantidad,
        0
    );
}

function unidadesCarrito() {
    return Object.values(carrito).reduce((suma, cantidad) => suma + cantidad, 0);
}

function crearItem(id, cantidad) {
    const p = catalogo.get(id);

    const li = document.createElement("li");
    li.className = "list-group-item d-flex gap-3 align-items-center bg-transparent";
    li.dataset.id = id;

    const img = document.createElement("img");
    img.src = p.img;
    img.alt = "";
    img.className = "carrito-img rounded";

    const info = document.createElement("div");
    info.className = "flex-grow-1";

    const nombre = document.createElement("div");
    nombre.className = "fw-semibold text-white";
    nombre.textContent = p.nombre;

    const unitario = document.createElement("small");
    unitario.textContent = `${moneda.format(p.precio)} c/u`;

    const controles = document.createElement("div");
    controles.className = "btn-group btn-group-sm mt-1 d-flex";
    controles.setAttribute("role", "group");
    controles.setAttribute("aria-label", `Cantidad de ${p.nombre}`);
    controles.style.width = "fit-content";

    const btnMenos = crearBoton("restar", "−", `Quitar una unidad de ${p.nombre}`);
    btnMenos.disabled = cantidad <= 1;
    const cant = document.createElement("span");
    cant.className = "btn btn-outline-secondary disabled text-white";
    cant.textContent = cantidad;
    const btnMas = crearBoton("sumar", "+", `Agregar una unidad de ${p.nombre}`);
    btnMas.disabled = cantidad >= MAX_UNIDADES;
    controles.append(btnMenos, cant, btnMas);

    info.append(nombre, unitario, controles);

    const derecha = document.createElement("div");
    derecha.className = "text-end";
    const subtotal = document.createElement("div");
    subtotal.className = "fw-bold text-white";
    subtotal.textContent = moneda.format(p.precio * cantidad);
    const btnQuitar = document.createElement("button");
    btnQuitar.type = "button";
    btnQuitar.className = "btn btn-link btn-sm text-danger p-0 mt-1";
    btnQuitar.dataset.accion = "quitar";
    btnQuitar.setAttribute("aria-label", `Quitar ${p.nombre} del carrito`);
    btnQuitar.textContent = "Quitar";
    derecha.append(subtotal, btnQuitar);

    li.append(img, info, derecha);
    return li;
}

function crearBoton(accion, texto, etiqueta) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn btn-outline-secondary";
    b.dataset.accion = accion;
    b.setAttribute("aria-label", etiqueta);
    b.textContent = texto;
    return b;
}

function render() {
    const unidades = unidadesCarrito();

    $contador.textContent = unidades;
    $contador.hidden = unidades === 0;

    $items.replaceChildren(
        ...Object.entries(carrito).map(([id, cantidad]) => crearItem(id, cantidad))
    );
    $vacio.hidden = unidades > 0;
    $total.textContent = moneda.format(totalCarrito());
    $btnFinalizar.disabled = unidades === 0;
    $btnVaciar.disabled = unidades === 0;
}

function mostrarToast(texto, tipo) {
    $toast.className = `toast align-items-center border-0 text-bg-${tipo}`;
    $toastTexto.textContent = texto;
    Toast.getOrCreateInstance($toast, { delay: 2200 }).show();
}

function mostrarAviso(tipo, texto, enlace) {
    const div = document.createElement("div");
    div.className = `alert alert-${tipo} mb-0`;
    div.setAttribute("role", "alert");
    div.append(texto);
    if (enlace) {
        const a = document.createElement("a");
        a.href = enlace.href;
        a.className = "alert-link";
        a.textContent = enlace.texto;
        div.append(a);
    }
    $aviso.replaceChildren(div);
}

function limpiarAviso() {
    $aviso.replaceChildren();
}

document.addEventListener("click", (e) => {
    const boton = e.target.closest(".js-agregar");
    if (boton) agregar(boton.dataset.id);
});

$items.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-accion]");
    if (!boton) return;
    const id = boton.closest("li").dataset.id;
    const accion = boton.dataset.accion;
    if (accion === "sumar") cambiarCantidad(id, 1);
    else if (accion === "restar") cambiarCantidad(id, -1);
    else if (accion === "quitar") quitar(id);
});

$btnFinalizar.addEventListener("click", finalizarCompra);
$btnVaciar.addEventListener("click", vaciar);

window.addEventListener("storage", (e) => {
    if (e.key === CLAVE_CARRITO) {
        carrito = cargarCarrito();
        render();
    }
});

render();
