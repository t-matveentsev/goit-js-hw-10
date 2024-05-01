import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let userSelectDate;
let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectDate = selectedDates[0];
    if (userSelectDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function startCountdown() {
  startBtn.disabled = true;
  dateTimePicker.disabled = true;

  const endDate = userSelectDate.getTime();

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const remainingTime = endDate - now;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
      iziToast.success({
        title: 'Success',
        message: 'Countdown has ended',
        position: 'topRight',
      });
      return;
    }

    updateTimer(remainingTime);
  }, 1000);
}

function updateTimer(remainingTime) {
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  daysValue.textContent = pad(days);
  hoursValue.textContent = pad(hours);
  minutesValue.textContent = pad(minutes);
  secondsValue.textContent = pad(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', startCountdown);
