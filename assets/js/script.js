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


$(document).ready(function() {
  $('#answer').click(function() {
    // Собираем данные из формы
    const isComing = $('#confirmation').is(':checked') ? "Да" : "Нет";
    const peopleCount = $('#count').val();
    const names = $('#fios').val().trim();
    
    // Собираем пищевые предпочтения
    let foodPreferences = [];
    if ($('#food_0').is(':checked')) foodPreferences.push("Нет предпочтений");
    if ($('#food_1').is(':checked')) foodPreferences.push("Не ест мясо");
    if ($('#food_2').is(':checked')) foodPreferences.push("Не ест рыбу");
    if ($('#food_3').is(':checked')) foodPreferences.push("Вегетарианец");
    if (foodPreferences.length === 0) foodPreferences.push("Не указано");
    
    // Собираем алкогольные предпочтения
    let alcoholPreferences = [];
    if ($('#alco_0').is(':checked')) alcoholPreferences.push("Не будет пить алкоголь");
    if ($('#alco_1').is(':checked')) alcoholPreferences.push("Вино");
    if ($('#alco_2').is(':checked')) alcoholPreferences.push("Водка");
    if ($('#alco_3').is(':checked')) alcoholPreferences.push("Шампанское");
    if ($('#alco_4').is(':checked')) alcoholPreferences.push("Виски/Коньяк");
    if (alcoholPreferences.length === 0) alcoholPreferences.push("Не указано");
    
    // Собираем информацию о детях
    let kidsInfo = "Нет";
    if ($('#kids_1').is(':checked')) {
      const kidsCount = $('#kids_amount').val();
      kidsInfo = `Да, ${kidsCount} детей`;
    }
    
    // Формируем итоговое сообщение
    let message = `Присутствие: ${isComing}\n`;
    message += `Количество человек: ${peopleCount}\n`;
    message += `Имена: ${names || "Не указаны"}\n\n`;
    message += `Пищевые предпочтения:\n- ${foodPreferences.join("\n- ")}\n\n`;
    message += `Алкогольные предпочтения:\n- ${alcoholPreferences.join("\n- ")}\n\n`;
    message += `Дети: ${kidsInfo}\n\n`;
    // message += `Спасибо за ответ!`;
    
    // Вставляем сообщение в textarea
    $('#answers').val(message);
    
    // Копируем в буфер обмена
    $('#answers').select();
    document.execCommand('copy');
    
    // Показываем уведомление
    alert('Ответ скопирован в буфер обмена! Теперь вы можете отправить его организаторам.');
  });
});
