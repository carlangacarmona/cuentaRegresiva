// Variables globales
let intervaloTiempo = null; // Para almacenar el setInterval
let guardaMinutos = 0; // Guardará los minutos ingresados
let guardaSegundos = 0; // Guardará los segundos restantes

// Elementos del DOM
const mostrarSegundos = document.getElementById('segundos');
const ingresoSegundos = document.getElementById('entrada-segundos');
const btnEmpezar = document.getElementById('btnEmpezar');
const btnCancelar = document.getElementById('btnCancelar');

// Modales de Bootstrap
const modalTermino = new bootstrap.Modal(document.getElementById('modalTermino'));
const modalValida = new bootstrap.Modal(document.getElementById('modalValida'));

// Función para actualizar la pantalla
function actualizaDisplay(minutos, segundos) {
    const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos;
    const formatoSegundos = segundos < 10 ? `0${segundos}` : segundos;
    mostrarSegundos.textContent = `${formatoMinutos}:${formatoSegundos}`;
}

// Función para mostrar el modal de finalización y ejecutar confeti automáticamente
function showTimeUpModal() {
    const modalTermino = new bootstrap.Modal(document.getElementById('modalTermino'));

    // Evento que se dispara cuando el modal se muestra en pantalla
    document.getElementById('modalTermino').addEventListener('shown.bs.modal', () => {
        confetti({
            particleCount: 150,  // Ajustar la cantidad de partículas
            spread: 100,         // Amplitud de la dispersión
            origin: { y: 0.6 },  // Posición desde donde salen los confetis
        });
    });

    // Mostrar el modal
    modalTermino.show();
}

// Modificar el callback del temporizador para que invoque el modal
function countdown(callback) {
    intervaloTiempo = setInterval(() => {
        if (guardaMinutos === 0 && guardaSegundos === 0) {
            clearInterval(intervaloTiempo); // Detener el temporizador
            showTimeUpModal(); // Mostrar modal con confeti
            callback(); // Llamar al callback (si lo necesitas)
        } else {
            if (guardaSegundos === 0) {
                guardaMinutos--; // Reducir minutos
                guardaSegundos = 59; // Reiniciar segundos
            } else {
                guardaSegundos--; // Reducir segundos
            }
            actualizaDisplay(guardaMinutos, guardaSegundos); // Actualizar pantalla
        }
    }, 1000); // Cada 1 segundo
}

// Evento: Iniciar el temporizador
btnEmpezar.addEventListener('click', () => {
    const valorInput = parseInt(ingresoSegundos.value); // Tomar el valor del input

    if (!isNaN(valorInput) && valorInput >= 0) {
        guardaMinutos = valorInput;
        guardaSegundos = 0; // Reiniciar los segundos a 0

        actualizaDisplay(guardaMinutos, guardaSegundos); // Mostrar tiempo inicial
        clearInterval(intervaloTiempo); // Reiniciar intervalo si ya hay uno activo
        countdown(() => modalTermino.show()); // Mostrar modal al terminar
    } else {
        modalValida.show(); // Mostrar modal si la entrada es inválida
    }
});

// Evento: Cancelar el temporizador
btnCancelar.addEventListener('click', () => {
    clearInterval(intervaloTiempo); // Detener el temporizador
    guardaMinutos = 0;
    guardaSegundos = 0; // Reiniciar minutos y segundos
    actualizaDisplay(guardaMinutos, guardaSegundos); // Mostrar 00:00
});