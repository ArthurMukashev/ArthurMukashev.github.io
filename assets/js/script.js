const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


let countDownDate = new Date('2025-08-09 15:00:00').getTime();

// Update the countdown every 1 second
let x = setInterval(function () {
  // Get the current date and time
  let now = new Date().getTime();

  // Calculate the remaining time
  let distance = countDownDate - now;

  // Calculate time units
  let weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const divStyle = 'text-light bg-dark rounded px-4 py-3 mx-4';

  // Display the countdown
  document.getElementById("countdown").innerHTML = `
    ${weeks > 0 ? `
      <div class="${divStyle}">
        <b class="animated">${weeks}</b><br>
        ${weeks > 1 ? 'Недель' : 'Неделя'}
      </div>
    ` : ''}
    ${days > 0 || weeks > 0 ? `
      <div class="${divStyle}">
        <b class="animated">${days}</b><br>
        ${days > 1 ? 'Дней' : 'День'}
      </div>
    ` : ''}
    ${hours > 0 || days > 0 || weeks > 0 ? `
      <div class="${divStyle}">
        <b class="animated">${hours}</b><br>
        ${hours > 1 ? 'Часов' : 'Час'}
      </div>
    ` : ''}
    ${minutes > 0 || hours > 0 || days > 0 || weeks > 0 ? `
      <div class="${divStyle}">
        <b class="animated">${minutes}</b><br>
        ${minutes > 1 ? 'Минут' : 'Минута'}
      </div>
    ` : ''}
    <div class="${divStyle}">
      <b class="animated">${seconds}</b><br>
      ${seconds > 1 ? 'Секунд' : 'Секунда'}
    </div>
  `;

  // If the countdown is finished
  if (distance < 0) {
    clearInterval(x);
  }
}, 1000);