// Найти элемент с классом .promocode
const promocodeElement = document.querySelector('.promocode');

// Если такой элемент есть
if (promocodeElement) {
  // Найти кнопку с классом .promocode__label внутри элемента с классом .promocode
  const promocodeLabel = promocodeElement.querySelector('.promocode__label');

  // Если кнопка найдена, добавить обработчик события click
  if (promocodeLabel) {
    promocodeLabel.addEventListener('click', () => {
      // Добавить класс .show к элементу с классом .promocode
      promocodeElement.classList.add('show');
    });
  }
}
