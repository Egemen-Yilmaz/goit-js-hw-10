import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    const futureDate = selectedDates[0];
    const now = new Date();

    if (selectedDates[0] <= now) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });
      document.querySelector("[data-start]").disabled = true;
      selectedDate = null;
      return;
    } else {
      document.querySelector("[data-start]").disabled = false;
      selectedDate = futureDate;
      }
    },
};
    


flatpickr("#datetime-picker", options);

const startBtn = document.querySelector("[data-start]");

startBtn.addEventListener("click", () => {

  startBtn.disabled = true;
  refs.datetimePicker.disabled = true;


    const timerInterval = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = selectedDate.getTime() - currentTime.getTime();

        if (deltaTime <= 0) {
            clearInterval(timerInterval);

            startBtn.disabled = false;
            refs.datetimePicker.disabled = false;

            iziToast.success({
                message: "Countdown finished! (00:00:00:00)",
                position: 'topRight',
            });
            updateTimerDisplay({days: 0, hours: 0, minutes: 0, seconds: 0});
            return;
        };
        const timeComponents = convertMs(deltaTime);

        updateTimerDisplay(timeComponents);
    }, 1000);
});

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

const refs = {
    datetimePicker: document.querySelector("#datetime-picker"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
}

function updateTimerDisplay({days, hours, minutes, seconds}) {
    refs.days.textContent = days;
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}


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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
