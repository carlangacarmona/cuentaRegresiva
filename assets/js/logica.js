// Variables globales
let intervaloTiempo = null; // Para almacenar el setInterval
let guardaSegundos = 0; // Guardará el tiempo ingresado

// Elementos del DOM
const mostrarSegundos = document.getElementById('segundos');
const ingresoSegundos = document.getElementById('entrada-segundos');
const btnEmpezar = document.getElementById('btn-empezar');
const btnCancelar = document.getElementById('btn-cancelar');

// Instancia de los modales usando Bootstrap
const modalTermino = new bootstrap.Modal(document.getElementById('modalTermino'));
const modalValida = new bootstrap.Modal(document.getElementById('modalValida'));

// Función para actualizar el temporizador en pantalla
function actualizaDisplay(segundos) {
    // Si el número es menor a 10, añadimos un cero delante
    mostrarSegundos.textContent = segundos < 10 ? `0${segundos}` : segundos;
}

// Función de cuenta regresiva
function countdown(callback) {
    intervaloTiempo = setInterval(() => {
        if (guardaSegundos > 0) {
            guardaSegundos--;
            actualizaDisplay(guardaSegundos);
        } else {
            clearInterval(intervaloTiempo); // Detenemos el temporizador
            callback(); // Llamamos al callback al terminar
        }
    }, 1000); // Cada 1 segundo
}

// Evento: Iniciar el temporizador
btnEmpezar.addEventListener('click', () => {
    const inputValue = parseInt(ingresoSegundos.value);

    if (!isNaN(inputValue) && inputValue > 0) {
        guardaSegundos = inputValue;
        actualizaDisplay(guardaSegundos); // Mostrar segundos ingresados
        clearInterval(intervaloTiempo); // Reiniciar intervalo si ya hay uno activo
        countdown(() => modalTermino.show()); // Mostrar modal al terminar
    } else {
        modalValida.show(); // Mostrar modal de validación
    }
});

// Evento: Cancelar el temporizador
btnCancelar.addEventListener('click', () => {
    clearInterval(intervaloTiempo); // Detenemos la cuenta regresiva
    guardaSegundos = 0; // Reiniciamos el contador
    actualizaDisplay(guardaSegundos); // Volvemos a mostrar 00
});
