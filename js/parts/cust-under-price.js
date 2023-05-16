// Найти элемент с классом .cust-under-price
const custUnderPriceElement = document.querySelector('.cust-under-price');

// Если элемент с классом .cust-under-price найден
if (custUnderPriceElement) {
  // Найти ссылку внутри элемента .cust-under-price
  const linkInsideCustUnderPrice = custUnderPriceElement.querySelector('a');

  // Если ссылка найдена, добавить обработчик события click
  if (linkInsideCustUnderPrice) {
    linkInsideCustUnderPrice.addEventListener('click', (event) => {
      // Отменить стандартное поведение ссылки
      event.preventDefault();

      // Если элемент .cust-under-price содержит класс .active, удалить его, иначе добавить
      custUnderPriceElement.classList.toggle('active');
    });
  }

  // Добавить обработчик события click на document
  document.addEventListener('click', (event) => {
    // Проверить, является ли кликнутый элемент дочерним элементом custUnderPriceElement или самим элементом
    const isClickInside = custUnderPriceElement.contains(event.target) || custUnderPriceElement === event.target;

    // Проверить, был ли клик сделан по кнопке с классом .close
    const isCloseBtnClicked = event.target.classList.contains('close');

    // Если клик сделан вне области custUnderPriceElement и элемент содержит класс .active
    // или клик сделан по кнопке с классом .close
    if ((!isClickInside && custUnderPriceElement.classList.contains('active')) || isCloseBtnClicked) {
      // Удалить класс .active у элемента с классом .cust-under-price
      custUnderPriceElement.classList.remove('active');
    }
  });
}
