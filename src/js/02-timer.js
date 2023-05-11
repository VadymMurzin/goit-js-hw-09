//import flatpickr from 'flatpickr';
//import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const daysValue = timer.querySelector('[data-days]');
const hoursValue = timer.querySelector('[data-hours]');
const minutesValue = timer.querySelector('[data-minutes]');
const secondsValue = timer.querySelector('[data-seconds]');

function enableStartButton() {
  startButton.disabled = false;
}

function disableStartButton() {
  startButton.disabled = true;
}

function updateTimer(days, hours, minutes, seconds) {
  daysValue.textContent = String(days).padStart(2, '0');
  hoursValue.textContent = String(hours).padStart(2, '0');
  minutesValue.textContent = String(minutes).padStart(2, '0');
  secondsValue.textContent = String(seconds).padStart(2, '0');
}

function handleStartButtonClick() {
  const selectedDate = datetimePicker._flatpickr.selectedDates[0];
  if (selectedDate <= new Date()) {
    window.alert('Please choose a date in the future');
    return;
  }
  disableStartButton();
  const timerIntervalId = setInterval(() => {
    const timeDiff = selectedDate - new Date();
    if (timeDiff <= 0) {
      clearInterval(timerIntervalId);
      updateTimer(0, 0, 0, 0);
      enableStartButton();
      return;
    }

    const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeDiff / (60 * 60 * 1000)) % 24);
    const minutes = Math.floor((timeDiff / (60 * 1000)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    updateTimer(days, hours, minutes, seconds);
  }, 1000);
}

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
});

startButton.addEventListener('click', handleStartButtonClick);

updateTimer(0, 0, 0, 0);
