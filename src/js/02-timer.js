// Descrito en la documentación
import flatpickr from "flatpickr";
// Importación adicional de estilos
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputDate = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("[data-start]");
btnStart.disabled = true;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const dateSelect = selectedDates[0];
        if (dateSelect <= options.defaultDate) {
            Notiflix.Notify.failure("Please choose a date in the future");
        } else if (dateSelect > options.defaultDate) {
            btnStart.disabled = false;

            btnStart.addEventListener('click', () => {
                btnStart.disabled = true;

                const daysText = document.querySelector("[data-days]");
                const hoursText = document.querySelector("[data-hours]");
                const minutesText = document.querySelector("[data-minutes]");
                const secondsText = document.querySelector("[data-seconds]");

                timerId = setInterval(() => {
                    const dateActual = new Date();
                    const diference = new Date(dateSelect - dateActual);
                    const objDiference = convertMs(diference);
                    if (objDiference.days < 0 && objDiference.hours < 0 &&
                        objDiference.minutes < 0 && objDiference.seconds < 0) {
                        daysText.textContent = "00";
                        hoursText.textContent = "00";
                        minutesText.textContent = "00";
                        secondsText.textContent = "00";
                        clearInterval(timerId);
                    } else {
                        const addLeadingZero = (value) => {
                            return value.toString().padStart(2, '0');
                        };
                        daysText.textContent = addLeadingZero(objDiference.days);
                        hoursText.textContent = addLeadingZero(objDiference.hours);
                        minutesText.textContent = addLeadingZero(objDiference.minutes);
                        secondsText.textContent = addLeadingZero(objDiference.seconds);
                    }
                }, 1000)
            });
        }
    },
};

flatpickr(inputDate, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
