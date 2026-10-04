/*------------------------------------*/
/*--|datos_iniciales|-----------------*/
/*------------------------------------*/

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

/*------------------------------------*/
/*--|obtener_datos|-------------------*/
/*------------------------------------*/

function obtenerDatos(id) {
    const datos = localStorage.getItem(`alimento_${id}`);

    if (datos) {
        return JSON.parse(datos);
    }

    return datosIniciales[id];
}

/*------------------------------------*/
/*--|mostrar_datos|-------------------*/
/*------------------------------------*/

function mostrarDatos(alimento) {
    const id = alimento.dataset.id;
    const datos = obtenerDatos(id);

    alimento.querySelector(".nombre").value =
        datos.nombre;

    alimento.querySelector(".descripcion").value =
        datos.descripcion;

    alimento.querySelector(".url_imagen").value =
        datos.imagen;

    alimento.querySelector(".imagen").src =
        datos.imagen;
}

/*------------------------------------*/
/*--|guardar_datos|-------------------*/
/*------------------------------------*/

function guardarDatos(alimento) {
    const id = alimento.dataset.id;

    const nombre =
        alimento.querySelector(".nombre").value;

    const descripcion =
        alimento.querySelector(".descripcion").value;

    const imagen =
        alimento.querySelector(".url_imagen").value;

    const datos = {
        nombre: nombre,
        descripcion: descripcion,
        imagen: imagen
    };

    localStorage.setItem(
        `alimento_${id}`,
        JSON.stringify(datos)
    );

    alimento.querySelector(".imagen").src =
        imagen;

    mostrarMensaje(
        alimento,
        "Alimento guardado correctamente."
    );
}

/*------------------------------------*/
/*--|restaurar_datos|-----------------*/
/*------------------------------------*/

function restaurarDatos(alimento) {
    const id = alimento.dataset.id;

    localStorage.removeItem(`alimento_${id}`);

    mostrarDatos(alimento);

    mostrarMensaje(
        alimento,
        "Información restaurada."
    );
}

/*------------------------------------*/
/*--|mostrar_mensaje|-----------------*/
/*------------------------------------*/

function mostrarMensaje(alimento, texto) {
    const mensaje =
        alimento.querySelector(".mensaje");

    mensaje.textContent = texto;

    setTimeout(function() {
        mensaje.textContent = "";
    }, 2500);
}

/*------------------------------------*/
/*--|actualizar_imagen|---------------*/
/*------------------------------------*/

function actualizarImagen(alimento) {
    const campoImagen =
        alimento.querySelector(".url_imagen");

    const imagen =
        alimento.querySelector(".imagen");

    imagen.src = campoImagen.value;
}

/*------------------------------------*/
/*--|eventos_de_alimentos|------------*/
/*------------------------------------*/

const alimentos =
    document.querySelectorAll(".alimento");

alimentos.forEach(function(alimento) {

    const botonGuardar =
        alimento.querySelector(".guardar");

    const botonRestaurar =
        alimento.querySelector(".restaurar");

    const campoImagen =
        alimento.querySelector(".url_imagen");

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

/*------------------------------------*/
/*--|restablecer_todos|---------------*/
/*------------------------------------*/

const botonRestablecer =
    document.getElementById("restablecerTodos");

botonRestablecer.addEventListener("click", function() {

    alimentos.forEach(function(alimento) {
        const id = alimento.dataset.id;

        localStorage.removeItem(`alimento_${id}`);

        mostrarDatos(alimento);

        alimento.querySelector(".mensaje").textContent =
            "Restablecido.";
    });

});

/*------------------------------------*/
/*--|cargar_datos|--------------------*/
/*------------------------------------*/

function cargarDatos() {

    alimentos.forEach(function(alimento) {
        mostrarDatos(alimento);
    });

}

/*------------------------------------*/
/*--|iniciar_proyecto|----------------*/
/*------------------------------------*/

cargarDatos();