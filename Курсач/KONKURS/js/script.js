// получаем элементы со страницы
const form = document.querySelector('.form');
const resultContainer = document.querySelector('.result-container');
const result = document.querySelector('.result');
const startBtn = document.querySelector('.start-btn');

// задаем обработчик события на кнопку "Почнемо!"
startBtn.addEventListener('click', () => {
  form.style.display = 'block'; // показываем форму
  startBtn.style.display = 'none'; // скрываем кнопку "Почнемо!"
});

// задаем обработчик события на отправку формы
form.addEventListener('submit', (e) => {
  e.preventDefault(); // предотвращаем отправку формы по умолчанию
  
  const select1 = form.querySelector('select:first-of-type');
  const select2 = form.querySelector('select:last-of-type');
  const input = form.querySelector('input');
  
  const spec = select1.options[select1.selectedIndex].text;
  const prog = select2.options[select2.selectedIndex].text;
  const score = input.value;
  
  // вычисляем и выводим результат
  const resultText = `Ваш результат для спеціальності "${spec}" та програми "${prog}" - ${score} бал(ів)`;
  result.textContent = resultText;
  
  // скрываем форму
  form.style.display = 'none';
  // показываем блок с результатом
  resultContainer.style.display = 'block';
});
