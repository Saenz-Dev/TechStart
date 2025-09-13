document.getElementById("uno").addEventListener("click", () => { cambiarVista("seccion-uno") });
document.getElementById("boton-tema").addEventListener("click", cambiarTema);
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.toggle(localStorage.getItem("tema"))
});


function cambiarVista(idElement, event) {
    event.preventDefault();
    let vistas = document.getElementsByClassName("seccion");
    for (let vista of vistas) {
        vista.style.display = "none";
    }
    document.getElementById(idElement).style.display = "block";
    console.log(idElement);
}

function cambiarTema(event) {
    event.preventDefault();
    if (localStorage.getItem("tema") == undefined || localStorage.getItem("tema") == "dark-theme") {
        localStorage.setItem("tema", "light-theme");
    } else {
        localStorage.setItem("tema", "dark-theme");
    }
    document.body.classList.toggle("dark-theme");
}


function validacionFormulario() {
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;
    if (correo.trim().length === 0 && contrasena.trim().length === 0) {
        return openModal("Correo y contraseña", "Introduce correo y contraseña.")
    }
    if (correo.trim().length === 0) {
        return openModal("Correo Vacio", "Por favor, introduce un correo.")
    }
    if (contrasena.trim().length === 0) {
        return openModal("Contraseña Vacia", "Por favor, introduce una contraseña.")
    }
    let matchesCorreo = /^[\w.-]+@[\w.-]+\.[\w]{2,}$/;
    if (matchesCorreo.test(correo)) {
        return openModal("Correo válido", "Puede continuar :)")
    } else {
        return openModal("Correo válido", "Puede continuar :)");
    }

}

/*Codigo para el modal*/
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
// const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

const openModal = function (titulo, contenido) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.getElementById("titulo-modal").textContent = titulo;
    document.getElementById("contenido-modal").textContent = contenido;
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

// openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

/*Funcion para la barra de progreso de lectura*/
function llenadoBarraProgreso() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollPercentaje = (scrollTop/scrollHeight)*100;
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = scrollPercentaje + "%";
}

window.addEventListener("scroll", llenadoBarraProgreso)



/*Funcion para pasar los testimonios del slider*/
let posicionSlider = 0;

function pasarTestimonios(direccion) {
    let testimonios = document.getElementsByClassName("slide");
    for (let i = 0; i < testimonios.length; i++) {
        const testimonio = testimonios[i];
        testimonio.style.display = "none";
    }
    if (direccion == -1 && posicionSlider == 1) {
        posicionSlider = 3;
    } else if (direccion == -1) {
        posicionSlider -= 1
    }
    if (direccion == 1 && posicionSlider == testimonios.length-1) {
        posicionSlider = 0;
    } else if (direccion == 1) {
        posicionSlider += 1
    }
    testimonios[posicionSlider].style.display = "block";
}

document.getElementById("btn-antes").addEventListener("click", () => {
    pasarTestimonios(-1);
});
document.getElementById("btn-despues").addEventListener("click", () => {
    pasarTestimonios(1);
});
