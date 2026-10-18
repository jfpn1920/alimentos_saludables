//----------------------------------------//
//--|funcionalidad_alimentos_saludables|--//
//----------------------------------------//
const datosIniciales = {
    1: {
        nombre: "Manzana",
        descripcion: "Fruta rica en fibra y vitaminas.",
        imagen: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=600&q=80"
    },
    2: {
        nombre: "Ensalada",
        descripcion: "Combinación de vegetales frescos y nutritivos.",
        imagen: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
    },
    3: {
        nombre: "Piña",
        descripcion: "Fruta tropical refrescante y rica en vitamina C.",
        imagen: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80"
    },
    4: {
        nombre: "Vegetales",
        descripcion: "Fuente de vitaminas, minerales y fibra.",
        imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
    },
    5: {
        nombre: "Yogur natural",
        descripcion: "Alimento que puede aportar proteínas y calcio.",
        imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    }
};
//-------------------//
//--|obtener_datos|--//
//-------------------//
function obtenerDatos(id) {
    try {
        const datos = localStorage.getItem(`alimento_${id}`);
        if (datos) {
            const alimentoGuardado = JSON.parse(datos);
            if (
                alimentoGuardado &&
                typeof alimentoGuardado.nombre === "string" &&
                typeof alimentoGuardado.descripcion === "string" &&
                typeof alimentoGuardado.imagen === "string"
            ) {
                return alimentoGuardado;
            }
        }
    } catch (error) {
        console.error("No se pudieron recuperar los datos:", error);
    }
    return datosIniciales[id];
}
//-------------------//
//--|mostrar_datos|--//
//-------------------//
function mostrarDatos(alimento) {
    const id = alimento.dataset.id;
    const datos = obtenerDatos(id);
    alimento.querySelector(".nombre").value = datos.nombre;
    alimento.querySelector(".descripcion").value = datos.descripcion;
    alimento.querySelector(".url_imagen").value = datos.imagen;
    actualizarImagen(alimento);
}
//-------------------//
//--|guardar_datos|--//
//-------------------//
function guardarDatos(alimento) {
    const id = alimento.dataset.id;
    const campoNombre = alimento.querySelector(".nombre");
    const campoDescripcion = alimento.querySelector(".descripcion");
    const campoImagen = alimento.querySelector(".url_imagen");
    const nombre = campoNombre.value.trim();
    const descripcion = campoDescripcion.value.trim();
    const imagen = campoImagen.value.trim();
    if (!nombre) {
        mostrarMensaje(alimento, "Escribe el nombre del alimento.");
        campoNombre.focus();
        return;
    }
    if (!descripcion) {
        mostrarMensaje(alimento, "Escribe una descripción.");
        campoDescripcion.focus();
        return;
    }
    if (!validarImagen(imagen)) {
        mostrarMensaje(alimento, "Introduce una URL válida que comience con https:// o http://.");
        campoImagen.focus();
        return;
    }
    const datos = {
        nombre: nombre,
        descripcion: descripcion,
        imagen: imagen
    };
    try {
        localStorage.setItem(`alimento_${id}`, JSON.stringify(datos));
        campoNombre.value = nombre;
        campoDescripcion.value = descripcion;
        campoImagen.value = imagen;
        actualizarImagen(alimento);
        mostrarMensaje(alimento, "Alimento guardado correctamente.");
    } catch (error) {
        console.error("No se pudieron guardar los datos:", error);
        mostrarMensaje(alimento, "No fue posible guardar los datos.");
    }
}
function validarImagen(url) {
    try {
        const direccion = new URL(url);
        return (
            (direccion.protocol === "https:" || direccion.protocol === "http:") &&
            direccion.hostname.includes(".")
        );
    } catch (error) {
        return false;
    }
}
//---------------------//
//--|restaurar_datos|--//
//---------------------//
function restaurarDatos(alimento) {
    const id = alimento.dataset.id;
    try {
        localStorage.removeItem(`alimento_${id}`);
        mostrarDatos(alimento);
        mostrarMensaje(alimento, "Información restaurada.");
    } catch (error) {
        console.error("No se pudieron restaurar los datos:", error);
        mostrarMensaje(alimento, "No fue posible restaurar la información.");
    }
}
//---------------------//
//--|mostrar_mensaje|--//
//---------------------//
function mostrarMensaje(alimento, texto) {
    const mensaje = alimento.querySelector(".mensaje");
    clearTimeout(mensaje.dataset.temporizador);
    mensaje.textContent = texto;
    mensaje.dataset.temporizador = setTimeout(function() {
        mensaje.textContent = "";
        delete mensaje.dataset.temporizador;
    }, 2500);
}
//-----------------------//
//--|actualizar_imagen|--//
//-----------------------//
function actualizarImagen(alimento) {
    const campoImagen = alimento.querySelector(".url_imagen");
    const imagen = alimento.querySelector(".imagen");
    const direccion = campoImagen.value.trim();
    if (validarImagen(direccion)) {
        imagen.src = direccion;
    }
}
//--------------------------//
//--|eventos_de_alimentos|--//
//--------------------------//
const alimentos = document.querySelectorAll(".alimento");
alimentos.forEach(function(alimento) {
    const botonGuardar = alimento.querySelector(".guardar");
    const botonRestaurar = alimento.querySelector(".restaurar");
    const campoImagen = alimento.querySelector(".url_imagen");
    botonGuardar.addEventListener("click", function() {
        guardarDatos(alimento);
    });
    botonRestaurar.addEventListener("click", function() {
        restaurarDatos(alimento);
    });
    campoImagen.addEventListener("input", function() {
        actualizarImagen(alimento);
    });
});
//-----------------------//
//--|restablecer_todos|--//
//-----------------------//
const botonRestablecer = document.getElementById("restablecerTodos");
botonRestablecer.addEventListener("click", function() {
    const confirmar = confirm("¿Deseas restablecer todos los alimentos?");
    if (!confirmar) {
        return;
    }
    try {
        alimentos.forEach(function(alimento) {
            const id = alimento.dataset.id;
            localStorage.removeItem(`alimento_${id}`);
        });
        alimentos.forEach(function(alimento) {
            mostrarDatos(alimento);
            mostrarMensaje(alimento, "Información restaurada.");
        });
    } catch (error) {
        console.error("No se pudieron restablecer todos los alimentos:", error);
        mostrarMensaje(alimentos[0], "No fue posible restablecer todos los alimentos.");
    }
});
//------------------//
//--|cargar_datos|--//
//------------------//
function cargarDatos() {
    alimentos.forEach(function(alimento) {
        mostrarDatos(alimento);
    });
}
cargarDatos();